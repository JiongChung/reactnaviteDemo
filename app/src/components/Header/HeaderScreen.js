import React, {Component} from 'react';
import {
    View,
    Dimensions,
    StyleSheet,
    Text,
    StatusBar,
    TouchableOpacity
} from 'react-native';
import BVLinearGraient from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const { width, height } = Dimensions.get('window');
import AliIcon from '../../assets/AliIcon';

export default class HeaderScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            MainColor: 'blue'
        };
    }

    openMap = () => {
        if(this.props.position != undefined){
            if(this.props.iconBarName == 'ditu'){
                alert('openmap')
            }else if(this.props.iconBarName == 'fanhui'){
                this.props.navigation.goBack();
            }
        }
        
    }

    render(){
        return(
            <View>
                <StatusBar 
                    animated={true}
                    hidden={false} 
                    backgroundColor={this.state.MainColor}  />
                <LinearGradient colors={[this.props.firstColor, this.props.lastColor]} start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={[styles.container, (this.props.position != undefined) ? styles.setContainer : '']}>
                    <Text style={[styles.title,(this.props.iconBarName == 'fanhui') ? styles.leftText : null]}>{this.props.title}</Text>
                    <TouchableOpacity style={[styles.bar,(this.props.iconBarName == 'fanhui') ? styles.leftBar : null]} onPress={() => this.openMap()}>
                        <AliIcon
                            name={this.props.iconBarName}
                            size={20}
                            style={[(this.props.position != undefined) ? ((this.props.position == 'left') ? styles.left : styles.right) : styles.hideIconBarName,{color: '#fff',marginTop: 8}]}

                        />
                    </TouchableOpacity>
                </LinearGradient>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 40,
        alignItems: 'center'
    },
    setContainer: {
        alignItems: 'flex-start',
        paddingLeft: 20
    },
    title: {
        color: 'white',
        lineHeight: 40,
        fontSize: 16
    },
    bar: {
        lineHeight: 40,
        position: 'absolute',
        right: 0,
        paddingRight: 15,
        height: 40,
        paddingLeft: 10
    },
    leftBar: {
        left: 0,
        right: 'auto',
        paddingRight: 10
    },
    hideIconBarName: {
        display: 'none'
    },
    left: {
        color: 'white',
        transform: [{rotate:'180deg'}],
        fontSize: 16,
        position: 'relative',
        top: 4
    },
    right: {

    },
    leftText: {
        paddingLeft: 15
    }
});