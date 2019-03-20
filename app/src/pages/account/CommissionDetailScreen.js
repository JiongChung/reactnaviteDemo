import React,{Component} from 'react';
import {
    View,
    Dimensions,
    StyleSheet,
    Text,
    FlatList,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import Storage from '../../storage/DeviceStorage';
import HttpService from '../../services/HttpService';
const { width, height } = Dimensions.get('window');
import AliIcon from '../../assets/AliIcon';
import ToastService from '../../services/ToastServices';
import FootService from '../../services/FootService';

export default class CommissionDetailScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            SkipCount: 0,
            totalCount: 0,
            myAssetLogs: [],
            isLoading: true,
            isFinished: false
        }
    }

    static navigationOptions = ({navigation})=>{
        return {
            title: `${navigation.state.params.name}`,
            headerTitleStyle: {
                alignSelf: 'center',
                flex:1, 
                textAlign: 'center',
                color: 'white',
                fontWeight: 'normal'
            },
            headerStyle: {
                backgroundColor: '#ff881e',
                elevation: 0
            },
            headerRight: <View />,
            headerLeft: (
                <TouchableOpacity style={{marginLeft: 15}} onPress={() => navigation.goBack()}>
                    <AliIcon
                        name={'fanhui'}
                        size={20}
                        style={{color: 'white',transform: [{rotate:'180deg'}]}}
                    />
                </TouchableOpacity>
            )
        }
    };

    componentDidMount(){
        this.GetCommissionDetail(ApiUrl + '/api/services/app/VipProfile/GetCommissionDetail?MaxResultCount=40&SkipCount='+this.state.SkipCount);
    }

    async GetCommissionDetail(api){
        let token = await Storage.get('user','json');
        if(token == null){
            header.Authorization = 'Bearer ';
        }else{
            header.Authorization = 'Bearer ' + token.accessToken;
        }
        HttpService.get(api, header).then(response => {
            if(response.success){
                let myAssetLogs = this.state.myAssetLogs;
                myAssetLogs.push.apply(myAssetLogs, response.result.myAssetLogs.items);
                this.setState({
                    totalCount: response.result.myAssetLogs.totalCount,
                    myAssetLogs: myAssetLogs,
                    isLoading: false
                },() => {
                    if(this.state.totalCount < 41){
                        this.setState({
                            isFinished: true
                        })
                    }
                });
            }
        })
        .catch(error => console.error(error)).done();
    }

    renderItem = (item) => {
        return (
            <View style={styles.listItem} key={item.index}>
                <View style={styles.listMain}>
                    <Text style={styles.listText}>{item.item.usedTime}</Text>
                </View>
                <View style={styles.listMain}>
                    <Text style={styles.listText}>{item.item.typeName}</Text>
                </View>
                <View style={styles.listMain}>
                    <Text style={styles.listText}>{item.item.amount}元</Text>
                </View>
            </View>
        );
    }

    loadingData = () => {
        if(this.state.SkipCount + 40 >= this.state.totalCount){
            console.log('没有更多了')
            this.setState({
                isFinished: true
            })
        }else{
            this.setState({
                SkipCount: this.state.SkipCount + 40
            },() => {
                this.GetCommissionDetail(ApiUrl + '/api/services/app/VipProfile/GetCommissionDetail?MaxResultCount=40&SkipCount='+this.state.SkipCount);
            })
        }
    }

    renderLoadingView() {
        return <ToastService toastStatus={this.state.isLoading}  ref="ToastService" />;
    }

    footer = () => {
        return <FootService totalCount={this.state.totalCount} isFinished={this.state.isFinished} />;
    }

    renderRefresh = () => {
        console.log('下拉刷新')
    };

    render(){
        if (this.state.isLoading) {
            return this.renderLoadingView();
        }
        
        return(
            <View style={styles.container}>
                <View style={styles.headerTitle}>
                    <View style={styles.headerTitleItem}>
                        <Text style={styles.headerTitleText}>时间</Text>
                    </View>
                    <View style={styles.headerTitleItem}>
                        <Text style={styles.headerTitleText}>类型</Text>
                    </View>
                    <View style={styles.headerTitleItem}>
                        <Text style={styles.headerTitleText}>金额</Text>
                    </View>
                </View>
                <FlatList 
                    data={this.state.myAssetLogs}
                    renderItem={this.renderItem}
                    onEndReachedThreshold={0.1}
                    refreshing={true}
                    // onRefresh={() => this.renderRefresh() }
                    ListFooterComponent={this.footer}
                    onEndReached={() => this.loadingData() } />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 50
    },
    headerTitle: {
        flexDirection: 'row',
        paddingTop: 15,
        borderBottomColor: '#f4f4f4',
        borderBottomWidth: 0.5,
        borderStyle: 'solid',
        paddingBottom: 15
    },
    headerTitleItem: {
        flex: 1,
        alignItems: 'center'
    },
    headerTitleText: {
        fontSize: 16,
        color: '#222'
    },
    listItem: {
        flexDirection: 'row',
        borderBottomColor: '#f8f8f8',
        borderBottomWidth: 0.5,
        borderStyle: 'solid'
    },
    listMain: {
        flex: 1,
        alignItems: 'center'
    },
    listText: {
        paddingTop: 10,
        paddingBottom: 10
    },
    footText: {
        textAlign: 'center',
        paddingBottom: 20,
        paddingTop: 20,
        color: '#bbb'
    }
});