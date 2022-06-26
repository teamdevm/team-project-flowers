import React from 'react';
import {Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import TrashBtn from '../components/TrashBtn';
import Flower from '../Assets/niceflower.svg';
import HeaderEditBtn from "../components/HeaderEditBtn";
import DateVisualizer from '../components/DateVisualizer';

export default class PlantScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {plant:{name:'',species:{name:''}}};
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

                this.setState({plant})
            }
        }
        catch (e) {
            Alert.alert('Не удалось загрузить информацию о растении');
            this.props.navigation.goBack();
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
            Alert.alert('Не удалось удалить растение');
            this.props.naviagtion.goBack();
        }
    }

    updateWaterDate(){
        fetch(`http://46.146.230.198:3000/plant/${this.state.plant.id}`,{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({name:this.state.plant.name,idSpecies:this.state.plant.species.id,lastWater:new Date()})
        }).then(async (response)=>{
            if(response.ok)
            {
                await this.getPlantInfo();
            }
            else
            {
                Alert.alert('Не удалось изменить дату полива')
            }
        }).catch((error)=>{
            console.log(error)
            Alert.alert('Не удалось изменить дату полива');
        })
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

                    <Text style={styles.infoText}>
                        {plant.species.name}
                    </Text>

                    <View style={{alignItems:'center'}}>
                        <Text style={styles.infoText}>
                            Дата последнего полива:
                        </Text>
                        <DateVisualizer style={styles.infoText} date={new Date(this.state.plant.lastWater)}/>
                    </View>

                </View>

                <View style={styles.btnContainer}>
                    <TouchableOpacity onPress={this.updateWaterDate.bind(this)} style={styles.waterBtn}>
                        <Text style={styles.text.waterBtn}>
                            Полить
                        </Text>
                    </TouchableOpacity>
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
        flex:0.7,
        justifyContent:'flex-end',
        alignItems:'center',
        flexDirection:'column',
    },
    trashContainer:{
        flex:1,
        justifyContent:'flex-end',
        alignItems:'flex-end',
        margin:20
    },
    waterBtn: {
        backgroundColor:'#0099FF',
        justifyContent:'center',
        alignItems:'center',
        height:50,
        width:130,
        borderRadius:10
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
        },
        waterBtn:{
            color:'#ffffff',
            textAlign:'center',
            textAlignVertical:'center',
            fontSize:26
        }
    }
});
