import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from "react-native";

export default class PlantCard extends Component{
    render(){
        const {style, title}=this.props
        return (
            <TouchableOpacity style={styles.container}>
                <Text style={{fontSize:40, color:'#fcb0d5'}}>
                    {title}
                </Text>
            </TouchableOpacity>
        )}
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#6143e3',
        width:'90%',
        borderRadius:15,
        alignSelf:'center',
        marginTop:20,
        //maxWidth:1000,
        alignItems:'center',
        //marginLeft:'5%'
    }
});
