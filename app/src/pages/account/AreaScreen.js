import React, {Component} from 'react';
import {
    View,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    FlatList,
    ScrollView,
    Image
} from 'react-native';
const { width, height } = Dimensions.get('window');
import AliIcon from '../../assets/AliIcon';
import Storage from '../../storage/DeviceStorage';
import HttpService from '../../services/HttpService';
import ToastService from '../../services/ToastServices';
import AreaTools from '../../components/account/area/AreaTools';
import FootService from '../../services/FootService';

export default class AreaScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            SkipCount: 0,
            areaTool: {
                todayRecharge: 0,
                monthlyTotalRecharge: 0,
                todayCommission: 0,
                monthlyTotalCommission: 0
            },
            totalCount: 0,
            agentList: [],
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
        this.GetMyAgentArea(ApiUrl + '/api/services/app/MyProfile/GetMyAgentArea?MaxResultCount=40&SkipCount='+this.state.SkipCount);
    }

    async GetMyAgentArea(api){
        let token = await Storage.get('user','json');
        if(token == null){
            header.Authorization = 'Bearer ';
        }else{
            header.Authorization = 'Bearer ' + token.accessToken;
        }
        HttpService.get(api, header).then(response => {
            if(response.success){
                let agentList = this.state.agentList;
                agentList.push.apply(agentList, response.result.agentList.items);
                this.setState({
                    areaTool: {
                        todayRecharge: response.result.todayRecharge,
                        monthlyTotalRecharge: response.result.monthlyTotalRecharge,
                        todayCommission: response.result.todayCommission,
                        monthlyTotalCommission: response.result.monthlyTotalCommission
                    },
                    totalCount: response.result.agentList.totalCount,
                    agentList: agentList,
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
        console.log(this.state.SkipCount)
        if(this.state.SkipCount + 40 >= this.state.totalCount){
            console.log('没有更多了')
            this.setState({
                isFinished: true
            })
        }else{
            this.setState({
                SkipCount: this.state.SkipCount + 40
            },() => {
                this.GetCommissionDetail(ApiUrl + '/api/services/app/MyProfile/GetMyAgentArea?MaxResultCount=40&SkipCount='+this.state.SkipCount);
            })
        }
    }

    renderItem = (item) => {
        let logo = '';
        if(item.item.agentLogo == null || !item.item.agentLogo){
            logo = 'http://wx.zhihuiyoulian.com/wechat/image/icon/buddha_icon.png';
        }else{
            logo = item.item.agentLogo;
        }
        return (
            <View style={styles.listItem} key={item.index}>
                <View style={styles.accountInfo}>
                    <Image style={styles.avatar} source={{uri: logo, cache: 'force-cache'}} />
                    <Text style={styles.acountText}>{item.item.agentAcount}</Text>
                </View>
                <View style={styles.date}>
                    <Text style={styles.dateText}>{item.item.agentTime}</Text>
                </View>
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
        console.log(this.state.agentList.length)
        return(
            <ScrollView style={styles.container}>
                <AreaTools areaTool={this.state.areaTool} />
                <Text style={styles.agentHeader}>合伙人信息</Text>
                <FlatList 
                    data={this.state.agentList}
                    renderItem={this.renderItem}
                    onEndReachedThreshold={0.1}
                    refreshing={true}
                    ListFooterComponent={this.footer}
                    onEndReached={() => this.loadingData() } />
                {(this.state.agentList.length == 0) ? <View style={styles.nodata}><Text>暂无数据</Text></View> : <View></View>}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f4f4f4'
    },
    agentHeader: {
        backgroundColor: 'white',
        borderBottomColor: '#f4f4f4',
        borderBottomWidth: 0.5,
        borderStyle: 'solid',
        padding: 10,
        paddingLeft: 15,
        color: '#222'
    },
    listItem: {
        backgroundColor: 'white',
        marginBottom: 10,
        flexDirection: 'row',
        padding: 10,
        paddingLeft: 15,
        paddingRight: 15
    },
    footText: {
        textAlign: 'center',
        paddingBottom: 20,
        paddingTop: 20,
        color: '#bbb'
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 30,
        marginRight: 10
    },
    accountInfo: {
        flexDirection: 'row'
    },
    acountText: {
        lineHeight: 30
    },
    date: {
        flex: 1,
        alignItems: 'flex-end'
    },
    dateText: {
        lineHeight: 30
    },
    nodata: {
        alignItems: 'center',
        paddingTop: 20
    }
})