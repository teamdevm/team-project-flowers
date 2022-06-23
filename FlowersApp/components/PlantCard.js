import React, {Component} from 'react';
import {Text, StyleSheet, TouchableOpacity} from "react-native";
import {withNavigation} from 'react-navigation';

class PlantCard extends Component{
    render(){
        const {style, plant,screenName}=this.props;
        return (
            <TouchableOpacity style={styles.container}
            onPress={()=>this.props.navigation.navigate(screenName,{id:plant.id})}>
                <Text style={{fontSize:30, color:'#575757'}}>
                    {plant.name}
                </Text>
            </TouchableOpacity>
        )}
}

export default withNavigation(PlantCard);

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#ffffff',
        width:'90%',
        borderRadius:15,
        borderWidth:2,
        //borderColor:'#575757',
        alignSelf:'center',
        justifyContent:'center',
        marginTop:30,
        height:60,
        //maxWidth:1000,
        alignItems:'center',
        //marginLeft:'5%'
    }
});
