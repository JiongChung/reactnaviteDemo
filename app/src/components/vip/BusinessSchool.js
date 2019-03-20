import React, {Component} from 'react';
import {
    View,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';
const { width, height } = Dimensions.get('window');
import AliIcon from '../../assets/AliIcon';

export default class BusinessSchool extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.headerTitle}>油联商学院</Text>
                <View style={styles.toolItem}>
                    <TouchableOpacity style={styles.toolList}>
                        <AliIcon
                            name={'xin'}
                            size={30}
                            style={{color: '#ffca43'}}
                        />
                        <Text style={styles.text}>每日贴士</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.toolList}>
                        <AliIcon
                            name={'shu'}
                            size={30}
                            style={{color: '#ffca43'}}
                        />
                        <Text style={styles.text}>新手宝典</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.toolList}>
                        <AliIcon
                            name={'jiangtang'}
                            size={30}
                            style={{color: '#ffca43'}}
                        />
                        <Text style={styles.text}>院长讲堂</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.toolList}>
                        <AliIcon
                            name={'star'}
                            size={30}
                            style={{color: '#ffca43'}}
                        />
                        <Text style={styles.text}>明星采访</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 15,
        backgroundColor: 'white',
        borderRadius: 10
    },
    headerTitle: {
        padding: 10,
        paddingLeft: 15,
        borderBottomColor: '#eee',
        borderBottomWidth: 0.5,
        borderStyle: 'solid'
    },
    toolItem:{
        flexDirection: 'row',
        paddingTop: 15,
        paddingBottom: 15
    },
    toolList: {
        alignItems: 'center',
        flex: 1
    },
    text: {
        paddingTop: 5,
        fontSize: 12
    }
});