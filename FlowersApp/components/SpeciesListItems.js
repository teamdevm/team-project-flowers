import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

const SpeciesGroup = (props) => {
    return (
        <View style={styles.group.container}>
            <Text style={styles.group.text}>
                {props.groupName}
            </Text>
        </View>
    );
};

const Species = (props) => {
    return (
        <TouchableOpacity style={styles.species.container} onPress={props.onPress}>
            <Text style={styles.species.text}>
                {props.speciesName}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    group:{
        text:{
            textAlign:'center',
            fontSize:26,
            fontWeight:'bold',
            color:'#000000'
        },
        container:{
            justifyContent:'center',
            alignItems: 'center',
            margin:5
        }
    },

    species:{
        text:{
            textAlign:'center',
            fontSize:26,
            color:'#575757'
        },
        container:{
            backgroundColor:'#ffffff',
            borderColor:'#BDBDBD',
            width:'90%',
            borderRadius:15,
            borderWidth:2,
            alignSelf:'center',
            justifyContent:'center',
            minHeight:60,
            margin:12,
            alignItems:'center',
        }
    }

});

module.exports = {SpeciesGroup,Species};
