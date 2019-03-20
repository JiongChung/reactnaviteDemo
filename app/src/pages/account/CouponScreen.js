import React, {Component} from 'react';
import {
    View,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    ScrollView
} from 'react-native';
const { width, height } = Dimensions.get('window');
import AliIcon from '../../assets/AliIcon';
import Header from '../../components/Header/HeaderScreen';
import Storage from '../../storage/DeviceStorage';
import HttpService from '../../services/HttpService';
import CouponListTools from '../../components/account/coupon/CouponListTools';

export default class CouponScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            sourcePage: 'HomePage',
            title: '卡券',
            position: 'left',
            iconBarName: 'fanhui',
            SkipCount: 0,
            avavailabeAmount: 0,
            usedAmount: 0,
            expiredAmount: 0,
            avavailabeList: [],
            usedList: [],
            expiredList: []
        };
    }

    componentDidMount(){
        for(let i=1; i<4; i++){
            this.GetMyCoupon(ApiUrl + '/api/services/app/MyProfile/GetMyCoupon?CouponCategory='+i+'&MaxResultCount=40&SkipCount='+this.state.SkipCount, i);
        }
    }

    async GetMyCoupon(api, type){
        let token = await Storage.get('user','json');
        if(token == null){
            header.Authorization = 'Bearer ';
        }else{
            header.Authorization = 'Bearer ' + token.accessToken;
        }
        HttpService.get(api, header).then(response => {
            if(response.success){
                console.log(response.result);
                if(type == 1){
                    this.setState({
                        avavailabeAmount: response.result.avavailabeAmount,
                        avavailabeList: response.result.couponList.items
                    })
                }else if(type == 2){
                    this.setState({
                        usedAmount: response.result.usedAmount,
                        usedList: response.result.couponList.items
                    })
                }else{
                    this.setState({
                        expiredAmount: response.result.expiredAmount,
                        expiredList: response.result.couponList.items
                    })
                }
            }
        })
        .catch(error => console.error(error)).done();
    }

    render(){
        const { navigate } = this.props.navigation;
        return(
            <View style={styles.container}>
                <Header 
                    navigation={this.props.navigation} 
                    firstColor={'#fa4546'} 
                    lastColor={'#ef0606'} 
                    title={this.state.title} 
                    iconBarName={this.state.iconBarName} 
                    position={this.state.position} />
                <ScrollView>
                    <View style={styles.couponItem}>
                        <View style={styles.headerTitle}>
                            <Text style={styles.headerText}>未使用</Text>
                            <TouchableOpacity style={styles.viewAll} onPress={() => navigate('CouponList',{type: 1, name: '未使用'})}>
                                <AliIcon
                                    name={'fanhui'}
                                    size={10}
                                    style={styles.aliIcon}
                                />
                                <Text>查看全部({this.state.avavailabeAmount})</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.couponList}>
                            <CouponListTools navigation={this.props.navigation} couponList={this.state.avavailabeList} type={1} />
                        </View>
                        <View style={styles.headerTitle}>
                            <Text style={styles.headerText}>已使用</Text>
                            <TouchableOpacity style={styles.viewAll} onPress={() => navigate('CouponList',{type: 2, name: '已使用'})}>
                                <AliIcon
                                    name={'fanhui'}
                                    size={10}
                                    style={styles.aliIcon}
                                />
                                <Text>查看全部({this.state.usedAmount})</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.couponList}>
                            <CouponListTools navigation={this.props.navigation} couponList={this.state.usedList} type={2} />
                        </View>
                        <View style={styles.headerTitle}>
                            <Text style={styles.headerText}>已过期</Text>
                            <TouchableOpacity style={styles.viewAll} onPress={() => navigate('CouponList',{type: 3, name: '已过期'})}>
                                <AliIcon
                                    name={'fanhui'}
                                    size={10}
                                    style={styles.aliIcon}
                                />
                                <Text>查看全部({this.state.expiredAmount})</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.couponList}>
                            <CouponListTools navigation={this.props.navigation} couponList={this.state.expiredList} type={3} />
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 40
    },
    couponItem: {
        padding: 15
    },
    headerTitle: {
        flexDirection: 'row',
        paddingBottom: 10
    },
    headerText: {
        flex: 1,
        fontSize: 16,
        color: '#222',
        fontWeight: 'bold'
    },
    viewAll: {
        flexDirection: 'row-reverse'
    },
    aliIcon: {
        color: '#ccc',
        marginTop: 4,
        marginLeft: 4
    }
})