/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import LaunchScreen from "./screens/LaunchScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GreenhouseScreen from "./screens/GreenhouseScreen";

//margin - отступ элемента от соседа
//pading - отступ элемент внутри родителя

const Stack = createNativeStackNavigator();

const App: () => Node = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Launch'>
                <Stack.Screen name='Launch' component={LaunchScreen} options={{headerShown: false}}/>
                <Stack.Screen name='Greenhouse' component={GreenhouseScreen} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
