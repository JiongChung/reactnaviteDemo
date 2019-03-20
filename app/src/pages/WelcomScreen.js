import React, { Component } from 'react'
import {
    View,
    Image,
    Dimensions,
    StyleSheet,
    Text
} from 'react-native'
// import Swiper from 'react-native-swiper';

import Storage from '../storage/DeviceStorage';

const { width, height } = Dimensions.get('window');//获取手机的宽和高

const styles =StyleSheet.create( {
    wrapper: {

    },
    container: {
        flex: 1,//必写
    },
    image: {
        width,//等于width:width
        height,
    }
});

export default class WelcomScreen extends Component {
    //加载计时器
    timer;
    constructor(props){
        super(props);
    }
    componentWillMount(){
        Storage.get('appHotSearchTagList', 'html').then(item => {
            if(item == '3333'){
                this.props.navigation.navigate('HomeTab');
            }
        })
    }
    componentDidMount(){
        this.timer=setTimeout(()=>{
            this.props.navigation.navigate('HomeTab');//7秒后进入底部导航主页
        },2000)
    }
    //卸载计时器
    componentWillUnmount(){
        this.timer&&clearTimeout(this.timer);//同时为真的才执行卸载
    }
    render () {
        return (
            <View>
                <Text>3333</Text>
            </View>
        )
    }
}