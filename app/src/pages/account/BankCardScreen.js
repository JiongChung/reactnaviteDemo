import React, {Component} from 'react';
import {
    View,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    ImageBackground,
    Image,
    DeviceEventEmitter
} from 'react-native';
const { width, height } = Dimensions.get('window');
import AliIcon from '../../assets/AliIcon';
import Storage from '../../storage/DeviceStorage';
import HttpService from '../../services/HttpService';

export default class BankCardScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            cardList: []
        }
    }

    static navigationOptions = ({navigation})=>{
        return {
            title: `${navigation.state.params.name}`,
            headerTitleStyle: {
                alignSelf: 'center',
                flex:1, 
                textAlign: 'center',
                color: 'white',
                fontWeight: 'normal'
            },
            headerStyle: {
                backgroundColor: '#ee0000',
                elevation: 0
            },
            headerRight: <View />,
            headerLeft: (
                <TouchableOpacity style={{marginLeft: 15}} onPress={() => navigation.goBack()}>
                    <AliIcon
                        name={'fanhui'}
                        size={20}
                        style={{color: 'white',transform: [{rotate:'180deg'}]}}
                    />
                </TouchableOpacity>
            )
        }
    };

    componentDidMount(){
        this.GetAllBankCards(ApiUrl + '/api/services/app/UserAssetDrawingMethod/GetAllBankCards');
        this.deEmitter = DeviceEventEmitter.addListener('update', (parms) => {
            if(parms == 'RefreshBankCard'){
                this.GetAllBankCards(ApiUrl + '/api/services/app/UserAssetDrawingMethod/GetAllBankCards');
            }
            
        });
    }

    async GetAllBankCards(api){
        let token = await Storage.get('user','json');
        if(token == null){
            header.Authorization = 'Bearer ';
        }else{
            header.Authorization = 'Bearer ' + token.accessToken;
        }
        HttpService.get(api, header).then(response => {
            if(response.success){
                this.setState({
                    cardList: response.result
                })
                console.log(response.result)
            }
        })
        .catch(error => console.error(error)).done();
    }

    render(){
        const { navigate } = this.props.navigation;
        let cardList = [];
        this.state.cardList.map((item, index) => cardList.push(
            <View key={index}>
                <ImageBackground style={styles.image} source={{uri: item.bankLogo,cache:'force-cache'}}>
                    <View style={styles.cardItem}>
                        <Text style={styles.bankName}>{item.bankCardName}</Text>
                        <Text style={styles.bankType}>储蓄卡</Text>
                        <Text style={styles.accountNo}>{item.accountNo}</Text>
                    </View>
                </ImageBackground>
            </View>
        ));
        return(
            <View style={styles.container}>
                <View style={styles.cardList}>
                    {cardList}
                    <TouchableOpacity onPress={() => navigate('AddBankCard',{name: '添加银行卡'})}>
                        <Image style={styles.icon} source={{uri: 'http://wx.zhihuiyoulian.com/wechat/image/imgs/add_bank_card.png', cache: 'force-cache'}} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#444444',
        height: height,
        paddingLeft: 15,
        paddingRight: 15
    },
    cardList: {
        paddingTop: 15
    },
    image: {
        height: (width - 30) * 240 / 690,
        marginBottom: 10
    },
    cardItem: {
        paddingTop: 10,
        paddingLeft: 70
    },
    bankName: {
        fontSize: 18,
        color: 'white'
    },
    bankType: {
        color: 'white',
        paddingTop: 5
    },
    accountNo: {
        color: 'white',
        fontSize: 28,
        paddingTop: 10
    },
    icon: {
        height: (width - 30) * 240 / 690
    }
})