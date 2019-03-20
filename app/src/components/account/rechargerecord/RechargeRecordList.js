import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';

export default class RechargeRecordList extends Component {
    constructor(props){
        super(props);
    }

    rechargeDetail = () => {
        alert(3)
    }

    render(){
        let releaseItems = [];
        this.props.item.releaseItems.map((sub, index) => releaseItems.push(
            <View style={styles.activeList} key={index}>
                {
                    (sub.statusId == 1) ? 
                    <Image style={{width: 30,height: 46}} source={require('../../../assets/images/oil-drum-active.png')} /> : 
                    ((sub.statusId == 2) ? <Image style={{width: 30,height: 46}} source={require('../../../assets/images/oil-drum.jpg')} /> : 
                        <Image style={{width: 30,height: 46}} source={require('../../../assets/images/oil-drum.png')} />
                    )
                }
                <Text style={styles.statusText}>{sub.status}</Text>
                <Text>{sub.activeDate}</Text>
            </View>
        ))

        return(
            <TouchableOpacity style={styles.rechargeList} onPress={() => this.rechargeDetail()}>
                <View style={styles.listTitleItem}>
                    <View style={styles.titleText}>
                        <Text style={styles.titleLeft}>{this.props.item.rechargeTitle}</Text>
                    </View>
                    <View style={styles.titleText}>
                        <Text style={styles.titleRight}>{this.props.item.rechargeSubTitle}</Text>
                    </View>
                </View>
                <View style={styles.activeItem}>
                    {releaseItems}
                </View>
                <View style={styles.saveItem}>
                    <Text style={{paddingBottom: 5}}>节省:{this.props.item.savedAmount}元</Text>
                    <Text>充值:{this.props.item.rechargeAmount}（{this.props.item.batchAmount}元/期）付款:{this.props.item.payAmount}元</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    rechargeList: {
        backgroundColor: 'white',
        padding: 15,
        marginBottom: 10
    },
    listTitleItem: {
        flexDirection: 'row',
        borderBottomColor: '#f1f1f1',
        borderBottomWidth: 0.5,
        borderStyle: 'solid',
        paddingBottom: 10
    },
    titleText: {
        flex: 1
    },
    titleLeft: {
        fontSize: 16,
        color: 'black'
    },
    titleRight: {
        alignSelf: 'flex-end'
    },
    activeItem: {
        flexDirection: 'row',
        paddingTop: 15
    },
    activeList: {
        flex: 1,
        alignItems: 'center'
    },
    icon: {
        height: 30,
        width: 30
    },
    statusText: {
        paddingBottom: 5,
        paddingTop: 5
    },
    saveItem: {
        alignItems: 'flex-end',
        borderTopColor: '#f1f1f1',
        borderTopWidth: 0.5,
        borderStyle: 'solid',
        paddingTop: 10,
        marginTop: 15
    }
})