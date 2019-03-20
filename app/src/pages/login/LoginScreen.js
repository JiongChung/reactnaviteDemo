import React, {Component} from 'react';
import {
    View,
    Dimensions,
    StyleSheet,
    Text,
    Button,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
    DeviceEventEmitter
} from 'react-native';
import AliIcon from '../../assets/AliIcon';
import CommonService from '../../services/CommonServices'; 
import ToastService from '../../services/ToastServices';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LoginByPassword from '../../components/login/LoginByPassword';
import LoginByCode from '../../components/login/LoginByCode';
import Storage from '../../storage/DeviceStorage';
import HttpService from '../../services/HttpService';

export default class LoginScreen extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            isCanSubmit: true,
            password: '',
            phoneNumber: '',
            phoneNumberErrorText: '手机格式不正确',
            phoneCode: '',            
            loginByPhoneCode: false,
            loginStyleText: '使用密码登录',
            loginTitle: '验证码登录',
            toastStatus: false
        }

        let codeTime = 60;
    }

    loginStyle = ()=> {
//         CommonService.stop();
//         this.setState({
//             sendPhonecode: true,
//             timerTitle: '获取验证码'
//                  })
//         this.setState({
//             isCanSubmit: false
//         });

        if(this.state.loginByPhoneCode){
            this.setState({
                sendPhonecode: true,
                timerTitle: '获取验证码',
                loginStyleText: '使用验证码登录',
                loginByPhoneCode: false,
                loginTitle: '密码登录',
                isCanSubmit: true
            },()=>{
                CommonService.stop();
            });
        }else{
            this.setState({
                loginStyleText: '使用密码登录',
                loginByPhoneCode: true,
                loginTitle: '验证码登录',
                isCanSubmit: true
            });
        }
    }

    test = () => {
        DeviceEventEmitter.emit('left', 'RefreshMainPage');
    }


    login =() => {
        // alert(this.state.phoneNumber+', '+this.state.phoneCode+', '+this.state.password)
        // this.props.navigation.goBack();
        
        this.setState({
            toastStatus: true
        });
        let input = {};
        input.userNameOrEmailAddress = this.state.phoneNumber;
        if(!this.state.loginByPhoneCode){
            input.password = this.state.password;
            this.loginNow(ApiUrl + '/api/TokenAuth/Authenticate', input);
        }else{
            input.phoneNumberCode = this.state.phoneCode;
            this.loginNow(ApiUrl + '/api/TokenAuth/Authenticate', input);
        }
    }

    async loginNow(api, params){
        let token = await Storage.get('user','json');
        header.Authorization = 'Bearer ' + (token == null) ? '' : token.accessToken; 

        HttpService.post(api, header, params)
        .then(response => {
            if(response.success){
                Storage.save('user',response.result, 'json');  
                this.setState({
                    toastStatus: false
                }); 
                this.test();
                this.refs.ToastService.showToastText('登录成功');     
                setTimeout(() => {
                    this.props.navigation.goBack();
                },2500);
            }
        })
        .catch(error =>{
            console.log(error)
        });
    }

    componentWillUnmount() {
        CommonService.stop();
        // this.setState({
        //     sendPhonecode: true
        // })
    }

    isCanSubmitByCode = (val) => {
        this.setState({
            isCanSubmit: val.status,
            phoneNumber: val.phoneNumber,
            phoneCode: val.phoneCode,
            password: val.password
        })
    }

    showToast = () => {
        this.refs.ToastService.showToastText(this.state.phoneNumberErrorText);
    }

    render(){
        return(
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <View style={styles.logoItem}>
                    <View style={styles.logo}>
                        <AliIcon name={'logo'} style={styles.logoText} />
                    </View>
                </View>
                <View style={styles.loginItem}>
                    <Text style={styles.loginTitle}>{this.state.loginTitle}</Text>
                    { this.state.loginByPhoneCode ? <View><LoginByCode onPress={()=>this.showToast()} isCanSubmitByCode={this.isCanSubmitByCode} timerTitle={this.state.timerTitle} /></View> : <View><LoginByPassword isCanSubmitByCode={this.isCanSubmitByCode} /></View>}
                    <View style={styles.loginItemText}>
                        <TouchableOpacity onPress={this.loginStyle}>
                            <Text style={styles.loginText}>{this.state.loginStyleText}</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity 
                        onPress={this.login}
                        style={[styles.btn, this.state.isCanSubmit ? styles.disabled : styles.unDisabled]} 
                        disabled={this.state.isCanSubmit}>
                            <Text style={styles.btnText}>登录</Text>
                    </TouchableOpacity>
                </View>
                <ToastService toastStatus={this.state.toastStatus}  ref="ToastService" />
            </KeyboardAvoidingView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f7f7f7',
        width: '100%',
        height: '100%'
    },
    logoItem: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50
    },
    logo: {
        backgroundColor: '#ee0000',
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: 80,
        borderRadius: 10
    },
    logoText: {
        color: '#ffffff',
        fontSize: 40
    },
    loginItem: {
        paddingLeft: 50,
        paddingRight: 50,
        paddingTop: 50
    },
    loginTitle: {
        fontSize: 18,
        color: '#000',
        paddingBottom: 10
    },
    
    loginItemText: {
        flexDirection:'row-reverse'
    },
    loginText: {
        color: '#999',
        paddingTop: 5,
        paddingBottom: 5
    },
    btn: {
        marginTop: 20,
        borderRadius: 5,
        alignItems: 'center'
    },
    disabled: {
        backgroundColor: '#ccc'
    },
    unDisabled: {
        backgroundColor: '#ee0000'
    },
    btnText: {
        fontSize: 18,
        color: 'white',
        height: 50,
        lineHeight: 50
    }
})