import React, { Component } from 'react';
import {
    View,
    Dimensions,
    StyleSheet,
    Text,
    ImageBackground,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import BVLinearGraient from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const { width, height } = Dimensions.get('window');
import Storage from '../../storage/DeviceStorage';
import HttpService from '../../services/HttpService';
import VipInfo from '../../components/vip/VipInfo';
import VipPage from '../../components/vip/VipPage';

export default class VipScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            type: 1
        };
    }

    componentDidMount(){
        this.getVipinfo();
    }

    async getVipinfo(){
        let token = await Storage.get('user','json');
        if(token == null){
            this.setState({
                type: 1
            })
        }else{
            if(token.userGradeId > 1){
                this.setState({
                    type: 2
                })
            }else{
                this.setState({
                    type: 1
                })
            }
        }
    }

    render(){
        const { navigate } = this.props.navigation;
        return(
            <ScrollView style={styles.container}>
                {(this.state.type == 1) ? <VipInfo navigation={this.props.navigation} /> : <VipPage navigation={this.props.navigation} />}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f7f7f7',
        height: height
    }
});