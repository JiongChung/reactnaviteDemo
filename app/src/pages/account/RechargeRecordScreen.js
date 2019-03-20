import React, { Component } from 'react';
import {
    View,
    Dimensions,
    StyleSheet,
    Text,
    DeviceEventEmitter,
    ScrollView,
    FlatList
} from 'react-native';
import Storage from '../../storage/DeviceStorage';
import HttpService from '../../services/HttpService';
import RechargeRecordTool from '../../components/account/rechargerecord/RechargeRecordTool';
import RechargeRecordList from '../../components/account/rechargerecord/RechargeRecordList';
const { width, height } = Dimensions.get('window');

export default class RechargeRecordScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            totalInfo: {
                totalActiveAmount: 0,
                totalLoadAmount: 0,
                totalPayAmount: 0,
                totalRechargeAmount: 0,
                totalSavedAmount: 0
            },
            myRecharges: []
        }
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

    componentDidMount(){
        this.GetMyRecharge(ApiUrl + '/api/services/app/MyProfile/GetMyRecharge');
    }

    async GetMyRecharge(api){
        let token = await Storage.get('user','json');
        if(token == null){
            header.Authorization = 'Bearer ';
        }else{
            header.Authorization = 'Bearer ' + token.accessToken;
        }
        HttpService.get(api, header).then(response => {
            if(response.success){
                this.setState({
                    totalInfo: {
                        totalActiveAmount: response.result.totalActiveAmount,
                        totalLoadAmount: response.result.totalLoadAmount,
                        totalPayAmount: response.result.totalPayAmount,
                        totalRechargeAmount: response.result.totalRechargeAmount,
                        totalSavedAmount: response.result.totalSavedAmount
                    },
                    myRecharges: response.result.myRecharges.items
                })
            }
            console.log(this.state)
        })
        .catch(error => console.error(error)).done();
    }

    render(){
        return(
            <ScrollView>
                <RechargeRecordTool totalInfo={this.state.totalInfo} />
                <View style={styles.container}>
                    <FlatList data={this.state.myRecharges} renderItem={({ item }) => (
                        <RechargeRecordList item={item} />
                    )} />
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f7f7f7'
    },
    
});