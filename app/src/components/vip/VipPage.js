import React,{Component} from 'react'
import {
    View,
    Dimensions,
    StyleSheet,
    Text
} from 'react-native';
const { width, height } = Dimensions.get('window');
import Storage from '../../storage/DeviceStorage';
import HttpService from '../../services/HttpService';
import AliIcon from '../../assets/AliIcon';
import VipPageUserInfo from './VipPageUserInfo';
import UserInfoTools from './UserInfoTools';
import InviteInfo from './InviteInfo';
import Achievement from './Achievement';
import BusinessSchool from './BusinessSchool';

export default class VipPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            nickName: '',
            inviteCode: '',
            avatar: 'http://wx.zhihuiyoulian.com/wechat/image/icon/buddha_icon.png',
            totalCommission: 0,
            thisMonthCommission: 0,
            salesCommission: 0,
            trainningCommission: 0,
            todayCommission: 0,
            thisMonthMembers: 0,
            thisMonthVips: 0
        }
    }

    componentDidMount(){
        this.VipProfile(ApiUrl + '/api/services/app/VipProfile/Init');
    }

    async VipProfile(api){
        let token = await Storage.get('user','json');
        if(token == null){
            header.Authorization = 'Bearer ';
        }else{
            header.Authorization = 'Bearer ' + token.accessToken;
        }
        HttpService.post(api, header, {}).then(response => {
            console.log(response.result);
            let result = response.result
            if(response.success){
                if(response.result.logo){
                    this.setState({
                        avatar: result.logo
                    })
                }
                this.setState({
                    nickName: result.nickName,
                    inviteCode: result.inviteCode,
                    thisMonthCommission: result.thisMonthCommission,
                    salesCommission: result.salesCommission,
                    trainningCommission: result.trainningCommission,
                    todayCommission: result.todayCommission,
                    totalCommission: result.totalCommission,
                    thisMonthMembers: result.thisMonthMembers,
                    thisMonthVips: result.thisMonthVips
                })
            }
        })
        .catch(error => console.error(error)).done();
    }

    

    render(){
        return(
            <View>
                <VipPageUserInfo navigation={this.props.navigation} userInfo={this.state} />
                <UserInfoTools navigation={this.props.navigation} userAssets={this.state} />
                <InviteInfo navigation={this.props.navigation} inviteInfo={this.state} />
                <Achievement navigation={this.props.navigation} />
                <BusinessSchool navigation={this.props.navigation} />
            </View>
        )
    }
}