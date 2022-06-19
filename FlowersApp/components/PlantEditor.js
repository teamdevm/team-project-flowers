import React, {Component} from 'react';
import {Text, StyleSheet, TouchableOpacity, View, TextInput} from "react-native";
import {withNavigation} from "react-navigation";
import MainBtn from './MainBtn'

class PlantEditor extends Component{
    constructor(props) {
        super(props);
        this.idGreenhouse=props.idGreenhouse;
        this.state={
            name:'',
            idSpecies:2
        }
    }

    async createPlant(){
        try {
            console.log(this.state)
            const response = await fetch(`http://46.146.230.198:3000/plant?ghId=${this.idGreenhouse}`,{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(this.state)
            });

            if (response.ok)
            {
                this.props.navigation.goBack();
            }
            else
            {
                console.log(response);
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    render(){
        return(
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder={'Имя...'}
                onChangeText={(name)=>this.setState({name})}
            />
            <MainBtn text={'Добавить'} onPress={async ()=>{
                await this.createPlant();
            }}/>
        </View>
        )
    }
}

export default withNavigation(PlantEditor);

const styles = StyleSheet.create({
    container:{
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    text:{
        fontSize:14,
        fontWeight:'bold'
    },
    input:{
        height:40,
        width:300,
        margin:12,
        borderWidth:1
    }
});
