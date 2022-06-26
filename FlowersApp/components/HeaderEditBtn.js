import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Pencil from '../Assets/icons/edit.svg'

const HeaderEditBtn = (props) =>{
    return(
        <TouchableOpacity style={styles.container} onPress={props.onPress}>
                <Pencil height={'90%'} width={'90%'}/>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
        height:38,
        width:38
    }
});

module.exports = HeaderEditBtn;
