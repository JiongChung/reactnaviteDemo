import React, {Component} from 'react';
import {
    View,
    Dimensions,
    StyleSheet,
    Text,
    ImageBackground,
    TouchableOpacity
} from 'react-native';
const { width, height } = Dimensions.get('window');

export default class InviteInfo extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={styles.container}>
                <TouchableOpacity style={styles.inviteItem}>
                    <ImageBackground style={styles.icon} source={{uri: 'http://wx.zhihuiyoulian.com/wechat/image/share_other.png',cache: 'force-cache'}}>
                        <Text style={styles.inviteText}>邀请会员</Text>
                        <View style={styles.info}>
                            <Text style={styles.text}>本月新增</Text>
                            <Text style={styles.amount}>{this.props.inviteInfo.thisMonthMembers}</Text>
                            <Text style={styles.text}>(人)</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.inviteItem,styles.inviteRight]}>
                    <ImageBackground style={styles.icon} source={{uri: 'http://wx.zhihuiyoulian.com/wechat/image/share_vip.png',cache: 'force-cache'}}>
                        <Text style={styles.inviteText}>邀请VIP</Text>
                        <View style={styles.info}>
                            <Text style={styles.text}>本月新增</Text>
                            <Text style={styles.amount}>{this.props.inviteInfo.thisMonthVips}</Text>
                            <Text style={styles.text}>(人)</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        flexDirection: 'row'
    },
    inviteItem: {
        flex: 1
    },
    inviteRight: {
        alignItems: 'flex-end'
    },
    icon: {
        width: (width - 30 -15) / 2,
        height: (width - 30 -15) / 2 * 150 / 345
    },
    inviteText: {
        color: '#a96a2b',
        paddingTop: 10,
        paddingLeft: 10
    },
    info: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 10,
        alignItems: 'flex-end'
    },
    amount: {
        color: '#222',
        paddingLeft: 2,
        paddingRight: 2
    },
    text: {
        fontSize: 12
    }
});