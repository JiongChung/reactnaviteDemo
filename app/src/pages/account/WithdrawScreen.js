import React, {Component} from 'react';
import {
    View,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    TextInput,
    Picker,
    KeyboardAvoidingView
} from 'react-native';
const { width, height } = Dimensions.get('window');
import AliIcon from '../../assets/AliIcon';
import CommonService from '../../services/CommonServices'; 
import Storage from '../../storage/DeviceStorage';
import HttpService from '../../services/HttpService';
import BVLinearGraient from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ToastService from '../../services/ToastServices';

export default class WithdrawScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            availableAmount: 0,
            myBankCards: [],
            returnTypes: [],
            commissionHandlingFeeRateForDrawing: '',
            commissionMinAmoutForDrawing: '',
            amount: 0,
            returnType: 0,
            myBankCard: 0,
            phoneCode: 0,
            sendPhonecode: true,
            timerTitle: '获取验证码',
            isCanSubmit: true,
            phoneCodeValid: false,
            amountValid: false,
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
                backgroundColor: '#ff881e',
                elevation: 0
            },
            headerRight: (
                <TouchableOpacity onPress={()=>navigation.state.params.navigatePress()} style={{marginRight: 20}}>
                    <Text style={{color: 'white'}}>提现记录</Text>
                </TouchableOpacity>
            ),
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

    withdrawHistory = () => {
        alert(3333)
    }
    componentDidMount(){
        this.props.navigation.setParams({ navigatePress:this.withdrawHistory });
        this.DrawingApplyInit(ApiUrl + '/api/services/app/UserAsset/DrawingApplyInit');
    }

    async DrawingApplyInit(api){
        let token = await Storage.get('user','json');
        if(token == null){
            header.Authorization = 'Bearer ';
        }else{
            header.Authorization = 'Bearer ' + token.accessToken;
        }
        HttpService.post(api, header, {assetType: 1}).then(response => {
            if(response.success){
                this.setState({
                    availableAmount: response.result.availableAmount,
                    returnTypes: response.result.returnTypes,
                    myBankCards: response.result.myBankCards,
                    commissionHandlingFeeRateForDrawing: response.result.commissionHandlingFeeRateForDrawing,
                    commissionMinAmoutForDrawing: response.result.commissionMinAmoutForDrawing,
                    returnType: response.result.returnTypes[0].id,
                    myBankCard: response.result.myBankCards[0].id
                })

                console.log(response.result)
            }
        })
        .catch(error => console.error(error)).done();
    }

    drawingAll = () => {
        this.setState({
            amount: this.state.availableAmount
        },()=>{
            (Number(this.state.amount) >= Number(this.state.commissionMinAmoutForDrawing))? this.setState({amountValid: true},()=>{this.checkForm();}) : this.setState({amountValid: false},()=>{this.checkForm();});
        });
    }

    withDrawalNow = () => {
        this.setState({
            toastStatus: true
        }); 
        let value;
        if(this.state.returnType == 4){
            value = {
                amount: this.state.amount,
                secretCode: this.state.phoneCode,
                assetType: 1,
                returnType: this.state.returnType,
                bankCardId: this.state.myBankCard
            };
        }else{
            value = {
                amount: this.state.amount,
                secretCode: this.state.phoneCode,
                assetType: 1,
                returnType: this.state.returnType
            };
        }
        this.DrawingApply(ApiUrl + '/api/services/app/UserAsset/DrawingApply', value);
    }

    async DrawingApply(api, input){
        
        let token = await Storage.get('user','json');
        if(token == null){
            header.Authorization = 'Bearer ';
        }else{
            header.Authorization = 'Bearer ' + token.accessToken;
        }
        HttpService.post(api, header, input).then(response => {
            console.log(response)
            this.setState({
                toastStatus: false
            }); 
            if(response.success){
                this.props.navigation.navigate('WithDrawalSuccess',{name: '提现成功'});
            }else{
                this.refs.ToastService.showToastText(response.error.message);
            }
        })
        .catch(error => console.error(error)).done();
    }

    getCode = () => {
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

    async getPhoneCode(api){
        let token = await Storage.get('user','json');
        header.Authorization = 'Bearer ' + token.accessToken; 
        //type 1.注册 2.登录 3.圈存 4.提现
        let input = {
            phoneNumber: '',
            userId: token.userId,
            type: 4
        };
        
        HttpService.post(api, header, input)
        .then(response => {
            console.log(response)
        })
        .catch(error => console.error(error));
    }

    checkAmount = (text) => {
        this.setState({amount: text},() => {
            if(Number(this.state.amount) == NaN){
                this.setState({amountValid: false},()=>{this.checkForm();})
            }else{
                (Number(this.state.amount) >= Number(this.state.commissionMinAmoutForDrawing)) ? this.setState({amountValid: true},()=>{this.checkForm();}) : this.setState({amountValid: false},()=>{this.checkForm();});
            }
        });
    }

    checkPhoneCode = (text) => {
        this.setState({phoneCode: text},() => {
            (this.state.phoneCode.length == 6)? this.setState({phoneCodeValid: true},()=>{this.checkForm();}) : this.setState({phoneCodeValid: false},()=>{this.checkForm();});
        });
    }

    checkForm = () => {
        if(this.state.phoneCodeValid && this.state.amountValid){
            this.setState({
                isCanSubmit: false
            })
        }else{
            this.setState({
                isCanSubmit: true
            })
        }
    }

    render(){
        let drawingModeList = [];
        let myBankCards = [];
        if(this.state.returnTypes.length > 0){
            this.state.returnTypes.map(item => drawingModeList.push(<Picker.Item key={item.id} label={item.value} value={item.id} />));
            this.state.myBankCards.map(item => myBankCards.push(<Picker.Item key={item.id} label={item.accountNoForDisplay} value={item.id} />));
        }

        return(
            <View style={styles.container} >
                <View style={styles.headerItem}>
                    <Text style={styles.headerAmount}>{this.state.availableAmount}</Text>
                    <Text style={styles.headerText}>可提余额（元）</Text>
                </View>
                <View style={styles.drawingItem}>
                    <Text>提现金额</Text>
                    <View style={styles.drawingMain}>
                        <Text style={styles.currency}>￥</Text>
                        <TextInput 
                            onChangeText={(text) => this.checkAmount(text)} 
                            value={`${this.state.amount}`}
                            keyboardType='numeric' 
                            style={styles.inputChange} 
                        />
                        <View style={styles.drawingBtn} >
                            <TouchableOpacity onPress={this.drawingAll}>
                                <Text style={styles.drawingBtnText}>全部提现</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={styles.drawingTipsText}>满{this.state.commissionMinAmoutForDrawing}元可提现，提现手续费{this.state.commissionHandlingFeeRateForDrawing}%</Text>
                </View>
                <View style={styles.BankCardItem}>
                    <View style={styles.drawingMode}>
                        <Text style={styles.drawingModeText}>验证码</Text>
                        <View style={[styles.drawingModeItem,styles.codeItem]}>
                            <TextInput 
                                placeholder="验证码" 
                                onChangeText={(text) => this.checkPhoneCode(text)} 
                                keyboardType='numeric' 
                                placeholderTextColor="#999999" 
                                maxLength={6}
                                style={{flex: 1}}
                            />
                            <View style={styles.phoneCodeItem}>
                                <TouchableOpacity onPress={this.getCode}>
                                    <Text style={styles.codeBtn}>{this.state.timerTitle}</Text>
                                </TouchableOpacity>
                            </View>
                            
                        </View>
                    </View>
                    <View style={styles.drawingMode}>
                        <Text style={styles.drawingModeText}>请选择提现方式</Text>
                        <View style={styles.drawingModeItem}>
                            <Picker
                                style={styles.pickerItem}
                                selectedValue={this.state.returnType}
                                onValueChange={(value) => this.setState({returnType: value})}>
                                {drawingModeList}
                            </Picker>
                        </View>
                    </View>
                    <View style={[styles.drawingMode,styles.code]}>
                        <Text style={styles.drawingModeText}>请选择银行卡</Text>
                        <View style={styles.drawingModeItem}>
                            <Picker
                                style={styles.pickerItem}
                                selectedValue={this.state.myBankCard}
                                onValueChange={(value) => this.setState({myBankCard: value})}>
                                {myBankCards}
                            </Picker>
                        </View>
                    </View>
                </View>
                <TouchableOpacity disabled={this.state.isCanSubmit} style={styles.withDrawalNow} onPress={this.withDrawalNow}>
                    <LinearGradient style={{borderRadius: 5}} colors={this.state.isCanSubmit ? ['#ccc','#ccc'] : ['#ffc047','#FF8635']} start={{x: 0, y: 0}} end={{x: 1, y: 1}}>
                        <Text style={styles.btnText}>立即提现</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <ToastService toastStatus={this.state.toastStatus}  ref="ToastService" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: height,
        backgroundColor: '#f4f4f4'
    },
    headerItem: {
        backgroundColor: '#ff881e',
        alignItems: 'center',
        paddingBottom: 30
    },
    headerText: {
        color: 'white'
    },
    headerAmount: {
        color: 'white',
        fontSize: 48
    },
    drawingItem: {
        padding: 20,
        backgroundColor: 'white'
    },
    drawingMain: {
        borderBottomColor: '#f4f4f4',
        borderBottomWidth: 0.5,
        borderStyle: 'solid',
        paddingBottom: 2,
        position: 'relative',
        flexDirection: 'row',
        paddingTop: 10
    },
    currency: {
        width: '5%',
        alignSelf: 'center'
    },
    inputChange: {
        width: '75%',
        padding: 0,
        fontSize: 30
    },
    drawingBtn: {
        width: '20%',
        alignItems: 'flex-end',
        alignSelf: 'center'
    },
    drawingBtnText: {
        color: '#ff881e'
    },
    drawingTipsText: {
        paddingTop: 10,
        color: '#bbb'
    },
    BankCardItem: {
        paddingTop: 10,
        backgroundColor: 'white',
        marginTop: 10
    },
    drawingMode: {
        flexDirection: 'row',
        borderBottomColor: '#f4f4f4',
        borderBottomWidth: 0.5,
        borderStyle: 'solid',
        paddingLeft: 20,
        paddingRight: 20
    },
    code: {
        borderRightWidth: 0
    },
    drawingModeText: {
        flex: 1,
        paddingTop: 15,
        paddingBottom: 15
    },
    drawingModeItem: {
        flex: 1
    },
    pickerItem: {
        width:'100%',
        backgroundColor: 'transparent',
        flex: 1
    },
    withDrawalNow: {
        padding: 20,
        marginTop: 10
    },
    btnText: {
        color: 'white',
        alignSelf: 'center',
        paddingBottom: 10,
        paddingTop: 10,
        fontSize: 16
    },
    codeItem: {
        flexDirection: 'row'
    },
    phoneCodeItem: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    codeBtn: {
        color: '#ff881e'
    }
});