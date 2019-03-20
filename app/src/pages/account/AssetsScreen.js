import React, {Component} from 'react';
import {
    View,
    Dimensions,
    StyleSheet,
    Text,
    FlatList,
    TouchableOpacity,
    ScrollView
} from 'react-native';
const { width, height } = Dimensions.get('window');
import AliIcon from '../../assets/AliIcon';
import Storage from '../../storage/DeviceStorage';
import HttpService from '../../services/HttpService';
import ToastService from '../../services/ToastServices';
import FootService from '../../services/FootService';
import AssetsTools from '../../components/account/assets/AssetsTools';

export default class AssetsScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            SkipCount: 0,
            tools: {
                totalCoinValue: 0,
                availableAmount: 0,
                lockedAmount: 0
            },
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
        this.GetMyCoin(ApiUrl + '/api/services/app/MyProfile/GetMyCoin?MaxResultCount=40&SkipCount='+this.state.SkipCount);
    }

    async GetMyCoin(api){
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
                    tools: {
                        totalCoinValue: response.result.totalCoinValue,
                        availableAmount: response.result.availableAmount,
                        lockedAmount: response.result.lockedAmount
                    },
                    totalCount: response.result.myAssetLogs.totalCount,
                    myAssetLogs: myAssetLogs,
                    isLoading: false
                },() => {
                    if(this.state.totalCount < 41){
                        this.setState({
                            isFinished: true
                        })
                    }
                })
                console.log(response.result)
            }
        })
        .catch(error => console.error(error)).done();
    }

    footer = () => {
        return <FootService totalCount={this.state.totalCount} isFinished={this.state.isFinished} />;
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
                this.GetMyCoin(ApiUrl + '/api/services/app/MyProfile/GetMyCoin?MaxResultCount=40&SkipCount='+this.state.SkipCount);
            })
        }
    }

    renderItem = (item) => {
        return (
            <View style={styles.listItem} key={item.index}>
                <Text style={styles.listText}>{item.item.usedTime}</Text>
                <Text style={styles.listText}>{item.item.typeName}</Text>
                <Text style={styles.listText}>{item.item.amount}</Text>
            </View>
        );
    }

    renderLoadingView() {
        return (
            <ToastService toastStatus={this.state.isLoading}  ref="ToastService" />
        );
    }

    render(){
        if (this.state.isLoading) {
            return this.renderLoadingView();
        }
        return(
            <View style={styles.container}>
                <AssetsTools tools={this.state.tools} />
                <View style={styles.listTitle}>
                    <Text style={styles.titleText}>时间</Text>
                    <Text style={styles.titleText}>类型</Text>
                    <Text style={styles.titleText}>数量</Text>
                </View>
                <FlatList 
                    data={this.state.myAssetLogs}
                    renderItem={this.renderItem}
                    onEndReachedThreshold={0.1}
                    refreshing={true}
                    ListFooterComponent={this.footer}
                    onEndReached={() => this.loadingData() } 
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f4f4f4',
        paddingBottom: 120
    },
    listTitle: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderBottomColor: '#eee',
        borderBottomWidth: 0.5,
        borderStyle: 'solid'
    },
    titleText: {
        flex: 1,
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 10
    },
    footText: {
        textAlign: 'center',
        paddingBottom: 20,
        paddingTop: 20,
        color: '#bbb'
    },
    footLoading: {
        textAlign: 'center',
        paddingBottom: 20,
        paddingTop: 20,
        backgroundColor: 'white'
    },
    listItem: {
        backgroundColor: 'white',
        marginBottom: 1,
        flexDirection: 'row',
        padding: 10,
        paddingLeft: 15,
        paddingRight: 15
    },
    listText: {
        flex: 1,
        textAlign: 'center'
    }
})