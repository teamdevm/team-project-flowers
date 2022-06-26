import React from 'react'
import {Alert, SafeAreaView, SectionList, View} from "react-native";
import {Species,SpeciesGroup} from '../components/SpeciesListItems'

export default class SpeciesScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {species:[]};
    }

    async getSpecies(){
        try {
            const response = await fetch(`http://46.146.230.198:3000/plant/group/species`,{
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok)
            {
                const species = await response.json();
                return species.map((group)=>{return{name:group.name,data:group.species}});
            }
            else {
                Alert.alert('Не удалось получить список видов растений');
                this.props.navigation.goBack();
            }
        }
        catch (e) {
            Alert.alert('Не удалось получить список видов растений');
            this.props.navigation.goBack();
        }
    }

    async componentDidMount() {

        const species = await this.getSpecies();
        this.setState({species});

        this.props.navigation.setOptions(
            {
                headerTitle:'Выберете вид растения'
            }
        )
    }

    render(){
        const {onChoose} = this.props.route.params
        return(
            <SafeAreaView style={{backgroundColor:'white',flex:1}}>
                <SectionList
                    sections={this.state.species}
                    keyExtractor={(item,index) => item.id}
                    renderItem={({item})=>
                        <Species
                            onPress={()=> {
                                onChoose({id:item.id,name:item.name})
                                this.props.navigation.goBack()
                            }}
                            speciesName={item.name}
                        />}
                    renderSectionHeader={({section:{name}})=>
                        <SpeciesGroup
                            groupName={name}
                        />}
                />
            </SafeAreaView>
        );
    }
};
