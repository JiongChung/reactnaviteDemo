import React, {Component} from 'react';
import {
    View,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    Alert,
    ToastAndroid,
    Button
} from 'react-native';
import AliIcon from '../../assets/AliIcon';
const { width, height } = Dimensions.get('window');

export default class FindMenu extends Component {
    constructor(props){
        super(props);
        this.state = {
            msg: ''
        };
    }

    componentDidMount(){
    }

    openMenu = (type) =>{
        ToastAndroid.showWithGravity("努力搭建中...",ToastAndroid.SHORT,ToastAndroid.CENTER)
        // this.setState({
        //     msg: 'Go to DetailsGo to Deta'
        // })
        // this.props.navigation.navigate('Details',{name: this.state.msg});
    }

    render(){
        return(
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.openMenu(1)} style={styles.menulist}>
                    <AliIcon
                        name={'mall'}
                        size={36}
                        style={{color: '#44b1fc'}}
                    />
                    <Text style={styles.text}>商城</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.openMenu(2)} style={styles.menulist}>
                    <AliIcon
                        name={'viiolation'}
                        size={36}
                        style={{color: '#fcd668'}}
                    />
                    <Text style={styles.text}>违章查询</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.openMenu(3)} style={styles.menulist, styles.menulast}>
                    <AliIcon
                        name={'insurance'}
                        size={36}
                        style={{color: '#fc4cd8'}}
                    />
                    <Text style={styles.text}>特惠车险</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        marginTop: 15,
        borderTopColor: '#eee',
        borderTopWidth: 0.5,
        borderStyle: 'solid'
    },
    menulist: {
        flex: 1,
        alignItems: 'center',
        borderRightColor: '#eee',
        borderBottomColor: '#eee',
        borderRightWidth: 0.5,
        borderBottomWidth: 0.5,
        borderStyle: 'solid',
        paddingTop: 15,
        paddingBottom: 15
    },
    menulast: {
        flex: 1,
        alignItems: 'center',
        borderRightWidth: 0,
        borderBottomWidth: 0.5,
        paddingTop: 15,
        paddingBottom: 15,
        borderBottomColor: '#eee',
    },
    text: {
        fontSize: 14,
        paddingTop: 10
    }
})