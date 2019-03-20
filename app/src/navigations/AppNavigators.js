import React,{ Component } from "react";
import { AsyncStorage } from "react-native";
import { createStackNavigator, createAppContainer,StackActions, NavigationActions ,createBottomTabNavigator } from "react-navigation";
import Ionicons from 'react-native-vector-icons/FontAwesome';
import HomeScreen from '../pages/home/HomeScreen'
import WelcomeScreen from '../pages/WelcomScreen';
import DetailsScreen from '../pages/DetailsScreen';
import ProfileScreen from '../pages/ProfileScreen';
import FindScreen from '../pages/find/FindScreen'
import VipScreen from '../pages/vip/VipScreen';
import AliIcon from '../assets/AliIcon';
import TransferenceScreen from '../pages/transference/TransferenceScreen';
import AccountIndexScreen from '../pages/account/AccountIndexScreen';
import Storage from '../storage/DeviceStorage';
import ImmediateRechargeScreen from '../pages/recharge/ImmediateRechargeScreen';
import LoginScreen from '../pages/login/LoginScreen';
import VipGiftPackageScreen from '../pages/vip/VipGiftPackageScreen';
import BuyGiftScreen from '../pages/vip/BuyGiftScreen';
import RechargeRecordScreen from '../pages/account/RechargeRecordScreen';
import CommissionScreen from '../pages/account/CommissionScreen';
import CommissionDetailScreen from '../pages/account/CommissionDetailScreen';
import WithdrawScreen from '../pages/account/WithdrawScreen';
import WithDrawalSuccessScreen from '../pages/account/WithDrawalSuccessScreen';
import FansScreen from '../pages/account/FansScreen';
import AreaScreen from '../pages/account/AreaScreen';
import BankCardScreen from '../pages/account/BankCardScreen';
import AddBankCardScreen from '../pages/account/AddBankCardScreen';
import AssetsScreen from '../pages/account/AssetsScreen';
import CouponScreen from '../pages/account/CouponScreen';
import CouponListScreen from '../pages/account/CouponListScreen';
import CouponDetailScreen from '../pages/account/CouponDetailScreen';

//底部导航
 const AppTabNavigators = createBottomTabNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            tabBarLabel: '首页',//底部标题
            tabBarIcon: (({tintColor, focused}) => (//底部图标
               <AliIcon
                    name={focused?'home':'home'}
                    size={24}
                    style={{color:tintColor}}
               />
            ))
        }
    },
    Find: {
        screen: FindScreen,
        navigationOptions: {
            tabBarLabel: '发现',
            tabBarIcon: (({tintColor, focused}) => (
               <AliIcon
                    name={focused?'find':'find'}
                    size={24}
                    style={{color:tintColor}}
               />
            ))
        }
    },
    Vip: {
        screen: VipScreen,
        navigationOptions: {
            tabBarLabel: 'Vip专区',
            tabBarIcon: (({tintColor, focused}) => (
               <AliIcon
                    name={focused?'vip':'vip'}
                    size={24}
                    style={{color:tintColor}}
               />
            ))
        }
    },
    Transference: {
        screen: TransferenceScreen,
        navigationOptions: {
            tabBarLabel: '线上圈存',
            tabBarIcon: (({tintColor, focused}) => (
               <AliIcon
                    name={focused?'logo':'logo'}
                    size={24}
                    style={{color:tintColor}}
               />
            ))
        }
    },
    AccountIndex: {
        screen: AccountIndexScreen,
        navigationOptions: {
            tabBarLabel: '我的',
            tabBarIcon: (({tintColor, focused}) => (
               <AliIcon
                    name={focused?'user':'user'}
                    size={24}
                    style={{color:tintColor}}
               />
            ))
        }
    }
},{
    tabBarPosition:'bottom',
    // swipeEnabled: false,
    animationEnabled: false,
    lazy: true,
    backBehavior: 'none',
    tabBarOptions: {
        activeTintColor: '#ee0000',
        inactiveTintColor: '#757575',
        showIcon: true,
        style: {
            height: 50,
            backgroundColor: '#fafcfb',
            borderTopColor: '#e7e7e7',
            borderTopWidth: 0.5
        },
        labelStyle: {
            fontSize: 12,
            marginBottom:3,
            marginTop: -3
        },
        indicatorStyle: { height: 0 }
    }

});

//顶部导航，主入口，要放在其他导航后面，（加载顺序）

export const AppStackNavigator=createStackNavigator({
    // Welcome:{
    //   screen:WelcomeScreen,
    //   navigationOptions:{
    //       header:null,
    //   }
    // },
    HomeTab:{//底部导航（也是主页）
        screen:AppTabNavigators,
        navigationOptions:{
            header:null,
        }
    },
    Details: DetailsScreen,
    ImmediateRecharge: ImmediateRechargeScreen,
    Login: {
        screen: LoginScreen,
        navigationOptions: { header: null }
    },
    VipGiftPackage: {
        screen: VipGiftPackageScreen
    },
    BuyGift: {
        screen: BuyGiftScreen
    },
    RechargeRecord: {
        screen: RechargeRecordScreen
    },
    Commission: {
        screen: CommissionScreen
    },
    CommissionDetail: {
        screen: CommissionDetailScreen
    },
    Withdraw: {
        screen: WithdrawScreen
    },
    WithDrawalSuccess: {
        screen: WithDrawalSuccessScreen
    },
    Fans: {
        screen: FansScreen
    },
    Area: {
        screen: AreaScreen
    },
    BankCard: {
        screen: BankCardScreen
    },
    AddBankCard: {
        screen: AddBankCardScreen
    },
    Assets: {
        screen: AssetsScreen
    },
    Coupon: {
        screen: CouponScreen,
        navigationOptions: { header: null }
    },
    CouponList: {
        screen: CouponListScreen,
        navigationOptions: { header: null }
    },
    CouponDetail: {
        screen: CouponDetailScreen,
        navigationOptions: { header: null }
    }
});