import React,{Component} from 'react'
import {
    View,
    Dimensions,
    StyleSheet,
    Text,
    ImageBackground,
    Image,
    TouchableOpacity
} from 'react-native';
const { width, height } = Dimensions.get('window');
import AliIcon from '../../assets/AliIcon';

export default class VipPageUserInfo extends Component {
    constructor(props){
        super(props);
    }

    goToInviteCode = () => {
        alert(44)
    }

    getVipItem = () => {
        alert(33)
    }

    render(){
        return(
            <ImageBackground style={styles.topIamge} source={{uri: 'http://wx.zhihuiyoulian.com/wechat/image/vip_top_bg.png',cache:'force-cache'}}>
                <View style={styles.userInfoItem}>
                    <View style={styles.userInfo}>
                        <Image style={styles.avatar} source={{uri: this.props.userInfo.avatar,cache:'force-cache'}} />
                        <View style={styles.userItem}>
                            <Text style={styles.userName}>{this.props.userInfo.nickName}</Text>
                            <View style={styles.inviteCodeItem}>
                                <Text style={styles.inviteCode}>邀请码：{this.props.userInfo.inviteCode}</Text>
                                <TouchableOpacity onPress={() => this.goToInviteCode()}>
                                    <AliIcon 
                                        name={'erweima'}
                                        size={14}
                                        style={{color: 'white'}}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => this.getVipItem()} style={styles.getVipItem}>
                        <Image style={styles.getIcon} source={{uri: 'http://wx.zhihuiyoulian.com/wechat/image/get_vip.png',cache: 'force-cache'}} />
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    topIamge: {
        height: width * 410 / 750
    },
    userInfoItem: {
        paddingTop: 30,
        paddingLeft: 30,
        position: 'relative'
    },
    userInfo: {
        flexDirection: 'row'
    },
    avatar: {
        width: 55,
        height: 55,
        borderRadius: 50,
        borderWidth:2,
        borderColor:'white'
    },
    userItem: {
        paddingLeft: 15
    },
    userName: {
        fontSize: 20,
        color: 'white'
    },
    inviteCode: {
        color: 'white',
        paddingRight: 10
    },
    inviteCodeItem: {
        paddingTop: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    getVipItem: {
        position: 'absolute',
        top: 30,
        right: 0,
        width: 60,
        height: 50
    },
    getIcon: {
        width: 60,
        height: 50
    }
})