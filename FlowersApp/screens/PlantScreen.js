import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from "react-native";
import TrashBtn from '../components/TrashBtn';
import Flower from '../Assets/niceflower.svg';
import HeaderEditBtn from "../components/HeaderEditBtn";

export default class PlantScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {plant:{},water:''};
    }

    static DateFormat = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
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

                const waterDate = new Date (plant.lastWater).toLocaleDateString('ru-RU',PlantScreen.DateFormat)

                this.setState({plant,water: waterDate})
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    async componentDidMount() {

        await this.getPlantInfo()

        this.props.navigation.setOptions(
            {
                headerRight: () => (
                    <HeaderEditBtn
                        textStyle={[styles.text.header,styles.text.headerBtn]}
                        onPress={() => this.props.navigation.navigate('EditPlant',{plant:this.state.plant,onDone:()=>{
                            this.getPlantInfo().then().catch()
                            }})}
                    />
                ),
                headerTitle:'Информация'
            }
        )
    }

    async deletePlant(){
        try {
            const response = await fetch(`http://46.146.230.198:3000/plant/${this.state.plant.id}`,{
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok)
            {
                this.props.navigation.goBack();
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    render(){
        const {plant} = this.state;

        return(
            <SafeAreaView style={styles.mainContainer}>

                <View style={styles.planInfoContainer}>

                    <View style={styles.flower}>
                        <Flower width={'100%'} height={'100%'}/>
                    </View>

                    <Text style={styles.infoText}>
                        {plant.name}
                    </Text>

                    <View style={{alignItems:'center'}}>
                        <Text style={styles.infoText}>
                            Дата последнего полива:
                        </Text>
                        <Text style={styles.infoText}>
                            {this.state.water}
                        </Text>
                    </View>

                </View>

                <View style={styles.btnContainer}>
                    <View style={{height:50,width:130,backgroundColor:'#0099FF'}}/>
                </View>

                <View style={styles.trashContainer}>
                    <TrashBtn width={54} height={54} onOk={async ()=> {
                        await this.deletePlant()
                    }}/>
                </View>

            </SafeAreaView>
        );
    }
};

const styles = StyleSheet.create({
    mainContainer:{
        backgroundColor:'#ffffff',
        flexDirection:'column',
        height:'100%'
    },
    infoText:{
        color:'#575757',
        fontSize:26,
        textAlign:'center'
    },
    flower:{
        flex:0.6,
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
