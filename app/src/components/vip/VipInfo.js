import React,{Component} from 'react'
import {
    View,
    Dimensions,
    StyleSheet,
    Text,
    ImageBackground,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import BVLinearGraient from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const { width, height } = Dimensions.get('window');

export default class VipInfo extends Component {
    constructor(props){
        super(props);
    }

    render(){
        const { navigate } = this.props.navigation;
        return(
            <View>
                <ImageBackground style={styles.topIamge} source={{uri: 'http://wx.zhihuiyoulian.com/wechat/image/vip_bg.png',cache: 'force-cache'}}>
                    <Image style={styles.topIamgeIcon} source={{uri: 'http://wx.zhihuiyoulian.com/wechat/image/libao.png',cache: 'force-cache'}} />
                </ImageBackground>
                <View style={styles.vipInifoItem}>
                    <View style={styles.vipInifo}>
                        <View style={styles.hotTitle}>
                            <Text style={styles.hotTitleText}>VIP会员特权</Text>
                        </View>
                        <View style={styles.userStep}>
                            <View style={[styles.userItem,styles.normal]}>
                                <Text style={styles.userText}>普通会员</Text>
                            </View>
                            <View style={styles.userItem}>
                                <Text style={styles.userText}>VIP</Text>
                            </View>
                        </View>
                        <LinearGradient style={styles.progress} colors={['#FF8635','#ffc047']} start={{x: 0, y: 0}} end={{x: 1, y: 1}}></LinearGradient>
                        <View style={styles.vipIcon}>
                            <LinearGradient style={styles.vipIconItem} colors={['#FF8635','#ffc047']} start={{x: 0, y: 0}} end={{x: 1, y: 1}}>
                                <View style={styles.vipIconBox}>
                                    <Text style={styles.vipIconText}>VIP</Text>
                                </View>
                            </LinearGradient>
                        </View>
                        <View style={styles.shareStep}>
                            <View style={styles.shareStepItem}>
                                <Text style={styles.shareStepText}>加油省钱</Text>
                                <Text style={styles.shareStepText}>分享赚钱</Text>
                            </View>
                            <View style={[styles.shareStepItem,styles.shareStepRight]}>
                                <Text style={styles.shareStepText}>收益翻N倍</Text>
                                <Text style={styles.shareStepText}>年收益40万+</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => navigate('VipGiftPackage',{name: 'VIP创业大礼包'})} style={styles.btn}>
                            <LinearGradient style={styles.viewInfoMore} colors={['#FF8635','#ffc047']} start={{x: 0, y: 0}} end={{x: 1, y: 1}}>
                                <Text style={styles.btnText}>点击了解详情</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.vipPrivilege}>
                    <View style={styles.vipPrivilegeMain}>
                        <Text style={styles.vipPrivilegeText}>VIP特权</Text>
                        <View style={styles.vipPrivilegeItem}>
                            <Image style={styles.privilegeImage} source={{uri: 'http://wx.zhihuiyoulian.com/wechat/image/money_bg.png',cache:"force-cache"}} />
                            <View>
                                <Text style={styles.privilegeMainText}>自用省钱</Text>
                                <Text style={styles.privilegeSubText}>油卡充值好礼多多，折扣多多</Text>
                            </View>
                        </View>
                        <View style={styles.vipPrivilegeItem}>
                            <Image style={styles.privilegeImage} source={{uri: 'http://wx.zhihuiyoulian.com/wechat/image/share_bg.png',cache: 'force-cache'}} />
                            <View>
                                <Text style={styles.privilegeMainText}>分享赚钱</Text>
                                <Text style={styles.privilegeSubText}>分享VIP礼包成交后可赚佣金，动动手指，轻松赚钱</Text>
                            </View>
                        </View>
                        <View style={styles.vipPrivilegeItem}>
                            <Image style={styles.privilegeImage} source={{uri: 'http://wx.zhihuiyoulian.com/wechat/image/invite_bg.png',cache: 'force-cache'}} />
                            <View>
                                <Text style={styles.privilegeMainText}>推荐有奖</Text>
                                <Text style={styles.privilegeSubText}>推荐好友成为VIP，可最低获得1000元奖励</Text>
                            </View>
                        </View>
                        <View style={styles.vipPrivilegeItem}>
                            <Image style={styles.privilegeImage} source={{uri: 'http://wx.zhihuiyoulian.com/wechat/image/study_bg.png',cache: 'force-cache'}} />
                            <View>
                                <Text style={styles.privilegeMainText}>专业培训</Text>
                                <Text style={styles.privilegeSubText}>成为VIP可获得价值2860元培训课程</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    topIamge: {
        height: width * 290 / 750
    },
    topIamgeIcon: {
        width: '100%',
        height: width * 182 / 750,
        resizeMode: 'cover',
        position: 'relative',
        zIndex: 1
    },
    vipInifoItem: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -(width * (290-182) / 750) - 30
    },
    vipInifo: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        paddingTop: 30,
        paddingLeft: 40,
        paddingRight: 40,
        paddingBottom: 20
    },
    hotTitle: {
        alignItems: 'center',
        paddingBottom: 20
    },
    hotTitleText: {
        fontSize: 18,
        color: '#000'
    },
    userStep: {
        flexDirection:'row',
        paddingBottom: 5
    },
    userItem: {
        width: '50%',
        flexDirection:'row-reverse'
    },
    normal: {
        flexDirection:'row'
    },
    userText: {
        color: '#FF8635'
    },
    progress: {
        height: 5,
        borderRadius: 5,
        marginTop: 3
    },
    vipIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -25
    },
    vipIconItem: {
        borderRadius: 50,
        width: 50,
        height: 50,
        lineHeight: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    vipIconBox: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        width: 40,
        height: 40,
    },
    vipIconText: {
        color: '#FF8635',
        fontSize: 18
    },
    shareStep: {
        flexDirection: 'row',
        marginTop: -15
    },
    shareStepItem: {
        width: '50%',
    },
    shareStepRight: {
        alignItems:'flex-end'
    },
    shareStepText: {
        color: '#212121'
    },
    btn: {
        marginTop: 20
    },
    viewInfoMore: {
        alignItems: 'center',
        borderRadius: 30,
        paddingBottom: 10,
        paddingTop: 10
    },
    btnText: {
        fontSize: 16,
        color: 'white'
    },
    vipPrivilege: {
        alignItems: 'center',
        marginTop: 30,
        paddingBottom: 20
    },
    vipPrivilegeMain: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        paddingBottom: 0
    },
    vipPrivilegeText: {
        fontSize: 18,
        color: '#000',
        paddingBottom: 10
    },
    vipPrivilegeItem: {
        flexDirection: 'row',
        marginBottom: 20
    },
    privilegeImage: {
        width: 40,
        height: 40,
        resizeMode: 'cover',
        marginRight: 10
    },
    privilegeMainText: {
        fontSize: 14,
        paddingBottom: 1
    },
    privilegeSubText: {
        paddingRight: '15%',
        fontSize: 12
    }
})