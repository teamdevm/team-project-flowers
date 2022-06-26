import React from 'react';
import {Image, Text, View} from "react-native";
import LaunchBtn from "../components/LaunchBtn";

export default class LaunchScreen extends React.Component {
    render() {
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
                        source = {require('../Assets/start-page-flower.png')}
                        style={{
                            width:250,
                            height:500,
                        }}
                    />
                </View>
                <View>
                    <LaunchBtn onPress={()=>this.props.navigation.navigate('Greenhouse')}/>
                </View>
            </View>
        );
    }
}
