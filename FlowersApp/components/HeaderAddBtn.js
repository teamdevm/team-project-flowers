import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from "react-native";

const HeaderAddBtn = (props) =>{
    return(
        <TouchableOpacity style={styles.container} onPress={props.onPress}>
            <Text style={props.textStyle}>
                +
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
    }
});

module.exports = HeaderAddBtn;
