import React, {Component} from 'react';
import {
    View,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    TextInput,
    DeviceEventEmitter
} from 'react-native';
const { width, height } = Dimensions.get('window');
import AliIcon from '../../assets/AliIcon';
import BVLinearGraient from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Storage from '../../storage/DeviceStorage';
import HttpService from '../../services/HttpService';
import ToastService from '../../services/ToastServices';

export default class AddBankCardScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            usernameValid: false,
            cardNumber: '',
            cardNumberValid: false,
            bankName: '',
            bankNameValid: false,
            isCanSubmit: true,
            toastStatus: false
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

    checkUsername = (text) => {
        this.setState({username: text},() => {
            (this.state.username.length > 0) ? this.setState({usernameValid: true},()=>{this.checkForm()}) : this.setState({usernameValid: false},()=>{this.checkForm()});
        });
    }

    checkCardNumber = (text) => {
        this.setState({cardNumber: text},() => {
            (this.state.cardNumber.length > 9) ? this.setState({cardNumberValid: true},()=>{this.checkForm()}) : this.setState({cardNumberValid: false},()=>{this.checkForm()});
        });
    }

    checkBankName = (text) => {
        this.setState({bankName: text},() => {
            (this.state.bankName.length > 0) ? this.setState({bankNameValid: true},()=>{this.checkForm()}) : this.setState({bankNameValid: false},()=>{this.checkForm()});
        });
    }

    checkForm = () => {
        if(this.state.usernameValid && this.state.cardNumberValid && this.state.bankNameValid){
            this.setState({
                isCanSubmit: false
            })
        }else{
            this.setState({
                isCanSubmit: true
            })
        }
    }

    submitCard = () => {
        this.setState({
            toastStatus: true
        });
        let input = {
            accountNo: this.state.cardNumber,
            bankCardUserName: this.state.username,
            bankCardSubBranch: this.state.bankName
        };

        this.CreateOrUpdateAssetDrawingMethod(ApiUrl + '/api/services/app/UserAssetDrawingMethod/CreateOrUpdateAssetDrawingMethod', input);
    }

    async CreateOrUpdateAssetDrawingMethod(api, input){
        let token = await Storage.get('user','json');
        if(token == null){
            header.Authorization = 'Bearer ';
        }else{
            header.Authorization = 'Bearer ' + token.accessToken;
        }
        HttpService.post(api, header, input).then(response => {
            this.setState({
                toastStatus: false
            }); 
            if(response.success){
                this.refs.ToastService.showToastText('添加成功');
                this.update();
                setTimeout(() => {
                    this.props.navigation.goBack();
                },2500);
            }else{
                this.refs.ToastService.showToastText(response.error.message);
            }
            console.log(response)
        })
        .catch(error => console.error(error)).done();
    }

    update = () => {
        DeviceEventEmitter.emit('update', 'RefreshBankCard');
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.tips}>
                    <Text style={styles.tipsText}>请绑定本人的银行卡(储蓄卡)</Text>
                    <Text style={styles.tipsText}>请准确输入银行卡开户支行，否则会导致提现失败</Text>
                </View>
                <View style={styles.addCradItem}>
                    <TextInput 
                        placeholder="请输入持卡人姓名" 
                        onChangeText={(text) => this.checkUsername(text)} 
                        placeholderTextColor="#999999" 
                        style={styles.inputchange} />
                    <TextInput 
                        placeholder="请输入银行卡号" 
                        keyboardType='numeric'
                        onChangeText={(text) => this.checkCardNumber(text)} 
                        placeholderTextColor="#999999" 
                        style={styles.inputchange} />
                    <TextInput 
                        placeholder="请输入开户支行" 
                        onChangeText={(text) => this.checkBankName(text)} 
                        placeholderTextColor="#999999" 
                        style={[styles.inputchange,styles.inputchangeLast]} />
                </View>
                <TouchableOpacity disabled={this.state.isCanSubmit} style={styles.submitItem} onPress={this.submitCard}>
                    <LinearGradient style={{borderRadius: 5,alignItems: 'center'}} colors={this.state.isCanSubmit ? ['#ccc','#ccc'] : ['#fa4646','#ee0101']} start={{x: 0, y: 0}} end={{x: 1, y: 1}}>
                        <Text style={styles.submitText}>提交</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <ToastService toastStatus={this.state.toastStatus}  ref="ToastService" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f4f4f4',
        height: height
    },
    tips: {
        padding: 10,
        paddingLeft: 15,
        backgroundColor: 'white'
    },
    tipsText: {
        color: '#ee0000',
        fontSize: 12
    },
    addCradItem: {
        backgroundColor: 'white',
        marginTop: 10
    },
    inputchange: {
        borderBottomColor: '#eee',
        borderBottomWidth: 0.5,
        borderStyle: 'solid',
        paddingLeft: 15
    },
    inputchangeLast: {
        borderBottomWidth: 0
    },
    submitItem: {
        marginTop: 15,
        marginLeft: 15,
        marginRight: 15
    },
    submitText: {
        paddingBottom: 10,
        paddingTop: 10,
        color: 'white',
        fontSize: 16,
    }
});