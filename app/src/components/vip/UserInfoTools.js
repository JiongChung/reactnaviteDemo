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
import BVLinearGraient from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class UserInfoTools extends Component {
    constructor(props){
        super(props);
    }

    withdraw = () => {
        this.props.navigation.navigate('Withdraw',{name: '提现'});
    }

    render(){
        return(
            <View style={styles.container}>
                <ImageBackground style={styles.topIamge} source={{uri: 'http://wx.zhihuiyoulian.com/wechat/image/vip_info_bg.png',cache:'force-cache'}}>
                    <View style={styles.userInfoItem}>
                        <View>
                            <Text style={styles.totalText}>佣金总额</Text>
                            <View style={styles.totalAmountItem}>
                                <Text style={styles.totalAmount}>{this.props.userAssets.totalCommission}</Text>
                                <Text style={{paddingBottom: 10}}>(元)</Text>
                            </View>
                        </View>
                        <View style={styles.withdrawItem}>
                            <TouchableOpacity onPress={() => this.withdraw()}>
                                <LinearGradient style={{borderRadius: 15}} colors={['#ffc047','#FF8635']} start={{x: 0, y: 0}} end={{x: 1, y: 1}}>
                                    <Text style={styles.btnText}>提现</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.userAssetsItem}>
                        <View style={styles.assetsList}>
                            <Text style={styles.assetsAmount}>{this.props.userAssets.salesCommission}</Text>
                            <Text style={styles.assetsText}>业务奖</Text>
                            <View style={styles.line}></View>
                        </View>
                        <View style={styles.assetsList}>
                            <Text style={styles.assetsAmount}>{this.props.userAssets.trainningCommission}</Text>
                            <Text style={styles.assetsText}>服务奖</Text>
                            <View style={styles.line}></View>
                        </View>
                        <View style={styles.assetsList}>
                            <Text style={styles.assetsAmount}>{this.props.userAssets.todayCommission}</Text>
                            <Text style={styles.assetsText}>今日收入</Text>
                            <View style={styles.line}></View>
                        </View>
                        <View style={styles.assetsList}>
                            <Text style={styles.assetsAmount}>{this.props.userAssets.thisMonthCommission}</Text>
                            <Text style={styles.assetsText}>本月收入</Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: -80,
        paddingLeft: 15,
        paddingRight: 15
    },
    topIamge: {
        width: width - 30,
        height: (width - 30) * 310 / 710
    },
    userInfoItem: {
        padding: 20,
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10
    },
    totalText: {
        
    },
    totalAmount: {
        fontSize: 42,
        paddingRight: 3,
        color: 'black'
    },
    totalAmountItem: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    withdrawItem: {
        flex: 1,
        alignItems: 'flex-end'
    },
    btnText: {
        color: 'white',
        paddingBottom: 7,
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 7
    },
    userAssetsItem: {
        flexDirection: 'row'
    },
    assetsList: {
        flex: 1,
        alignItems: 'center',
        position: 'relative'
    },
    line: {
        position: 'absolute',
        top: 10,
        right: 0,
        bottom: 10,
        borderRightColor: '#bbb',
        borderRightWidth: 0.5,
        borderStyle: 'solid'
    },
    assetsAmount: {
        fontSize: 14,
        color: '#222'
    },
    assetsText: {
        fontSize: 12
    }
})