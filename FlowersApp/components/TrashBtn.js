import React from 'react';
import {Text, TouchableOpacity, StyleSheet, Alert} from "react-native";
import Trash from "../Assets/icons/delete.svg";

const TrashBtn = (props) => {
    const okBtn={
        text:'Да',
        onPress:props.onOk
    }
    const cancelBtn={
        text:'Нет',
        onPress:props.onCancel,
        //style:'cancel'
    }
    return (
        <TouchableOpacity style={[styles.container,{width:props.width, height:props.height}]}
                          onPress={()=>Alert.alert('Удалить?',
                              'Вы уверены что хотите удалить это растение из оранжереи?',
                              [okBtn,cancelBtn])}>
            <Trash width={'100%'} height={'100%'} fill={'#575757'}/>
        </TouchableOpacity>
    );
};

module.exports=TrashBtn;

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#ff9999',
        borderRadius:9,
    }
});
