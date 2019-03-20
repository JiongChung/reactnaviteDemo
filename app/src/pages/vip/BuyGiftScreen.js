import React, {Component} from 'react';
import {
    View,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    ScrollView
} from 'react-native';
import Storage from '../../storage/DeviceStorage';
import HttpService from '../../services/HttpService';
const { width, height } = Dimensions.get('window');
import XPay from 'react-native-puti-pay';
import ToastService from '../../services/ToastServices';
import AliIcon from '../../assets/AliIcon';
import BVLinearGraient from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class BuyGiftScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            addressId: 0,
            productName: '',
            cardNumber: '',
            type: 0,
            orderAmount: 0,
            payMethod: 1,
            isHaoLiRealTimeRecharge: false,
            toastStatus: false,
            chargeMoney: 0,
            username: '',
            address: '',
            phone: '',
            myOilCards: []
        };
    }

    static navigationOptions = ({navigation})=>{
        return {
            title: `${navigation.state.params.name}`,
            headerTitleStyle: {
                alignSelf: 'center',
                flex:1, 
                textAlign: 'center',
                color: 'white'
            },
            headerStyle: {
                backgroundColor: '#EE0000'
            },
            headerRight: <View />
        }
    };

    componentWillMount(){
        this.setState({
            productName: this.props.navigation.state.params.name,
            type: this.props.navigation.state.params.type,
            isHaoLiRealTimeRecharge: this.props.navigation.state.params.isHaoLiRealTimeRecharge
        });
    }


    componentDidMount(){
        let input = {
            orderType: this.state.type,
            isHaoLiRealTimeRecharge: this.state.isHaoLiRealTimeRecharge
        };
        this.InitBuyGiftPackage(ApiUrl+'/api/services/app/UserAsset/InitBuyGiftPackage', input);
    }

    async InitBuyGiftPackage(api, params){
        let token = await Storage.get('user','json');
        if(token == null){
            header.Authorization = 'Bearer ';
        }else{
            header.Authorization = 'Bearer ' + token.accessToken;
        }
        HttpService.post(api, header, params).then(response => {
            if(response.success){
                let result = response.result;
                if(this.state.type != 6){
                    this.setState({
                        chargeMoney: result.unitPrice
                    })
                }
                this.setState({
                    username: result.shipTo,
                    address: result.address,
                    phone: result.phoneNumber,
                    addressId: result.userShippingAddressId,
                    myOilCards: result.myOilCards
                });
            }
        })
        .catch(error => console.error(error));
    }

    buyNow = () => {
        let input = {
            userShippingAddressId: this.state.addressId,
            giftPackageProducts: this.state.productName,
            oilCardNo: this.state.cardNumber,
            orderType: this.state.type,
            payMethod: this.state.payMethod,
            orderAmount: this.state.orderAmount,
            isHaoLiRealTimeRecharge: this.state.isHaoLiRealTimeRecharge
        }
        this.setState({
            toastStatus: true
        });
        this.buy(ApiUrl + '/api/services/app/UserAsset/BuyGiftPackage', input);
    }

    async buy(api, params){
        let token = await Storage.get('user','json');
        header.Authorization = 'Bearer ' + token.accessToken; 
        HttpService.post(api, header, params)
        .then(response => {
            this.setState({
                toastStatus: false
            });
            if(response.success){
                let result = response.result;
                if(result.payMethod == 1){
                    //设置微信ID
                    XPay.setWxId(result.weChat.apiKey);
                    let signValue = "appid=" + result.weChat.apiKey;
                    signValue += "&noncestr=" + result.weChat.nonceStr;
                    signValue += "&package=" + result.weChat.package;
                    signValue += "&partnerid=" + result.weChat.mchId;
                    signValue += "&prepayid=" + result.weChat.orderId;
                    signValue += "&timestamp=" + result.weChat.timeStamp;
                    signValue += "&key=" + result.weChat.sign;

                    let params = {
                        partnerId: result.weChat.mchId,
                        prepayId: result.weChat.orderId,
                        packageValue: result.weChat.package,
                        nonceStr: result.weChat.nonceStr,
                        timeStamp: result.weChat.timeStamp,
                        sign: signValue,
                    }
                    XPay.wxPay(params,res=>{
                        
                        const {errCode} = res;
                        if (errCode === 0 || errCode === '0') {
                            this.refs.ToastService.showToastText('充值成功');
                        } else {
                            this.refs.ToastService.showToastText('充值失败');
                        }
                    },error => {
                        console.log(JSON.stringify(error))
                    })
                }else if(result.payMethod == 3){
                    //设置    支付宝URL Schemes
                    let Schemes = result.alipay.split('&')[0].split('=')[1]
                    XPay.setAlipayScheme(Schemes)
                    //支付宝开启沙箱模式 仅限安卓
                    // XPay.setAlipaySandbox(isSandBox)
                    //支付宝支付
                    //orderInfo是后台拼接好的支付参数
                    let orderInfo = result.alipay;
                    XPay.alipay(orderInfo,res=> {
                        const {result, memo, resultStatus} = res;
                        if (resultStatus === '9000') {
                            this.refs.ToastService.showToastText('充值成功');
                        } else {
                            this.refs.ToastService.showToastText('充值失败');
                        }
                    })
                }
            }else{
                this.refs.ToastService.showToastText(response.error.message);
            }
        })
        .catch(error => console.error(error)).done();
    }

    checkPayIcon = () => {

    }

    selectPay = (id) => {
        this.setState({
            payMethod: id
        })
    }

    render(){
        let packageItemList = [];
        if(this.state.type == 4){
            let packageItemView = ['1、400元加油储值卡','2、399元负离子汽车节油卡','3、价值5000元双人旅游卡','4、价值2680 VIP培训课程'];
            packageItemView.map((item, index) => packageItemList.push(<Text key={index} style={styles.packageItemText}>{item}</Text>));
        }
        return(
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.addressItem}>
                        <View style={styles.nameItem}>
                            <Text style={styles.username}>{this.state.username}</Text>
                            <Text style={styles.phone}>{this.state.phone}</Text>
                        </View>
                        <Text style={styles.address}>{this.state.address}</Text>
                    </View>
                    <View style={styles.packageItem}>
                        <Text style={styles.packageItemTitle}>{this.props.navigation.state.params.packName}</Text>
                        <View style={styles.packageItemList}>
                            {packageItemList}
                        </View>
                        <View style={styles.priceItem}>
                            <Text style={styles.priceItemText}>总计：{this.props.navigation.state.params.price}</Text>
                        </View>
                    </View>
                    <View style={styles.payItem}>
                        <Text style={styles.payItemTitle}>支付方式</Text>
                        <View style={styles.payMethod}>
                            <TouchableOpacity style={styles.payMethodBox} onPress={() => this.selectPay(1)}>
                                <View style={styles.payMethodItem}>
                                    <Image style={styles.wechatImg}
                                        source={{uri: 'http://wx.zhihuiyoulian.com/wechat//image/imgs/wechatPay.png', cache: 'force-cache'}}
                                        resizeMode="contain" />
                                    <Text style={styles.payMethodText}>微信支付</Text>
                                </View>
                                {
                                    (this.state.payMethod == 1) ? 
                                        <View style={styles.icon}>
                                            <AliIcon name={'duihao'}
                                                size={20}
                                                style={{color: '#000',alignSelf: 'flex-end'}}
                                            />
                                        </View>
                                    : <Text style={{backgroundColor: 'red',height: 0}}>11</Text>
                                }
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.payMethodBox} onPress={() => this.selectPay(3)}>
                                <View style={styles.payMethodItem}>
                                    <Image style={styles.wechatImg}
                                        source={{uri: 'http://wx.zhihuiyoulian.com/wechat//image/imgs/aliPay.png', cache: 'force-cache'}}
                                        resizeMode="contain" />
                                    <Text style={styles.payMethodText}>支付宝</Text>
                                </View>
                                {
                                    (this.state.payMethod == 3) ? 
                                        <View style={styles.icon}>
                                            <AliIcon name={'duihao'}
                                                size={20}
                                                style={{color: '#000',alignSelf: 'flex-end'}}
                                            />
                                        </View>
                                    : <Text style={{backgroundColor: 'red',height: 0}}>22</Text>
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity onPress={this.buyNow} style={{marginTop: 20,marginBottom: 20}}>
                         <LinearGradient style={styles.buyNow} colors={['#FF5353','#ee0000']} start={{x: 0, y: 0}} end={{x: 1, y: 1}}>
                            <Text style={styles.btnText}>立即付款</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <ToastService toastStatus={this.state.toastStatus}  ref="ToastService" />
            
                </View>
                </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f7f7f7',
        minHeight: height,
        paddingBottom: 0,
        paddingTop: 0
    },
    addressItem: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        paddingTop: 15,
        paddingBottom: 15,
        marginTop: 20
    },
    nameItem: {
        flexDirection: 'row'
    },
    username: {
        color: '#000',
        fontSize: 18,
        paddingRight: 10,
        lineHeight: 30
    },
    phone: {
        color: '#000',
        lineHeight: 30
    },
    address: {
        paddingTop: 5
    },
    packageItem: {
        marginTop: 20,
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        paddingTop: 15,
        paddingBottom: 15
    },
    packageItemTitle: {
        fontSize: 18,
        color: "#000",
        borderColor: '#fff',
        borderBottomColor: '#ddd',
        borderWidth: 0.5,
        borderStyle: 'solid',
        marginLeft: -20,
        marginRight: -20,
        padding: 20,
        paddingTop: 0,
        paddingTop: 15,
        paddingBottom: 15
    },
    packageItemList: {
        paddingTop: 10,
        paddingBottom: 15
    },
    packageItemText: {
        paddingTop: 5,
        paddingBottom: 5,
        fontSize: 14
    },
    priceItem: {
        color: "#000",
        borderColor: '#fff',
        borderTopColor: '#ddd',
        borderWidth: 0.5,
        borderStyle: 'solid',
        marginLeft: -20,
        marginRight: -20,
        padding: 20,
        paddingBottom: 0,
        alignItems: 'flex-end',
        paddingTop: 15,
        paddingBottom: 0
    },
    priceItemText: {
        fontSize: 16,
        color: 'black'
    },
    payItem: {
        marginTop: 20,
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        paddingBottom: 10
    },
    payItemTitle: {
        fontSize: 18,
        color: "#000",
        borderColor: '#fff',
        borderBottomColor: '#ddd',
        borderWidth: 0.5,
        borderStyle: 'solid',
        marginLeft: -20,
        marginRight: -20,
        padding: 20,
        paddingTop: 0
    },
    wechatImg: {
        height: 25,
        width: 147 * 25 / 129,
        marginRight: 15
    },
    payMethod: {
        paddingTop: 10,
        paddingBottom: 0
    },
    payMethodItem: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10
    },
    payMethodText: {
        fontSize: 16
    },
    aliPayImg: {
        height: 25,
        width: 25,
        marginRight: 15
    },
    payMethodBox: {
        paddingBottom: 0
    },
    icon: {
        position: 'absolute',
        right: 0,
        top: 8
    },
    buyNow: {
        alignItems: 'center',
        paddingBottom: 10,
        paddingTop: 10,
        borderRadius: 5
    },
    btnText: {
        color: 'white',
        fontSize: 18
    }
})