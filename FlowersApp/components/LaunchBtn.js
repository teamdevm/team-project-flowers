import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from "react-native";

const LaunchBtn = (props) => {
    return (
        <TouchableOpacity style={styles.container} onPress={props.onPress}>
            <Text style={styles.text}>
                Начать
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container:{
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#4e9ae9',
        height:50,
        borderRadius:50
    },
    text:{
        textAlign:'center',
        width:180,
        fontSize:14,
        fontWeight:'bold',
        color:'white'
    }
});

module.exports = LaunchBtn;
