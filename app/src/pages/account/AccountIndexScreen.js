import React, { Component } from 'react';
import {
    View,
    Dimensions,
    StyleSheet,
    Text,
    ImageBackground,
    Image,
    TouchableOpacity,
    DeviceEventEmitter
} from 'react-native';

const { width, height } = Dimensions.get('window');
import AliIcon from '../../assets/AliIcon';
import Storage from '../../storage/DeviceStorage';
import HttpService from '../../services/HttpService'; 
// import { createStackNavigator, createAppContainer,StackActions, NavigationActions  } from "react-navigation";
import UserAssetsTools from '../../components/account/UserAssetsTools';

export default class AccountIndexScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            nickName: '登录/注册',
            showLevel: false,
            avatar: 'http://wx.zhihuiyoulian.com/wechat/image/icon/buddha_icon.png',
            gradeName: '',
            userInfo: {
                activePoint: 0,
                inProgressPoint: 0,
                remainingPoint: 0,
                totalPoint: 0,
                totalCoin: 0,
                availableCoupon: 0,
                totalCommission: 0,
                totalFans: 0
            }
        };
    }

    componentDidMount(){
        this.GetMyProfile(ApiUrl + '/api/services/app/MyProfile/GetMyProfile');
        this.deEmitter = DeviceEventEmitter.addListener('left', (parms) => {
            if(parms == 'RefreshMainPage'){
                this.GetMyProfile(ApiUrl + '/api/services/app/MyProfile/GetMyProfile');
            }
        });
    }

    componentWillUnmount(){
        this.deEmitter.remove();
    }

    async GetMyProfile(api){
        let token = await Storage.get('user','json');
        if(token == null){
            header.Authorization = 'Bearer ';
        }else{
            header.Authorization = 'Bearer ' + token.accessToken;
        }
        HttpService.get(api, header).then(response => {
            console.log(response)
            if(response.success){
                this.setState({
                    showLevel: true,
                    gradeName: response.result.gradeName,
                    nickName: response.result.nickName,
                    avatar: response.result.logo,
                    userInfo: {
                        activePoint: response.result.activePoint,
                        inProgressPoint: response.result.inProgressPoint,
                        remainingPoint: response.result.remainingPoint,
                        totalPoint: response.result.totalPoint,
                        totalCoin: response.result.totalCoin,
                        availableCoupon: response.result.availableCoupon,
                        totalCommission: response.result.totalCommission,
                        totalFans: response.result.totalFans
                    }
                });
            }
        })
        .catch(error => console.error(error)).done();
    }

    openSetting = () => {
        alert(11)
    }

    checkLevel = () => {
        if(this.state.showLevel){
            return <View style={styles.level}><Text style={styles.levelInfo}>{this.state.gradeName}</Text></View>;
        }else{
            return <View></View>
        }
    }

    

    render(){
        let {showLevel} = this.state;
        const { navigate } = this.props.navigation;
        return(
            <View style={styles.container}>
                <ImageBackground style={styles.userBg} source={{uri:"http://wx.zhihuiyoulian.com/wechat/image/my_bg.png",cache:'force-cache'}}>
                    <View style={styles.userInfoItem}>
                        <Image style={styles.avatar} source={{uri: this.state.avatar,cache:'force-cache'}} />
                        <View style={styles.userInfo}>
                            <Text style={styles.username}>{this.state.nickName}</Text>
                            {this.checkLevel()}                  
                        </View>
                        <View style={styles.settingItem}>
                            <TouchableOpacity onPress={() => this.openSetting()} style={styles.settingTag}>
                                <AliIcon
                                    name={'setting'}
                                    size={20}
                                    style={{color: 'white'}}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
                <UserAssetsTools navigation={this.props.navigation} userInfo={this.state.userInfo} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f7f7f7',
        height: height
    },
    userBg: {
        width: width,
        height: width * 355 / 750
    },
    userInfoItem: {
        paddingLeft: 30,
        paddingTop: 30,
        flexDirection:'row'
    },
    avatar: {
        width: 55,
        height: 55,
        borderRadius: 50
    },
    userInfo: {
        paddingLeft: 20
    },
    username: {
        color: 'white',
        fontSize: 20,
        paddingBottom: 5
    },
    level: {
        flexDirection: 'row'
    },
    levelInfo: {
        backgroundColor: 'rgba(255,255,255,0.3)',
        fontSize: 10,
        color: 'white',
        borderRadius: 10,
        padding: 7,
        paddingTop: 2,
        paddingBottom: 2
    },
    settingItem: {
        flexDirection: 'row-reverse',
        flex: 1
    },
    settingTag: {
        marginRight: 20
    }
})