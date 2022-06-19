import React from 'react';
import {Text} from "react-native";

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
        <Text>
            Имя: {plant.name} ID: {plant.id}
        </Text>
        );
    }
};
