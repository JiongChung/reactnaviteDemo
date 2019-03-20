import React, {Component} from 'react';
import {
    View,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    TextInput,
    Picker
} from 'react-native';
const { width, height } = Dimensions.get('window');
import AliIcon from '../../assets/AliIcon';
import BVLinearGraient from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class WithDrawalSuccessScreen extends Component {
    constructor(props){
        super(props);
    }

    static navigationOptions = ({navigation})=>{
        return {
            title: `${navigation.state.params.name}`,
            headerTitleStyle: {
                alignSelf: 'center',
                flex:1, 
                textAlign: 'center',
                color: 'white'
            },
            headerStyle: {
                backgroundColor: '#ff881e'
            },
            headerRight: <View />,
            headerLeft: <View />
        }
    };

    withDrawalSuccess = () => {
        this.props.navigation.navigate('Commission');
    }

    render(){
        return(
            <View style={styles.container}>
                <LinearGradient style={styles.iconItem} colors={['#ffc047','#FF8635']} start={{x: 0, y: 0}} end={{x: 1, y: 1}}>
                    <AliIcon
                        name={'duihao'}
                        size={48}
                        style={{color: 'white'}}
                    />
                </LinearGradient>
                <View style={styles.textItem}>
                    <Text style={styles.header}>提现成功</Text>
                    <Text>我们将在三个工作日内处理内的提现申请</Text>
                </View>
                <TouchableOpacity style={styles.withDrawalSuccess} onPress={this.withDrawalSuccess}>
                    <LinearGradient style={{borderRadius: 5}} colors={['#ffc047','#FF8635']} start={{x: 0, y: 0}} end={{x: 1, y: 1}}>
                        <Text style={styles.btnText}>完成</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: height,
        backgroundColor: '#f7f7f7'
    },
    iconItem: {
        alignItems: 'center',
        marginTop: 50,
        alignSelf: 'center',
        width: 100,
        height: 100,
        borderRadius: 100,
        backgroundColor: '#ff881e',
        justifyContent: 'center'
    },
    textItem: {
        alignItems: 'center',
        paddingTop: 20
    },
    header: {
        fontSize: 18,
        color: 'black',
        paddingBottom: 10
    },
    withDrawalSuccess: {
        marginTop: 30,
        marginLeft: 30,
        marginRight: 30
    },
    btnText: {
        color: 'white',
        alignSelf: 'center',
        paddingBottom: 10,
        paddingTop: 10,
        fontSize: 16
    }
})