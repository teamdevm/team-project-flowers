/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {Text, View} from "react-native";
//margin - отступ элемента от соседа
//pading - отступ элемент внутри родителя
const App: () => Node = () => {
    return (
        <View style={{
            width:'60%',
            height:'10%',
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center',
            backgroundColor: 'green',
            marginTop:'50%',
            marginLeft:'20%'
        }}>
            <Text style={{
                fontSize:50,
                color:'yellow'
            }}>
                Welcome!
            </Text>
        </View>
    );
};

export default App;
