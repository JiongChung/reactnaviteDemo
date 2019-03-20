import React, {Component} from 'react';
import {
    View,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    ScrollView,
    FlatList
} from 'react-native';
const { width, height } = Dimensions.get('window');
import Storage from '../../storage/DeviceStorage';
import HttpService from '../../services/HttpService';
import Header from '../../components/Header/HeaderScreen';
import ToastService from '../../services/ToastServices';
import FootService from '../../services/FootService';
import BVLinearGraient from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class CouponListScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            sourcePage: 'HomePage',
            title: '',
            position: 'left',
            iconBarName: 'fanhui',
            couponType: 1,
            SkipCount: 0,
            totalCount: 0,
            couponList: [],
            status: true,
            isLoading: true,
            isFinished: false
        };
    }

    componentWillMount(){
        this.setState({
            title: this.props.navigation.state.params.name + '的券',
            couponType: this.props.navigation.state.params.type,
            SkipCount: 0
        })
    }

    componentDidMount(){
        this.GetMyCoupon(ApiUrl + '/api/services/app/MyProfile/GetMyCoupon?CouponCategory='+this.state.couponType+'&MaxResultCount=40&SkipCount='+this.state.SkipCount);
    }

    async GetMyCoupon(api){
        let token = await Storage.get('user','json');
        if(token == null){
            header.Authorization = 'Bearer ';
        }else{
            header.Authorization = 'Bearer ' + token.accessToken;
        }
        HttpService.get(api, header).then(response => {
            if(response.success){
                let couponList = this.state.couponList;
                couponList.push.apply(couponList, response.result.couponList.items);
                this.setState({
                    couponList: response.result.couponList.items,
                    totalCount: response.result.couponList.totalCount,
                    isLoading: false
                },() => {
                    if(this.state.totalCount < 41){
                        this.setState({
                            isFinished: true
                        })
                    }
                })
            }
        })
        .catch(error => console.error(error)).done();
    }

    footer = () => {
        return <FootService totalCount={this.state.totalCount} isFinished={this.state.isFinished} />;
    }

    loadingData = () => {
        if(this.state.SkipCount + 40 >= this.state.totalCount){
            console.log('没有更多了')
            this.setState({
                isFinished: true
            })
        }else{
            this.setState({
                SkipCount: this.state.SkipCount + 40
            },() => {
                this.GetMyCoupon(ApiUrl + '/api/services/app/MyProfile/GetMyCoupon?CouponCategory='+this.state.couponType+'&MaxResultCount=40&SkipCount='+this.state.SkipCount);
            })
        }
    }

    renderItem = (item) => {
        const { navigate } = this.props.navigation;
        let colors = ['#F5A623','#2cbb8a'];
        if(this.state.couponType == 2){
            colors = ['#e95555','#fc8c8c'];
        }else if(this.state.couponType == 3){
            colors = ['#aaa','#bbb'];
        }
        let couponTypeText = '';
        if(item.item.couponType == 1){
            couponTypeText  = '满赠';
            colors = ['#F5A623','#2cbb8a'];
        }else if(item.item.couponType == 2){
            couponTypeText  = '满抵';
            colors = ['#4A90E2','#6aa6ec'];
        }else if(item.item.couponType == 3){
            couponTypeText  = '现金';
            colors = ['#F5A623','#f4b54e'];
        }

        if(this.state.couponType == 3){
            colors = ['#aaa','#bbb'];
        }
        return (
            <TouchableOpacity key={item.index} onPress={() => navigate('CouponDetail',{coupon: item.item})}>
                <LinearGradient style={styles.couponListItem} colors={colors} start={{x: 0, y: 0}} end={{x: 1, y: 1}}>
                    <View style={styles.couponListHeaderAmountItem}>
                        <Text style={styles.currency}>￥</Text>
                        <Text style={styles.couponListHeaderAmountText}>{item.item.couponAmount}</Text>
                    </View>
                    <View style={styles.couponListHeader}>
                        <Text style={styles.couponListHeaderText}>{item.item.shortDescription}</Text>
                        <View style={styles.tagItem}>
                            <Text style={styles.tags}>{couponTypeText}</Text>
                            {!item.item.noDonate ? <Text style={[styles.tags,styles.tagsStatus]}>可赠送</Text> : <Text />}
                            {item.item.exchangeble ? <Text style={[styles.tags,styles.tagsStatus]}>可回收</Text> : <Text />}
                        </View>
                    </View>
                    <View>
                        <Text style={styles.description}>{item.item.description}</Text>
                        <Text style={styles.validDate}>{item.item.validDate}</Text>
                    </View>
                    <View style={styles.tagsItem}>
                        <Text style={styles.tagsItemText}>券</Text>
                    </View>
                </LinearGradient>
            </TouchableOpacity>
        );
    }

    renderLoadingView() {
        return (
            <ToastService toastStatus={this.state.isLoading}  ref="ToastService" />
        );
    }

    render(){
        if (this.state.isLoading) {
            return this.renderLoadingView();
        }
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
                <ScrollView>
                    <View style={styles.couponItem}>
                        <FlatList 
                            data={this.state.couponList}
                            renderItem={this.renderItem}
                            onEndReachedThreshold={0.1}
                            refreshing={true}
                            ListFooterComponent={this.footer}
                            onEndReached={() => this.loadingData() } 
                        />
                        {(this.state.couponList.length == 0) ? <View style={styles.nodata}><Text>暂无数据</Text></View> : <View></View>}
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
        paddingTop: 10
    },
    couponListItem: {
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        marginRight: 15,
        marginLeft: 15
    },
    couponListHeader: {
        flexDirection: 'row'
    },
    couponListHeaderText: {
        fontSize: 18,
        paddingRight: 10,
        color: 'white'
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
    nodata: {
        alignItems: 'center',
        paddingTop: 20
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