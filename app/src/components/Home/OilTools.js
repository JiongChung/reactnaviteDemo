import React, { Component } from 'react';
import {
    View,
    Image,
    Dimensions,
    StyleSheet,
    Text,
    ImageBackground,
    TouchableOpacity,
    DeviceEventEmitter
} from 'react-native';
const { width, height } = Dimensions.get('window');

export default class OilTools extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }

    test = () => {
        alert(3)
        DeviceEventEmitter.emit('left', '发送了个通知');
    }

    render(){
        const { navigate } = this.props.navigation;
        return(
            <View>
                <View style={styles.container}>
                    <View style={styles.title}>
                        <View style={styles.icon}></View>
                        <Text style={styles.text}>加油专区</Text>
                    </View>
                    <View style={styles.toolitem}>
                        <View style={styles.bar}>
                            <TouchableOpacity onPress={() => navigate('Login')}>
                                <ImageBackground style={styles.updateVip} source={{uri:"http://wx.zhihuiyoulian.com/wechat/image/haoli_bg.png",cache:'force-cache'}}>
                                    <View style={styles.haoliTitle}>
                                        <Text style={styles.haoliHotText}>0元加油</Text>
                                        <Text style={styles.haoliText}>你加油 我买单</Text>
                                        <Text style={styles.haoliText}>VIP及以上尊享</Text>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.bar}>
                            <ImageBackground style={styles.immediateItem} source={{uri:'http://wx.zhihuiyoulian.com/wechat/image/charge_now_bg.png',cache:'force-cache'}}>
                                <TouchableOpacity onPress={() => navigate('ImmediateRecharge',{name: '即时充值'})}>
                                    <Image style={styles.chargenowIcon} source={{uri:'http://wx.zhihuiyoulian.com/wechat/image/charge_now_ch.png',cache:'force-cache'}} />
                                    <Text style={styles.subItemTitle}>即时加油</Text>
                                    <Text style={styles.subItemText}>赠送5%消费补贴</Text>
                                    <Text style={styles.subItemText}>油联会员及以上尊享</Text>
                                </TouchableOpacity>
                            </ImageBackground>
                            <ImageBackground style={styles.groupbuy} source={{uri:'http://wx.zhihuiyoulian.com/wechat/image/team_charge.png',cache:'force-cache'}}>
                                <TouchableOpacity onPress={() => this.test()}>
                                    <Text style={styles.subItemTitle}>团购加油</Text>
                                    <Text style={styles.subItemText}>最低6.7折 等额到帐</Text>
                                    <Text style={styles.subItemText}>超V及以上尊享</Text>
                                </TouchableOpacity>
                            </ImageBackground>
                        </View>
                    </View>
                </View>
                <View style={styles.serviceItem}>
                    <View style={styles.title}>
                        <View style={styles.icon}></View>
                        <Text style={styles.text}>一站式服务</Text>
                    </View>
                    <View style={styles.serviceContainer}>
                        <View style={styles.serviceBar}>
                            <ImageBackground style={styles.serviceIcon} source={{uri:'http://wx.zhihuiyoulian.com/wechat/image/zcoy.png',cache:'force-cache'}}>
                                <View style={styles.serviceText}>
                                    <Text style={styles.serviceSubText}>支持欧粤</Text>
                                    <Text style={styles.serviceSubText}>中石油/中石化</Text>
                                </View>
                            </ImageBackground>
                        </View>
                        <View style={styles.serviceBar}>
                            <ImageBackground style={styles.serviceIcon} source={{uri: 'http://wx.zhihuiyoulian.com/wechat/image/back.png',cache:'force-cache'}}>
                                <View style={styles.serviceText}>
                                    <Text style={styles.serviceSubText}>银行监管</Text> 
                                    <Text style={styles.serviceSubText}>100%安全</Text> 
                                </View>
                            </ImageBackground>
                        </View>
                        <View style={styles.serviceBar}>
                            <ImageBackground style={styles.serviceIcon} source={{uri:'http://wx.zhihuiyoulian.com/wechat/image/dztc.png',cache:'force-cache'}}>
                                <View style={styles.serviceText}>
                                    <Text style={styles.serviceSubText}>多种套餐</Text>
                                    <Text style={styles.serviceSubText}>越加越省</Text>
                                </View>
                            </ImageBackground>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    icon: {
        width: 3,
        height: 15,
        backgroundColor: '#ee0000',
        marginTop: 3
    },
    title: {
        padding: 10,
        flexDirection:'row',
        paddingTop: 15,
    },
    text: {
        fontSize: 16,
        color: 'black',
        paddingLeft: 10
    },
    updateVip: {
        height: (width / 2 -20) * 332 / 345
    },
    toolitem: {
        flexDirection:'row',
        paddingBottom: 5
    },
    bar: {
        flex: 1,
        padding: 10,
        paddingTop: 0
    },
    haoliTitle: {
        padding:20,
        paddingTop: 15
    },
    haoliHotText: {
        fontSize: 14,
        lineHeight: 24,
        color: 'white'
    },
    haoliText: {
        lineHeight: 18,
        color: 'white',
        fontSize: 10
    },
    immediateItem: {
        height: (width / 2 -20) * 156 / 345,
        position: 'relative'
    },
    chargenowIcon: {
        position: 'absolute',
        right: 0,
        top: -20,
        width: (width / 2 -20) * 156 / 345 * 131 / 196,
        height: (width / 2 -20) * 156 / 345
    },
    subItemTitle:{
        color: 'white',
        fontSize: 14,
        lineHeight: 24,
        paddingLeft: 20,
        paddingTop: 5
    },
    subItemText: {
        color: 'white',
        lineHeight: 18,
        paddingLeft: 20,
        fontSize: 10
    },
    groupbuy: {
        height: (width / 2 -20) * 156 / 345,
        marginTop: (width / 2 -20) * 332 / 345 - (width / 2 -20) * 156 / 345 * 2
    },
    serviceItem: {
        marginTop: 15,
        backgroundColor: 'white'
    },
    serviceContainer: {
        flexDirection:'row',
        padding: 10,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 0,
        paddingBottom: 15
    },
    serviceBar: {
        flex: 1,
        justifyContent: 'space-between',
        marginLeft: 5,
        marginRight: 5
    },
    serviceIcon: {
        height: (width - 40) / 3 * 120 / 230
    },
    serviceText: {
        paddingTop: 10,
        paddingLeft: 15,
    },
    serviceSubText: {
        paddingBottom: 2,
        paddingTop: 2,
        fontSize: 10
    }
});