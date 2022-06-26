import React from 'react';
import {Alert, FlatList, SafeAreaView, StyleSheet, View} from "react-native";
import PlantCard from "../components/PlantCard";
import HeaderAddBtn from "../components/HeaderAddBtn";

export default class GreenhouseScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {plants:[]};
    }
    async getPlants(){
        try {
            const response = await fetch('http://46.146.230.198:3000/plant?ghId=1',{
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok)
            {
                const plants = await response.json();
                this.setState({plants});
            }
            else {
                Alert.alert('Не удалось загрузить список ошибок');
            }
        }
        catch (e) {
            console.log(e);
            Alert.alert('Не удалось загрузить список растений');
        }
    }

    async componentDidMount() {

        this.props.navigation.setOptions(
            {
                headerRight: () => (
                    <HeaderAddBtn
                        textStyle={[styles.text.header,styles.text.headerBtn]}
                        onPress={() => this.props.navigation.navigate('AddPlant')}
                    />
                ),
                headerTitle:'Ваши растения'
            }
        )

        try {
            this._unsubscribe = this.props.navigation.addListener('focus', async () => {
                await this.getPlants();
            });
        }
        catch (e) {
            Alert.alert(e);
        }

        try{
        await this.getPlants();
        }
        catch (e) {
            Alert.alert(e);
        }
    }

    async componentWillUnmount() {
        await this._unsubscribe();
    }

    render() {
        const {plants} = this.state;
        return(
            <SafeAreaView>
                <View style={styles.grid}>
                    {/*<Button title={'Get Info'} onPress={()=>console.log(plants)}/>*/}
                    <FlatList
                    data={plants}
                    renderItem={({item})=>
                        <PlantCard
                            plant={item}
                            navigation={this.props.navigation}
                            screenName={'Plant'}
                        />}
                    keyExtractor={plant=>plant.id}
                    />
                </View>
            </SafeAreaView>
        );
    }
};

const styles = StyleSheet.create({
    grid:{
        backgroundColor:'#ffffff',
        flexDirection:'column',
        justifyContent:'center',
        paddingBottom:'5%',
        height:'100%'
    },
    text:
        {
            header:{
                color:'#575757',
            },
            headerBtn:{
                fontSize:40
            },
            headerTitle:{
                fontSize:30
            }
        }
});
