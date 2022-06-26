import React from 'react';
import {Alert} from "react-native";
import PlantEditor from "../components/PlantEditor";

export default class EditPlantScreen extends React.Component {
    constructor(props) {
        super(props);
        const {plant} = this.props.route.params
        this.idPlant = plant.id;
        this.state = {
            name:plant.name,
            species:{
                name:plant.species.name,
                id:plant.species.id
            }
        }
    }

    updatePlant(){
        fetch(`http://46.146.230.198:3000/plant/${this.idPlant}`,{
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
                Alert.alert('Не удалось изменить растение')
            }
        }).then(()=>{
            if(this.props.route.params.onDone!=null)
            {
                this.props.route.params.onDone()
            }
        }).catch((error)=>{
            console.log(error)
            Alert.alert('EditPlant супер ошибка')
        })
    }

    async componentDidMount() {
        this.props.navigation.setOptions(
            {
                headerTitle:'Редактирование'
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
                onSubmit={this.updatePlant.bind(this)}
                onChangeSpecies={this.onChangeSpecies.bind(this)}

                navigation={this.props.navigation}
                route={this.props.route}
                plantName={this.state.name}
                speciesName={this.state.species.name}
            />
        );
    }
}
