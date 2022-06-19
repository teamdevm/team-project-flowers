import React, {Component} from 'react';
import {Text, StyleSheet, TouchableOpacity} from "react-native";
import {withNavigation} from 'react-navigation';

class PlantCard extends Component{
    render(){
        const {style, plant,screenName}=this.props;
        return (
            <TouchableOpacity style={styles.container}
            onPress={()=>this.props.navigation.navigate(screenName,{id:plant.id})}>
                <Text style={{fontSize:40, color:'#fcb0d5'}}>
                    {plant.name}
                </Text>
            </TouchableOpacity>
        )}
}

export default withNavigation(PlantCard);

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
