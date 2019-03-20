import React, {Component} from 'react';
import {
    View,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';
import Storage from '../../storage/DeviceStorage';
import HttpService from '../../services/HttpService';
const { width, height } = Dimensions.get('window');
import AliIcon from '../../assets/AliIcon';
import CommissionTools from '../../components/account/commission/CommissionTools';
import CommissionEcharts from '../../components/account/commission/CommissionEcharts';

export default class CommissionScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            totalCommission: 0,
            commissionList: []
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
        this.GetMyCommission(ApiUrl + '/api/services/app/VipProfile/GetMyCommission');
    }

    async GetMyCommission(api){
        let token = await Storage.get('user','json');
        if(token == null){
            header.Authorization = 'Bearer ';
        }else{
            header.Authorization = 'Bearer ' + token.accessToken;
        }
        HttpService.get(api, header).then(response => {
            if(response.success){
                this.setState({
                    totalCommission: response.result.totalCommission,
                    commissionList: response.result.commissions
                });
            }
        })
        .catch(error => console.error(error)).done();
    }

    render(){
        return(
            <View>
                <CommissionTools navigation={this.props.navigation} totalCommission={this.state.totalCommission} />
                <CommissionEcharts commissionList={this.state.commissionList} />
            </View>
        )
    }
}