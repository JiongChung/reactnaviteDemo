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

export default class FootService extends Component {
    constructor(props){
        super(props);
        this.spinValue = new Animated.Value(0)
    }

    componentDidMount() {
        this.spinner();
    }

    spinner = () => {
        this.spinValue.setValue(0)
        Animated.timing(this.spinValue,{
            toValue: 1, // 最终值 为1，这里表示最大旋转 360度
            duration: 1000,
            easing: Easing.linear
        }).start(() => this.spinner());
    }

    render(){
        const spinner = this.spinValue.interpolate({
            inputRange: [0, 1],//输入值
            outputRange: ['0deg', '360deg'] //输出值
        })
        if(this.props.totalCount > 0){
            if(this.props.isFinished){
                return <View><Text style={styles.footText}>我是有底线的</Text></View>;
            }else{
                return(
                    <View style={styles.container}>
                        <View style={styles.footLoadText}>
                            <View style={styles.rotate}>
                                <Animated.View style={[styles.rotateItem,{transform:[{rotate: spinner }]}]}>
                                    <Ionicons style={styles.spinner} name={'spinner'} />
                                    {/*name = circle-o-notch */}
                                </Animated.View>
                            </View>
                            <Text>正在载入...</Text>
                        </View>
                    </View>
                )
            }
        }else{
            return null;
        }
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingTop: 15,
        paddingBottom: 15,
        alignItems: 'center'
    },
    footLoadText: {
        flexDirection: 'row'
    },
    rotate: {
        width: 20,
        height: 20,
        overflow: 'hidden',
        marginRight: 10
    },
    rotateItem: {
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
    },
    spinner: {
        fontSize: 20,
        color: 'rgba(0,0,0,0.7)'
    },
    footText: {
        textAlign: 'center',
        paddingBottom: 10,
        paddingTop: 10,
        color: '#bbb',
        backgroundColor: '#f7f7f7'
    }
});