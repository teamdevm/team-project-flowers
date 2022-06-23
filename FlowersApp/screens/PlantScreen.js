import React from 'react';
import {Button, StyleSheet, Text, View} from "react-native";
import TrashBtn from '../components/TrashBtn';
import Flower from '../Assets/niceflower.svg';

export default class PlantScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {plant:{}};
    }

    async getPlantInfo(){
        const {id} = this.props.route.params;
        try {
            const response = await fetch(`http://46.146.230.198:3000/plant/${id}`,{
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok)
            {
                const plant = await response.json();
                this.setState({plant});
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    async componentDidMount() {
        await this.getPlantInfo();
    }

    render(){
        const {plant} = this.state;
        return(
            <View style={styles.mainContainer}>

                <View style={styles.planInfoContainer}>

                    <View style={styles.flower}>
                        <Flower width={'100%'} height={'100%'}/>
                    </View>

                    <Text style={styles.text}>
                        {plant.name}
                    </Text>

                    <View style={{alignItems:'center'}}>
                        <Text style={styles.text}>
                            Дата последнего полива:
                        </Text>
                        <Text style={styles.text}>
                            {plant.lastWater}
                        </Text>
                    </View>

                </View>

                <View style={styles.btnContainer}>
                    <View style={{height:50,width:130,backgroundColor:'#0099FF'}}/>
                </View>

                <View style={styles.trashContainer}>
                    <TrashBtn width={54} height={54}/>
                </View>

            </View>
        );
    }
};

const styles = StyleSheet.create({
    mainContainer:{
        backgroundColor:'#ffffff',
        flexDirection:'column',
        height:'100%'
    },
    text:{
        color:'#575757',
        fontSize:26,
    },
    flower:{
        flex:0.7,
        justifyContent:'center',
        alignItems:'center',
        width:160,
        paddingTop:20
    },
    planInfoContainer:{
        flex:2.5,
        justifyContent:'space-between',
        alignItems:'center'
    },
    btnContainer:{
        flex:1,
        justifyContent:'flex-end',
        alignItems:'center'
    },
    trashContainer:{
        flex:1,
        justifyContent:'flex-end',
        alignItems:'flex-end',
        margin:20
    }
});
