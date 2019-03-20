import React, {Component} from 'react';
import {
    View,
    Dimensions,
    StyleSheet,
    Text,
    Animated,
    Easing, 
} from 'react-native';
import Ionicons from 'react-native-vector-icons/FontAwesome';
const { width, height } = Dimensions.get('window');

export default class ToastService extends Component {
    constructor(props){
        super(props);
        this.spinValue = new Animated.Value(0)
        this.state = {
            showToastText: false,
            msg: ''
        };
    }
    componentDidMount() {
        this.spinner();
    }
 
    spinner = () => {
        this.spinValue.setValue(0)
        Animated.timing(this.spinValue,{
            toValue: 1, // 最终值 为1，这里表示最大旋转 360度
            duration: 1500,
            easing: Easing.linear
        }).start(() => this.spinner());
    }

    showToastText = (msg) => {
        this.setState({
            showToastText: true,
            msg: msg
        },() => {
            setTimeout(() => {
                this.setState({
                    showToastText: false
                })
            },2500)
        })
    }

    render(){
        const spinner = this.spinValue.interpolate({
            inputRange: [0, 1],//输入值
            outputRange: ['0deg', '360deg'] //输出值
        })
        return(
            <View style={styles.containerItem}>
                <View style={this.props.toastStatus ? styles.container : styles.status} >
                    <View style={styles.box}>
                        <Animated.View style={[styles.rotateItem,{transform:[{rotate: spinner }]}]}>
                            <Ionicons style={styles.spinner} name={'spinner'} />
                        </Animated.View>
                    </View>
                </View>
                <View style={this.state.showToastText ? styles.toastNormal : styles.status}>
                    <Text style={styles.toastText}>{this.state.msg}</Text>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    containerItem: {
        flex: 1,
        width: width,
        height: height,
        position: 'absolute',
        top: 0,
        left: 0,
    },
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.2)',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 100,
        width: width,
        height: height,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rotateItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
    },
    box: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
        height: 80,
        backgroundColor: 'rgba(0,0,0,0.7)',
        borderRadius: 5
    },
    spinner: {
        fontSize: 40,
        color: 'rgba(255,255,255,0.9)'
    },
    status: {
        display: 'none'
    },
    toastNormal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    toastText: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        color: '#fff',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 30,
        marginLeft: 30,
        marginRight: 30
    }
});