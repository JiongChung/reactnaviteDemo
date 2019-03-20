import React, {Component} from 'react';
import {
    View, 
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    ImageBackground
} from 'react-native';
import BVLinearGraient from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AliIcon from '../../assets/AliIcon';
const { width, height } = Dimensions.get('window');
import ScrollVertical from '../../services/ScrollVertical';

const dataArray = [
    {
        avatar: 'http://wx.zhihuiyoulian.com/wechat/image/icon/buddha_icon.png',
        nickname: '加油好',
        phone: '138****9965'
    },
    {
        avatar: 'http://wx.zhihuiyoulian.com/wechat/image/icon/buddha_icon.png',
        nickname: '省钱人',
        phone: '130****9152'
    },
    {
        avatar: 'http://wx.zhihuiyoulian.com/wechat/image/icon/buddha_icon.png',
        nickname: '幸福人生',
        phone: '138****8832'
    },
    {
        avatar: 'http://wx.zhihuiyoulian.com/wechat/image/icon/buddha_icon.png',
        nickname: '一帘幽梦',
        phone: '188****3253'
    },
    {
        avatar: 'http://wx.zhihuiyoulian.com/wechat/image/icon/buddha_icon.png',
        nickname: '浮生',
        phone: '150****9685'
    },
    {
        avatar: 'http://wx.zhihuiyoulian.com/wechat/image/icon/buddha_icon.png',
        nickname: '炮兵人生',
        phone: '158****1137'
    },
    {
        avatar: 'http://wx.zhihuiyoulian.com/wechat/image/icon/buddha_icon.png',
        nickname: '丰田哥',
        phone: '135****2308'
    },
    {
        avatar: 'http://wx.zhihuiyoulian.com/wechat/image/icon/buddha_icon.png',
        nickname: '王炸',
        phone: '156****7755'
    },
    {
        avatar: 'http://wx.zhihuiyoulian.com/wechat/image/icon/buddha_icon.png',
        nickname: '加油人生',
        phone: '156****1111'
    },
    {
        avatar: 'http://wx.zhihuiyoulian.com/wechat/image/icon/buddha_icon.png',
        nickname: '出租王',
        phone: '158****7635'
    },
    {
        avatar: 'http://wx.zhihuiyoulian.com/wechat/image/icon/buddha_icon.png',
        nickname: '滴滴找我',
        phone: '152****9652'
    },
    {
        avatar: 'http://wx.zhihuiyoulian.com/wechat/image/icon/buddha_icon.png',
        nickname: '宝马740Li',
        phone: '158****8888'
    },
    {
        avatar: 'http://wx.zhihuiyoulian.com/wechat/image/icon/buddha_icon.png',
        nickname: '阿尔法战斗机',
        phone: '156****3522'
    },
    {
        avatar: 'http://wx.zhihuiyoulian.com/wechat/image/icon/buddha_icon.png',
        nickname: '雷凌小子',
        phone: '159****1255'
    },
    {
        avatar: 'http://wx.zhihuiyoulian.com/wechat/image/icon/buddha_icon.png',
        nickname: '小雷',
        phone: '150****8544'
    },
    {
        avatar: 'http://wx.zhihuiyoulian.com/wechat/image/icon/buddha_icon.png',
        nickname: '雷震',
        phone: '156****0021'
    },
    {
        avatar: 'http://wx.zhihuiyoulian.com/wechat/image/icon/buddha_icon.png',
        nickname: '风行',
        phone: '150****1888'
    }
]

