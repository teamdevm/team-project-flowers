import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from "react-native";

const CancelBtn = (props) => {
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
        alignSelf:'center',
        backgroundColor:'#FF9999',
        height:50,
        width:130,
        borderRadius:15
    },
    text:{
        textAlign:'center',
        fontSize:26,
        fontWeight:'bold',
        color:'#FFFFFF'
    }
});

module.exports = CancelBtn;
