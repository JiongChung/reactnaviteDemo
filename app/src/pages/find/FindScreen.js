import React, { Component } from 'react';
import {
    View,
    Dimensions,
    StyleSheet,
    Text,
    WebView
} from 'react-native';
import Storage from '../../storage/DeviceStorage';
import HomeBanner from '../../components/Home/HomeBanner';
import FindMenu from '../../components/Find/FindMenu';
const { width, height } = Dimensions.get('window');
import Header from '../../components/Header/HeaderScreen';

export default class FindScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            sourcePage: 'FindPage',
            msg: '',
            title: '智慧油联'
        };
    }

    onChange = ()=> {
        alert(33)
    }

    render(){
        return(
            <View>
                <Header title={this.state.title} />
                <View style={styles.banner}>
                    <HomeBanner sourcePage={this.state.sourcePage} />
                </View>
                <FindMenu navigation={this.props.navigation} />
            </View>
            // <View style={styles.container}>
            //     <Text>FindScreen</Text>
            //     <WebView
            //         automaticallyAdjustContentInsets
            //         source={{ uri: 'http://wx.zhihuiyoulian.com/wechat/event/2019/' }}
            //         decelerationRate='normal'
            //         scalesPageToFit
            //         javaScriptEnabled // 仅限Android平台。iOS平台JavaScript是默认开启的。
            //         domStorageEnabled // 适用于安卓
            //         scrollEnabled
            //     />
            // </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%'
    },
    banner: {
        height: width*700/1500
    }
});