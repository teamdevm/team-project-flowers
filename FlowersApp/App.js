/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {Image, Text, View} from "react-native";

//margin - отступ элемента от соседа
//pading - отступ элемент внутри родителя

const App: () => Node = () => {
    return (
        <View style={{
            flexDirection:'column',
            alignItems:'center',
            justifyContent:'space-around',
            height:'100%'
        }}>
            <View style={{
                width:'60%',
                height:'10%',
                flexDirection:'row',
                justifyContent:'center',
                alignItems:'center',
                backgroundColor: 'green',
            }}>
                <Text style={{
                    fontSize:50,
                    color:'yellow'
                }}>
                    Welcome!
                </Text>
            </View>
            <View>
                <Image
                    source = {require('./Assets/start-page-flower.png')}
                    style={{
                        width:250,
                        height:500,
                    }}
                />
            </View>
            <View>
                <Text style={{
                    fontSize:20,
                    color:'black'
                }}>
                    loading...
                </Text>
            </View>
        </View>
    );
};

export default App;
