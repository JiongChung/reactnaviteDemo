import React, {Component} from 'react';
import {
    View,
    Dimensions,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    FlatList
} from 'react-native';
const { width, height } = Dimensions.get('window');
import AliIcon from '../../assets/AliIcon';
import Storage from '../../storage/DeviceStorage';
import HttpService from '../../services/HttpService';
import ToastService from '../../services/ToastServices';
import MyReferrer from '../../components/account/fans/MyReferrer';
import FootService from '../../services/FootService';

export default class FansScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            SkipCount: 0,
            myReferrer: {
                grade: '',
                nickName: '',
                phoneNumber: '',
                logo: 'http://wx.zhihuiyoulian.com/wechat/image/icon/buddha_icon.png'
            },
            totalCount: 0,
            myFans: [],
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
        this.GetOilFans(ApiUrl + '/api/services/app/MyProfile/GetOilFans?MaxResultCount=40&SkipCount='+this.state.SkipCount);
    }

    async GetOilFans(api){
        let token = await Storage.get('user','json');
        if(token == null){
            header.Authorization = 'Bearer ';
        }else{
            header.Authorization = 'Bearer ' + token.accessToken;
        }
        HttpService.get(api, header).then(response => {
            if(response.success){
                let logo = 'http://wx.zhihuiyoulian.com/wechat/image/icon/buddha_icon.png';
                if(response.result.myReferrer.logo != null || response.result.myReferrer.logo != undefined || response.result.myReferrer.logo){
                    logo = response.result.myReferrer.logo
                }
                this.setState({
                    myReferrer: {
                        grade: response.result.myReferrer.grade,
                        nickName: response.result.myReferrer.nickName,
                        phoneNumber: response.result.myReferrer.phoneNumber,
                        logo: logo
                    },
                    totalCount: response.result.myFans.totalCount,
                    myFans: response.result.myFans.items,
                    isLoading: false
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
                this.GetCommissionDetail(ApiUrl + '/api/services/app/MyProfile/GetOilFans?MaxResultCount=40&SkipCount='+this.state.SkipCount);
            })
        }
    }

    renderItem = (item) => {
        let logo = '';
        if(item.item.logo == null || !item.item.logo){
            logo = 'http://wx.zhihuiyoulian.com/wechat/image/icon/buddha_icon.png';
        }else{
            logo = item.item.logo;
        }
        return (
            <View style={styles.listItem} key={item.index}>
                <View style={styles.fansInfoItem}>
                    <View style={styles.fansInfo}>
                        <Image style={styles.avatar} source={{uri: logo, cache: 'force-cache'}} />
                        <View>
                            <View style={styles.name}>
                                <Text style={styles.nickName}>{item.item.nickName}</Text>
                                <View style={styles.grade}><Text style={styles.gradeText}>{item.item.grade}</Text></View>
                                
                            </View>
                            <Text style={styles.phone}>手机：{item.item.phoneNumber}</Text>
                        </View>
                    </View>
                    <View style={styles.jionItem}>
                        <Text style={styles.jionText}>粉丝数：{item.item.numOfFans}</Text>
                        <Text style={styles.jionText}>{item.item.joinDateTime}</Text>
                    </View>
                </View>
                <View style={styles.orderItem}>
                    <Text style={styles.orderNumber}>购买单数：{item.item.numOfOrders}</Text>
                    <Text style={styles.orderPay}>贡献收入：￥{item.item.commissionAmount}</Text>
                </View>
            </View>
        );
    }

    renderRefresh = () => {
        console.log('下拉刷新')
    };

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
            <ScrollView style={styles.container}>
                <MyReferrer myReferrer={this.state.myReferrer} />
                <View style={styles.myFansItem}>
                    <Text>我推荐的用户</Text>
                    <View style={styles.fansNumber}>
                        <Text>{this.state.totalCount}人</Text>
                    </View>
                </View>
                <FlatList 
                    data={this.state.myFans}
                    renderItem={this.renderItem}
                    onEndReachedThreshold={0.1}
                    refreshing={true}
                    // onRefresh={() => this.renderRefresh() }
                    ListFooterComponent={this.footer}
                    onEndReached={() => this.loadingData() } />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f4f4f4'
    },
    myFansItem: {
        backgroundColor: 'white',
        marginTop: 10,
        borderBottomColor: '#f4f4f4',
        borderBottomWidth: 0.5,
        borderStyle: 'solid',
        padding: 15,
        flexDirection: 'row'
    },
    fansNumber: {
        flex: 1,
        alignItems: 'flex-end'
    },
    listItem: {
        backgroundColor: 'white',
        marginBottom: 10
    },
    fansInfoItem: {
        flexDirection: 'row',
        padding: 10,
        paddingLeft: 15,
        paddingRight: 15
    },
    fansInfo: {
        flexDirection: 'row'
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginRight: 10
    },
    phone: {
        fontSize: 12,
        paddingTop: 5
    },
    name: {
        flexDirection: 'row',
        paddingTop: 5
    },
    nickName: {
        color: '#222',
        fontWeight: 'bold'
    },
    grade: {
        marginLeft: 10
    },
    gradeText: {
        color: 'white',
        fontSize: 10,
        color: 'white',
        borderRadius: 10,
        padding: 5,
        paddingTop: 2,
        paddingBottom: 2,
        backgroundColor: '#f7bb43'
    },
    footText: {
        textAlign: 'center',
        paddingBottom: 20,
        paddingTop: 20,
        color: '#bbb'
    },
    jionItem: {
        alignItems: 'flex-end',
        flex: 1
    },
    jionText: {
        fontSize: 12,
        color: '#bbb',
        paddingTop: 5
    },
    orderItem: {
        padding: 10,
        paddingLeft: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 0.5,
        borderStyle: 'solid',
        flexDirection: 'row'
    },
    orderNumber: {
        fontSize: 12,
        width: 150
    },
    orderPay: {
        fontSize: 12
    }
})