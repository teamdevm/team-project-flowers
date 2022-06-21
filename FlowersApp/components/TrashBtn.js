import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from "react-native";
import Trash from "../Assets/icons/delete.svg";

const TrashBtn = (props) => {
    return (
        <TouchableOpacity style={[styles.container,{width:props.width, height:props.height}]}
                          onPress={props.onPress}>
            <Trash width={'100%'} height={'100%'} fill='black'/>
        </TouchableOpacity>
    );
};

module.exports=TrashBtn;

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'red',
        borderRadius:20,
    }
});
