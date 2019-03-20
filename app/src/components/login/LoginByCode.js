import React,{Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';
import CommonService from '../../services/CommonServices'; 
import Storage from '../../storage/DeviceStorage';

export default class LoginByCode extends Component {
    constructor(props){
        super(props);
        this.state = {
            phoneNumber: '',
            phoneNumberValid: false,
            phoneCode: '',
            phoneCodeValid: false,
            sendPhonecode: true,
            timerTitle: '获取验证码',
        }
    }

    checkPhoneCode = (text) => {
        this.setState({phoneCode: text},() => {
            (this.state.phoneCode.length == 6)? this.setState({phoneCodeValid: true},()=>{this.checkForm();}) : this.setState({phoneCodeValid: false},()=>{this.checkForm();});
        });
    }

    getCode = () => {
        
        if(!CommonService.phone(this.state.phoneNumber)){
            this.props.onPress();
            this.setState({
                phoneNumberValid: false
            });
        }else{
            this.setState({
                phoneNumberValid: true
            });
            if(this.state.sendPhonecode){
                this.setState({
                    sendPhonecode: false
                });
                let countdownDate = new Date(new Date().getTime() + 60 * 1000);
            
                CommonService.setTimer(countdownDate, (time) => {
                    this.setState({
                        timerTitle: time.second > 0 ? time.second + 's' : '获取验证码',
                        sendPhonecode: false
                    }, () => {
                        if (this.state.timerTitle == "获取验证码") {
                            this.setState({
                                sendPhonecode: true
                            })
                        }
                    })
                });

                this.getPhoneCode(ApiUrl + '/api/services/app/SMS/SendSmsCode');
            }
        }
    }

    async getPhoneCode(api){
        let input = {
            phoneNumber: this.state.phoneNumber,
            userId: '',
            type: 2
        };

        let token = await Storage.get('user','json');
        header.Authorization = 'Bearer ' + token.accessToken; 

        HttpService.post(api, header, input)
        .then(response => {
            console.error(response)
        })
        .catch(error => console.error(error));
    }

    checkForm = () => {
        let prams = {};
        if(this.state.phoneCodeValid && this.state.phoneNumberValid){
            prams.status = false;
        }else{
            prams.status = true;
        }
        prams.phoneNumber = this.state.phoneNumber;
        prams.phoneCode = this.state.phoneCode;
        this.props.isCanSubmitByCode(prams);
    }

    render(){
        return(
            <View>
                <View style={styles.InputItem}>
                    <TextInput placeholder="手机号" onChangeText={(text) => this.setState({phoneNumber: text})} keyboardType='numeric' maxLength={11} placeholderTextColor="#999999" style={[styles.inputchange,styles.phoneInputchange]} />
                    <TouchableOpacity style={styles.getCode} onPress={this.getCode}>
                        <Text>{this.state.timerTitle}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.InputItem}>
                    <TextInput placeholder="验证码" onChangeText={(text) => this.checkPhoneCode(text)} keyboardType='numeric' maxLength={6} placeholderTextColor="#999999" style={styles.inputchange} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputchange: {
        padding: 0,
        paddingTop: 5,
        paddingBottom: 5
    },
    phoneInputchange: {
        width: '70%'
    },
    InputItem: {
        marginBottom: 10,
        borderBottomColor: '#cecece',
        borderBottomWidth: 0.5,
        borderStyle: 'solid',
    },
    loginItemText: {
        flexDirection:'row-reverse'
    },
    getCode: {
        position: 'absolute',
        right:0,
        top: 2,
        borderWidth: 0.5,
        borderColor: '#cecece',
        borderStyle: 'solid',
        borderRadius: 15,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 5,
        paddingBottom: 5,
        alignItems: 'center',
        color: '#999',
        zIndex: 1
    }
})