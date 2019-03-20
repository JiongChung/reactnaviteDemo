import React, { Component } from 'react';
import {
    View,
    Dimensions,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';

import AliIcon from '../../assets/AliIcon';
const { width, height } = Dimensions.get('window');

export default class UserAssetsTools extends Component{
    constructor(props){
        super(props);
    }
    
    openOilbean = () =>{
        this.props.navigation.navigate('RechargeRecord',{name: '充值记录'});
    }

    openMenu = (number) => {
        
    }

    render(){
        const { navigate } = this.props.navigation;
        return(
            <View>
                <View style={styles.userOilbeanItem}>
                    <View style={styles.userOilbeanTitleItem}>
                        <Text style={styles.userOilbeanTitle}>我的油豆</Text>
                        <View style={styles.viewMoreOilbean}>
                            <TouchableOpacity style={styles.viewMoreBtn} onPress={() => navigate('RechargeRecord',{name: '充值记录'})}>
                                <Text>查看更新</Text>
                                <AliIcon
                                    name={'arrowRight'}
                                    size={10}
                                    style={{color: '#bbb',paddingTop: 4,paddingLeft: 5}}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.userOilbeanList}>
                        <View style={styles.userOilbeanListItem}>
                            <TouchableOpacity onPress={() => this.openOilbean()}>
                                <View style={styles.userOilbeanNumber}><Text>{this.props.userInfo.activePoint}</Text></View>
                                <Text style={styles.userOilbeanText}>已激活</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.userOilbeanListItem}>
                            <TouchableOpacity  onPress={() => this.openOilbean()}>
                                <View style={styles.userOilbeanNumber}><Text>{this.props.userInfo.inProgressPoint}</Text></View>
                                <Text style={styles.userOilbeanText}>当月待激活</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.userOilbeanListItem}>
                            <TouchableOpacity  onPress={() => this.openOilbean()}>
                                <View style={styles.userOilbeanNumber}><Text>{this.props.userInfo.remainingPoint}</Text></View>
                                <Text style={styles.userOilbeanText}>未激活</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.userOilbeanListItem}>
                            <TouchableOpacity  onPress={() => this.openOilbean()}>
                                <View style={styles.userOilbeanNumber}><Text>{this.props.userInfo.totalPoint}</Text></View>
                                <Text style={styles.userOilbeanText}>总量</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={[styles.userOilbeanItem,styles.userAssets]}>
                    <View style={styles.userOilbeanList}>
                        <View style={styles.userOilbeanListItem}>
                            <TouchableOpacity onPress={() => navigate('Assets',{name: '油力值'})}>
                                <View style={styles.userOilbeanNumber}><Text>{this.props.userInfo.totalCoin}</Text></View>
                                <Text style={styles.userAssetsText}>油力值</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.userOilbeanListItem}>
                            <TouchableOpacity onPress={() => navigate('Coupon',{name: '卡券'})}>
                                <View style={styles.userOilbeanNumber}><Text>{this.props.userInfo.availableCoupon}</Text></View>
                                <Text style={styles.userAssetsText}>卡券</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.userOilbeanListItem}>
                            <TouchableOpacity onPress={() => navigate('Commission',{name: '佣金'})}>
                                <View style={styles.userOilbeanNumber}><Text>{this.props.userInfo.totalCommission}</Text></View>
                                <Text style={styles.userAssetsText}>佣金</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.userOilbeanListItem}>
                            <TouchableOpacity onPress={() => navigate('Fans',{name: '我的油粉'})}>
                                <View style={styles.userOilbeanNumber}><Text>{this.props.userInfo.totalFans}</Text></View>
                                <Text style={styles.userAssetsText}>我的油粉</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[styles.userOilbeanList,styles.toolsList]}>
                        <View style={styles.userOilbeanListItem}>
                            <TouchableOpacity onPress={() => navigate('Area',{name: '我的区域'})}>
                                <Image style={styles.toolIcon} source={require('../../assets/images/area.png')} />
                                <Text style={styles.userAssetsText}>我的区域</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.userOilbeanListItem}>
                            <TouchableOpacity  onPress={() => navigate('BankCard',{name: '银行卡'})}>
                                <Image style={styles.toolIcon} source={require('../../assets/images/bank_card.png')} />
                                <Text style={styles.userAssetsText}>银行卡</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.userOilbeanListItem}>
                            <TouchableOpacity  onPress={() => this.openMenu(7)}>
                                <Image style={styles.toolIcon} source={require('../../assets/images/oil_card.png')} />
                                <Text style={styles.userAssetsText}>油卡</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.userOilbeanListItem}>
                            <TouchableOpacity  onPress={() => this.openMenu(8)}>
                                <Image style={styles.toolIcon} source={require('../../assets/images/more.png')} />
                                <Text style={styles.userAssetsText}>更多</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={[styles.userOilbeanItem,styles.userAssets]}>
                    <Text style={{paddingBottom: 10}}>邀请有奖</Text>
                    <TouchableOpacity onPress={() => alert(5)}>
                        <Image source={require('../../assets/images/share.png')} style={styles.shareIcon} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    userOilbeanItem: {
        backgroundColor: 'white',
        marginRight: 15,
        marginLeft: 15,
        padding: 15,
        marginTop: -50,
        borderRadius: 10,
        paddingTop: 10,
        paddingBottom: 10
    },
    userOilbeanTitleItem: {
        flexDirection: 'row',
        borderBottomColor: '#eee',
        borderBottomWidth: 0.5,
        borderStyle: 'solid',
        marginLeft: -20,
        marginRight: -20,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 10
    },
    userOilbeanTitle: {
        color: 'black'
    },
    viewMoreOilbean: {
        flex: 1,
        flexDirection: 'row-reverse'
    },
    viewMoreBtn: {
        flexDirection: 'row'
    },
    userOilbeanList: {
        flexDirection: 'row'
    },
    userOilbeanListItem: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 10
    },
    userOilbeanNumber: {
        alignItems: 'center'
    },
    userOilbeanText: {
        paddingTop: 10,
        fontSize: 12
    },
    userAssets: {
        marginTop: 10
    },
    userAssetsText: {
        paddingTop: 5,
        fontSize: 12
    },
    toolsList: {
        paddingTop: 30
    },
    toolIcon: {
        width: 25,
        height: 25,
        alignSelf: 'center'
    },
    shareIcon: {
        width: '100%',
        height: width * 170 / 622
    }
})