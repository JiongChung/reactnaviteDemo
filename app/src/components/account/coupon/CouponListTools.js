import React, {Component} from 'react';
import {
    View,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';
const { width, height } = Dimensions.get('window');
import BVLinearGraient from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class CouponListTools extends Component {
    constructor(props){
        super(props);
    }

    render(){
        const { navigate } = this.props.navigation;
        let avavailabeList = [];
        let colors = ['#F5A623','#2cbb8a'];
        if(this.props.type == 2){
            colors = ['#e95555','#fc8c8c'];
        }else if(this.props.type == 3){
            colors = ['#aaa','#bbb'];
        }
        this.props.couponList.map((item, index) => {
            let couponTypeText = '';
            if(item.couponType == 1){
                couponTypeText  = '满赠';
                colors = ['#F5A623','#2cbb8a'];
            }else if(item.couponType == 2){
                couponTypeText  = '满抵';
                colors = ['#4A90E2','#6aa6ec'];
            }else if(item.couponType == 3){
                couponTypeText  = '现金';
                colors = ['#F5A623','#f4b54e'];
            }

            if(this.props.type == 3){
                colors = ['#aaa','#bbb'];
            }
           
            if(index < 3){
                avavailabeList.push(
                    <TouchableOpacity key={index} onPress={() => navigate('CouponDetail',{coupon: item})}>
                        <LinearGradient style={styles.couponListItem} colors={colors} start={{x: 0, y: 0}} end={{x: 1, y: 1}}>
                            <View style={styles.couponListHeaderAmountItem}>
                                <Text style={styles.currency}>￥</Text>
                                <Text style={styles.couponListHeaderAmountText}>{item.couponAmount}</Text>
                            </View>
                            <View style={styles.couponListHeader}>
                                <Text style={styles.couponListHeaderText}>{item.shortDescription}</Text>
                                <View style={styles.tagItem}>
                                    <Text style={styles.tags}>{couponTypeText}</Text>
                                    {!item.noDonate ? <Text style={[styles.tags,styles.tagsStatus]}>可赠送</Text> : <Text />}
                                    {item.exchangeble ? <Text style={[styles.tags,styles.tagsStatus]}>可回收</Text> : <Text />}
                                </View>
                            </View>
                            <View>
                                <Text style={styles.description}>{item.description}</Text>
                                <Text style={styles.validDate}>{item.validDate}</Text>
                            </View>
                            <View style={styles.tagsItem}>
                                <Text style={styles.tagsItemText}>券</Text>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                )
            }
        });
        return avavailabeList;
    }
}

const styles = StyleSheet.create({
    couponListItem: {
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        position: 'relative'
    },
    couponListHeader: {
        flexDirection: 'row'
    },
    couponListHeaderText: {
        fontSize: 18,
        paddingRight: 10,
        color: 'white',
        alignItems: 'flex-end'
    },
    tagItem: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    tags: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        fontSize: 10,
        color: 'white',
        borderRadius: 10,
        padding: 7,
        paddingTop: 2,
        paddingBottom: 2,
        alignItems: 'flex-end',
        marginRight: 10
    },
    tagsStatus: {
        backgroundColor: 'rgba(0,0,0,0.1)'
    },
    description: {
        paddingTop: 8,
        fontSize: 12,
        color: 'rgba(255,255,255,0.8)'
    },
    validDate: {
        paddingTop: 8,
        fontSize: 12,
        color: 'rgba(255,255,255,0.8)'
    },
    couponList: {
        paddingBottom: 10
    },
    tagsItem: {
        position: 'absolute',
        bottom: -15,
        right: -15,
        flexDirection: 'row',
        width: 60,
        height: 60,
        borderRadius: 60,
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.2)',
        borderStyle: 'dashed',
        alignItems: 'center',
        justifyContent: 'center'
        
    },
    tagsItemText: {
        fontSize: 45,
        color: 'rgba(255,255,255,0.2)'
    },
    couponListHeaderAmountItem: {
        position: 'absolute',
        top: 0,
        right: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    currency: {
        fontSize: 16,
        alignSelf: 'center',
        color: 'rgba(255,255,255,0.7)'
    },
    couponListHeaderAmountText: {
        fontSize: 30,
        color: 'rgba(255,255,255,0.7)'
    }
})