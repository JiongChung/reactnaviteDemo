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

export default class Achievement extends Component {
    constructor(props){
        super(props);
    }

    render(){
        const { navigate } = this.props.navigation;
        return(
            <View style={styles.container}>
                <Text style={styles.headerTitle}>我的业绩</Text>
                <View style={styles.toolItem}>
                    <TouchableOpacity style={styles.toolList} onPress={() => navigate('Fans',{name: '我的油粉'})}>
                        <AliIcon
                            name={'team'}
                            size={30}
                            style={{color: '#ffca43'}}
                        />
                        <Text style={styles.text}>我的油粉</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.toolList}>
                        <AliIcon
                            name={'dingdan'}
                            size={30}
                            style={{color: '#ffca43'}}
                        />
                        <Text style={styles.text}>推广订单</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.toolList}>
                        <AliIcon
                            name={'guanli'}
                            size={30}
                            style={{color: '#ffca43'}}
                        />
                        <Text style={styles.text}>分享海报</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.toolList}>
                        <AliIcon
                            name={'paihangb'}
                            size={30}
                            style={{color: '#ffca43'}}
                        />
                        <Text style={styles.text}>月度业绩增墙</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 15,
        marginRight: 15,
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