import React, {Component} from 'react';
import {
    View,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    ScrollView,
    TextInput,
    KeyboardAvoidingView
} from 'react-native';
const { width, height } = Dimensions.get('window');
import Header from '../../components/Header/HeaderScreen';
// import * as Wechat from 'react-native-wechat';
import AliIcon from '../../assets/AliIcon';

export default class CouponDetailScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: '优惠券',
            position: 'left',
            iconBarName: 'fanhui'
        };
        
    }

    componentWillMount(){
        // Wechat.registerApp('wx8d8ddbcced663b98')
    }

    share = () => {
        // Wechat.shareToTimeline({
        //     title:'微信好友测试的链接',
        //     description: '分享的标题内容',
        //     thumbImage: 'https://oimagea8.ydstatic.com/image?id=-5105589199207750433&product=adpublish&w=360&h=360&sc=0&rm=2&gsb=0&gsbd=60',
        //     type: 'news',
        //     webpageUrl: 'https://www.jianshu.com/p/6a792118fae4'
        // }).then((success)=>{
        //     console.log(success)
        // }).catch((error)=>{
        //     console.log(error)
        // })
    }

    render(){
        return(
            <View style={styles.container}>
                <Header 
                    navigation={this.props.navigation} 
                    firstColor={'#fa4546'} 
                    lastColor={'#ef0606'} 
                    title={this.state.title} 
                    iconBarName={this.state.iconBarName} 
                    position={this.state.position} 
                />
                <View style={styles.mainItem}>
                    <View style={styles.mainBox}>
                        <Text style={styles.couponText}>即时充值使用</Text>
                        <View style={styles.couponAmountItem}>
                            <View style={styles.couponAmount}>
                                <Text style={styles.currency}>￥</Text>
                                <Text style={styles.amount}>100</Text>
                            </View>
                        </View>
                        <Text style={styles.couponText}>满150赠</Text>
                        <Text style={styles.date}>
                            有效期： 2018-12
                        </Text>
                        <View style={styles.turn}>
                            <TextInput 
                                placeholder="请输入要转赠人的手机号" 
                                keyboardType='numeric' 
                                maxLength={11} 
                                placeholderTextColor="#999999" 
                                style={styles.inputchange} 
                            />
                            <View style={styles.btnItem}>
                                <View style={styles.btnBox}>
                                    <TouchableOpacity style={styles.btn}>
                                        <Text style={styles.btnText}>转赠</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={[styles.btnBox,styles.btnBoxEnd]}>
                                    <TouchableOpacity style={styles.btn}>
                                        <Text style={styles.btnText}>分享</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.recoverItem}>
                            <Text style={styles.recoverText}>回收</Text>
                            <TouchableOpacity  style={styles.recoverBtn}>
                                <AliIcon
                                    name={'fanhui'}
                                    size={10}
                                    style={styles.iconArrow}
                                />
                                <Text>回收可获得90油豆</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        paddingBottom: 40,
        backgroundColor: '#fa4546',
        height: height,
        
    },
    mainItem: {
        // alignItems: 'center',
        // justifyContent: 'center',
        padding: 15,
        paddingTop: 30
        // height: height - 30 - 40
    },
    mainBox: {
        backgroundColor: 'white',
        // width: width - 30,
        padding: 20,
        borderRadius: 5
    },
    couponText: {
        alignSelf: 'center'
    },
    couponAmountItem: {
        alignItems: 'center'
    },
    couponAmount: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    currency: {
        fontSize: 20,
        color: '#e2584e'
    },
    amount: {
        fontSize: 40,
        color: '#e2584e',
        fontWeight: 'bold'
    },
    date: {
        alignSelf: 'center',
        paddingBottom: 20
    },
    turn: {
        borderTopColor: '#ccc',
        borderTopWidth: 0.5,
        borderStyle: 'dashed',
        paddingTop: 20,
        paddingBottom: 20
    },
    inputchange: {
        borderWidth: 0.5,
        borderColor: '#ddd',
        borderStyle: 'solid'
    },
    btnItem: {
        flexDirection: 'row',
        paddingTop: 15
    },
    btnBox: {
        flex: 1,
        paddingRight: 15
    },
    btnBoxEnd: {
        paddingLeft: 15,
        paddingRight: 0
    },
    btn: {
        backgroundColor: '#f00e0d',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5
    },
    btnText: {
        color: 'white',
        fontSize: 16
    },
    recoverItem: {
        borderTopColor: '#ccc',
        borderTopWidth: 0.5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5,
        borderStyle: 'dashed',
        flexDirection: 'row'
    },
    recoverText: {
        flex: 1,
        paddingBottom: 15,
        paddingTop: 15
    },
    recoverBtn: {
        flex: 1,
        alignItems: 'flex-end',
        paddingBottom: 15,
        paddingTop: 15,
        flexDirection: 'row-reverse'
    },
    iconArrow: {
        paddingLeft: 5,
        paddingBottom: 3
    }
})