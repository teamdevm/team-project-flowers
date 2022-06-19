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

//margin - отступ элемента от соседа
//pading - отступ элемент внутри родителя

const Stack = createNativeStackNavigator();

const App: () => Node = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{...styles.header, ...{headerTitleStyle: {...styles.text.header, ...styles.text.headerTitle}}}}
                initialRouteName='Greenhouse'
            >
                <Stack.Screen name='Greenhouse'
                              component={GreenhouseScreen}
                              options={{headerRight:()=>(
                                  <HeaderAddBtn textStyle={[styles.text.header,styles.text.headerBtn]} onPress={()=>alert('Wow!')}/>
                                  )}}
                />
                <Stack.Screen name='Plant'
                              component={PlantScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    header:{
        headerStyle:{
            backgroundColor:'#ea4d1f'
        },
        headerTitleAlign:'center'
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

export default App;
