import React from 'react';
import {Alert} from "react-native";
import PlantEditor from "../components/PlantEditor";

export default class AddPlantScreen extends React.Component {
    constructor(props) {
        super(props);
        this.idGreenhouse = 1;
        this.state = {
            name:null,
            species:{
                name:null,
                id:null
            }
        }
    }

    createPlant(){
        fetch(`http://46.146.230.198:3000/plant?ghId=${this.idGreenhouse}`,{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({name:this.state.name,idSpecies:this.state.species.id})
        }).then((response)=>{
            if(response.ok)
            {
                this.props.navigation.goBack()
            }
            else
            {
                Alert.alert('Не удалось добавить растение')
            }
        }).catch((error)=>{
            console.log(error)
            Alert.alert('AddPlant супер ошибка')
        })
    }

    async componentDidMount() {
        this.props.navigation.setOptions(
            {
                headerTitle:'Режим создания'
            }
        )
    }

    onChangeName(name){
        this.setState({name})
    }

    onChangeSpecies(species){
        this.setState({species})
    }

    render(){
        return(
            <PlantEditor
                onChangeName={this.onChangeName.bind(this)}
                onSubmit={this.createPlant.bind(this)}
                onChangeSpecies={this.onChangeSpecies.bind(this)}

                navigation={this.props.navigation}
                route={this.props.route}
                plantName={this.state.name}
                speciesName={this.state.species.name}
            />
        );
    }
}