export default class VipGiftPackageScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            imgTopList: [
                'http://wx.zhihuiyoulian.com/wechat/image/imgs/gift/20181114_01.jpg',
                'http://wx.zhihuiyoulian.com/wechat/image/imgs/gift/20181114_02.jpg'
            ],
            imgHeightList: [width,width*470/750,width*84/750],
            imgBottomList: [
                'http://wx.zhihuiyoulian.com/wechat/image/imgs/gift/20181114_03.jpg',
                'http://wx.zhihuiyoulian.com/wechat/image/imgs/gift/20181114_04.jpg',
                'http://wx.zhihuiyoulian.com/wechat/image/imgs/gift/20181114_05.jpg',
                'http://wx.zhihuiyoulian.com/wechat/image/imgs/gift/20181114_06.jpg',
                'http://wx.zhihuiyoulian.com/wechat/image/imgs/gift/20181114_07.jpg',
                'http://wx.zhihuiyoulian.com/wechat/image/imgs/gift/20181114_08.jpg',
                'http://wx.zhihuiyoulian.com/wechat/image/imgs/gift/20181114_09.jpg',
                'http://wx.zhihuiyoulian.com/wechat/image/imgs/gift/20181114_10.jpg'
            ],
            imgBottomHeightList: [width*623/750,width,width,width,width,width*749/750,width,width]
        };
    }

    static navigationOptions = ({navigation})=>({
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
        headerRight: (
            <TouchableOpacity onPress={()=>navigation.state.params.navigatePress()} style={{marginRight: 20}}>
                <AliIcon
                    name={'shareicon'}
                    size={20}
                    style={{color: 'white'}}
                />
            </TouchableOpacity>
        )
    });
    

    shareWechat = () => {
        alert(3333)
    }

    componentDidMount(){
        this.props.navigation.setParams({ navigatePress:this.shareWechat });
    }

    onPress =()=> {
        alert(222)
    }

    render(){
        let array = [{ content: '' }];
        if (dataArray && dataArray.length > 0) {
            array = [];
            for (let item of dataArray) {
                array.push({ avatar: item.avatar, nickname: item.nickname,phone: item.phone});
            }
        }
        
        let imgTopList = [];
        this.state.imgTopList.map((item, index) => imgTopList.push(<Image key={index}
            style={{height: this.state.imgHeightList[index]}}
            source={{uri: item}}
            resizeMode="cover" />));
        let imgBottomList = [];
        this.state.imgBottomList.map((item, index) => imgBottomList.push(<Image  key={index}
            style={{height: this.state.imgBottomHeightList[index]}}
            source={{uri: item}}
            resizeMode="cover" />));

        const { navigate } = this.props.navigation;
        return(
            <View>
                <ScrollView style={styles.scrollView}>
                    <View>
                        {imgTopList}
                    </View>
                    <View style={styles.scrollBg}>
                        <View style={styles.scrollBgBox}>
                            <View style={styles.title}>
                                <Text style={styles.titleText}>抢购记录</Text>
                            </View>
                            <View style={styles.barItem}>
                                <View style={[styles.barTitle,styles.avatar]}><Text style={styles.barTitleText}>头像</Text></View>
                                <View style={styles.barTitle,styles.nickname}><Text style={styles.barTitleText}>昵称</Text></View>
                                <View style={styles.barTitle,styles.phone}><Text style={styles.barTitleText}>手机号码</Text></View>
                            </View>
                            <ScrollVertical
                                onChange={(index => {
                                    this.index = index;
                                })}
                                enableAnimation={true}
                                data={dataArray}
                                delay={2500}
                                duration={1000}
                                scrollHeight={30}
                                multiLine={4} //显示多少行，默认为1
                                scrollType={2} // 滚动类型
                                scrollStyle={{ flexDirection:'row',alignItems: 'center'}}
                                textStyle={{ color: 'blue', fontSize: 14 }} />
                        </View>
                    </View>
                    <View>
                        {imgBottomList}
                    </View>
                </ScrollView>
                <View style={styles.buyNow}>
                    <TouchableOpacity onPress={() => navigate('BuyGift',{name: '创业大礼包购买',packName: 'VIP创业大礼包', type: 4, price: 399, isHaoLiRealTimeRecharge: false})}>
                        <LinearGradient style={styles.viewInfoBuy} colors={['#FF5353','#ee0000']} start={{x: 0, y: 0}} end={{x: 1, y: 1}}>
                            <Text style={styles.btnText}>立即购买</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    scrollBg:{
        height: 220,
        backgroundColor: '#f9a92c',
        alignItems: 'center'
    },
    scrollBgBox: {
        width: width * 630 / 750,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10
    },
    title: {
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 10
    },
    titleText: {
        fontSize: 20,
        color: '#ffbe5e'
    },
    barItem: {
        flexDirection:'row',
        alignItems: 'center',
        paddingBottom: 5
    },
    barTitle: {
        alignItems: 'center'
    },
    avatar: {
        width: '20%',
        alignItems: 'center'
    },
    nickname: {
        width: '40%',
        alignItems: 'center'
    },
    phone: {
        width: '40%',
        alignItems: 'center'
    },
    barTitleText: {
        fontSize: 16
    },
    buyNow: {
        position: 'absolute',
        bottom: 40,
        zIndex: 2,
        alignSelf: 'center',
        width: 150
    },
    scrollView: {
        position: 'relative',
        zIndex: 1
    },
    viewInfoBuy: {
        alignItems: 'center',
        borderRadius: 30,
        paddingBottom: 10,
        paddingTop: 10
    },
    btnText: {
        color: '#fff',
        fontSize: 16
    }
});