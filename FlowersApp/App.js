/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GreenhouseScreen from "./screens/GreenhouseScreen";
import {StyleSheet} from "react-native";
import HeaderAddBtn from "./components/HeaderAddBtn";
import PlantScreen from "./screens/PlantScreen";
import AddPlantScreen from "./screens/AddPlantScreen";
import SpeciesScreen from "./screens/SpeciesScreen";
import EditPlantScreen from "./screens/EditPlantScreen";

//margin - отступ элемента от соседа
//pading - отступ элемент внутри родителя

const Stack = createNativeStackNavigator();

const App: () => Node = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{...styles.header, ...{headerTitleStyle:
                            {...styles.text.header, ...styles.text.headerTitle}}}}
                initialRouteName='Greenhouse'
            >
                <Stack.Screen
                    name='Greenhouse'
                    component={GreenhouseScreen}

                />
                <Stack.Screen
                    name='Plant'
                    component={PlantScreen}
                />
                <Stack.Screen
                    name='AddPlant'
                    component={AddPlantScreen}
                />
                <Stack.Screen
                    name='Species'
                    component={SpeciesScreen}
                />
                <Stack.Screen
                    name='EditPlant'
                    component={EditPlantScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    header:{
        headerStyle:{
            backgroundColor:'#f5f5f5'
        },
        headerTitleAlign:'center'
    },
    text:
        {
            header:{
                color:'#575757'
            },
            headerBtn:{
                fontSize:40
            },
            headerTitle:{
                fontSize:25,
            }
        }
});

export default App;
