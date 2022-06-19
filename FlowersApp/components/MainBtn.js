import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from "react-native";

const MainBtn = (props) => {
    return (
        <TouchableOpacity style={styles.container} onPress={props.onPress}>
            <Text style={styles.text}>
                {props.text}
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
        borderRadius:20
    },
    text:{
        textAlign:'center',
        width:180,
        fontSize:14,
        fontWeight:'bold',
        color:'white'
    }
});

module.exports = MainBtn;
