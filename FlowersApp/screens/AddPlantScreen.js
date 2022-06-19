import React from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import PlantEditor from "../components/PlantEditor";
import HeaderAddBtn from "../components/HeaderAddBtn";

export default class AddPlantScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        this.props.navigation.setOptions(
            {
                headerTitle:'Добавить растение'
            }
        )
    }

    render(){
        return(
            <PlantEditor
                idGreenhouse={1}
                navigation={this.props.navigation}
            />
        );
    }
}
