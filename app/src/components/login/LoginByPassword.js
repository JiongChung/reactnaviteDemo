import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    TextInput
} from 'react-native';
import CommonService from '../../services/CommonServices'; 

export default class LoginByPassword extends Component {
    constructor(props){
        super(props);
        this.state = {
            phoneNumber: '',
            phoneNumberValid: false,
            password: '',
            passwordValid: false
        }
    }

    checkPhoneCode = (text) => {
        this.setState({phoneNumber: text}, () => {
            CommonService.phone(this.state.phoneNumber) ? this.setState({phoneNumberValid: true},()=>{this.checkForm();}) : this.setState({phoneNumberValid: false},()=>{this.checkForm();})
        })
    }

    checkPassword = (text) => {
        this.setState({password: text}, () => {
            (this.state.password.length > 5) ? this.setState({passwordValid: true}, ()=>{this.checkForm();}) : this.setState({passwordValid: false},()=>{this.checkForm();});
           
        })
    }

    checkForm = () => {
        let prams = {};
        if(this.state.phoneNumberValid && this.state.passwordValid){
            prams.status = false;
        }else{
            prams.status = true;
        }
        prams.phoneNumber = this.state.phoneNumber;
        prams.password = this.state.password;
        this.props.isCanSubmitByCode(prams);
    }

    render(){
        return(
            <View>
                <View style={styles.InputItem}>
                    <TextInput placeholder="手机号" onChangeText={(text) => this.checkPhoneCode(text)} keyboardType='numeric' maxLength={11} placeholderTextColor="#999999" style={styles.inputchange} />
                </View>
                <View style={styles.InputItem}>
                    <TextInput placeholder="密码" secureTextEntry={true} onChangeText={(text) => this.checkPassword(text)} maxLength={20} placeholderTextColor="#999999" style={styles.inputchange} />
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
    
    InputItem: {
        marginBottom: 10,
        borderBottomColor: '#cecece',
        borderBottomWidth: 0.5,
        borderStyle: 'solid',
    }
})