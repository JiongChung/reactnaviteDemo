import React, {Component} from 'react';
import {
    View,
    Dimensions,
    StyleSheet,
    Text,
    Image
} from 'react-native';
const { width, height } = Dimensions.get('window');

export default class MyReferrer extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.headTitle}>我的推荐人</Text>
                <View style={styles.referrerItem}>
                    <View style={styles.userInfo}>
                    <Image style={styles.avatar} source={{uri: this.props.myReferrer.logo,cache: 'force-cache'}} />
                        <View>
                            <Text style={styles.name}>{this.props.myReferrer.nickName}</Text>
                            <Text>手机号：{this.props.myReferrer.phoneNumber}</Text>
                        </View>
                    </View>
                    <View style={styles.level}>
                        <Text style={styles.levelText}>{this.props.myReferrer.grade}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white'
    },
    headTitle: {
        padding: 10,
        paddingLeft: 15,
        borderBottomColor: '#eee',
        borderBottomWidth: 0.5,
        borderStyle: 'solid',
        color: '#222'
    },
    referrerItem: {
        padding: 10,
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: 'row'
    },
    userInfo: {
        flex: 1,
        flexDirection: 'row'
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginRight: 10
    },
    name: {
        fontSize: 16,
        color: '#222',
        paddingBottom: 5
    },
    level: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    levelText: {
        color: '#ee0000',
        fontSize: 16
    }
})