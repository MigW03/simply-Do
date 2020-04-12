import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import FeatherIcon from 'react-native-vector-icons/Feather'

export default class TodoItem extends React.Component{
    render(){
        return (
             <View style={styles.itemContainer}>
                <Text style={styles.text}>{this.props.title}</Text>
                <TouchableOpacity onPress={this.props.onPress} style={styles.touch}>
                     <FeatherIcon name='trash-2' color='#e60000' size={25}/>
                </TouchableOpacity>
            </View>
        );}
}

const styles = StyleSheet.create({
    container: {

    },
    itemContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#878787',
        borderRadius: 12,
        borderStyle: 'dashed',
        margin: 10,
        width: '80%',
        alignSelf: 'center'
    },
    text: {
        fontSize: 22,
        maxWidth: '75%',
        fontWeight: 'bold',
        color: '#000',
        margin: 10,
        marginLeft: 16
    },
    touch: {
        width: '15%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    }
})
