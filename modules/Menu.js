import React, {Component} from 'react';
import {StyleSheet, Text, ScrollView} from 'react-native';

export default class MenuScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            memuList: ['关注','头条','国内','娱乐','国际','中山','科技','财经','房产','军事','汽车']
        };
    }

    componentDidMount(){
        
    }
    render(){
        let memuList = [];
        this.state.memuList.map(item => memuList.push(<Text style={styles.scrollviewText}>{item}</Text>));
        return(
            <ScrollView style={styles.scrollview} horizontal={true}>
                {memuList}
            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    scrollview: {
        paddingTop: 10,
        paddingBottom:10
    },
    scrollviewText: {
        fontSize: 20,
        paddingLeft:10,
        paddingRight:10
    }
});