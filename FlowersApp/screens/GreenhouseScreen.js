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
        }
        catch (e) {
            console.log(e);
        }
    }

    async componentDidMount() {
        await this.getPlants();

        this.props.navigation.setOptions(
            {
                headerRight: () => (
                    <HeaderAddBtn
                        textStyle={[styles.text.header,styles.text.headerBtn]}
                        onPress={() => this.props.navigation.navigate('AddPlant')}
                    />
                )
            }
        )

        this._unsubscribe = this.props.navigation.addListener('focus', async() => {
            await this.getPlants();
        });
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
        backgroundColor:'#31bdac',
        flexDirection:'column',
        justifyContent:'center',
        paddingBottom:'5%',
        height:'100%'
    },
    text:
        {
            header:{
                color:'yellow',
                //fontStile:''
            },
            headerBtn:{
                fontSize:40
            },
            headerTitle:{
                fontSize:30
            }
        }
});
