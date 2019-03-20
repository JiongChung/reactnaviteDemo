import React, { Component } from 'react';
import {
    View,
    Image,
    Dimensions,
    StyleSheet,
    TouchableHighlight
} from 'react-native';
import Swiper from 'react-native-swiper';
import Storage from '../../storage/DeviceStorage';
import HttpService from '../../services/HttpService'; 
const { width, height } = Dimensions.get('window');

export default class HomeBanner extends Component {
    constructor(props){
        super(props);
        this.state = {
            bannerList: [],
            msg: ''
        }
    }

    componentDidMount(){
        if(this.props.sourcePage == 'HomePage'){
            this.GetHomeSlide(ApiUrl + '/api/services/app/AppSetting/GetHomeSlide');
        }else{
            Storage.get('HomeBannerSwiper', 'json').then(item => {
                this.setState({
                    bannerList: item
                });
            });
        }
    }

    async GetHomeSlide(api){
        let token = await Storage.get('user','json');
        if(token == null){
            header.Authorization = 'Bearer ';
        }else{
            header.Authorization = 'Bearer ' + token.accessToken;
        }
        HttpService.get(api, header).then(response => {
            if(response.success){
                this.setState({
                    bannerList: response.result.slide
                });
                Storage.save('HomeBannerSwiper',response.result.slide,'json');
            }
        })
        .catch(error => console.error(error));
        
    }

    createBanner(){
        var items=[];
        this.state.bannerList.map((item, index) => {
            items.push(
                <TouchableHighlight key={index}  onPress={()=>this._onPress(item)}>
                    <Image style={styles.bannerImg} source={{uri:item.picture}} />
                </TouchableHighlight>
            )
        })
        return items;
    }

    _onPress = (item) => {
        this.setState({
            msg: 'Go to DetailsGo to DetailsGo to DetailsGo to Details'
        })
        this.props.navigation.navigate('Details',{name: this.state.msg});
    }

    renderBanner(){
        return(
            <Swiper
                style={styles.wrapper}
                height={width*700/1500}
                showsButtons={false}
                removeClippedSubviews={false} //这个很主要啊，解决白屏问题
                autoplay={true}
                loop={true}
                paginationStyle={styles.paginationStyle}
                dotStyle={styles.dotStyle}
                activeDotStyle={styles.activeDotStyle}
                onPress={this._onPress}
            >
                {this.createBanner()}
            </Swiper>
        )
    }
    
    render () {
        return (
            <View style={styles.container}>
                {this.renderBanner()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: width*700/1500
    },
    wrpaper: {
        width: width,
        height: width*700/1500
    },
    paginationStyle: {
        bottom: 6
    },
    dotStyle: {
        width: 10,
        height: 3,
        backgroundColor: '#fff',
        opacity: 0.4,
        borderRadius: 0
    },
    activeDotStyle: {
        width: 20,
        height: 3,
        backgroundColor: '#000',
        borderRadius: 0
    },
    bannerImg: {
        width: width,
        height: width*700/1500
    }
});