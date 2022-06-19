import React from 'react';
import {StyleSheet, Text, View} from "react-native";

export default class PlantScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {plant:{}};
    }

    async getPlantInfo(){
        const {id} = this.props.route.params;
        try {
            const response = await fetch(`http://46.146.230.198:3000/plant/${id}`,{
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok)
            {
                const plant = await response.json();
                this.setState({plant});
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    async componentDidMount() {
        await this.getPlantInfo();
    }

    render(){
        const {plant} = this.state;
        return(
            <View style={styles.container}>
                <Text style={styles.text}>
                    Имя: {plant.name}
                </Text>
                <Text style={styles.text}>
                    ID: {plant.id}
                </Text>
                <Text style={styles.text}>
                    Последний полив был:
                </Text>
                <Text style={styles.text}>
                    {plant.lastWater}
                </Text>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff41d',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        height:'100%'
    },
    text:{
        color:'#ee057a',
        fontSize:30,
        fontWeight:'bold',
    },
});
