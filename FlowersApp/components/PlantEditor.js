import React, {Component} from 'react';
import {Text, StyleSheet, TouchableOpacity, View, TextInput} from "react-native";
import {withNavigation} from "react-navigation";
import MainBtn from './MainBtn'

class PlantEditor extends Component{
    constructor(props) {
        super(props);
    }

    /*
    Что мы видим в props:

    -plantName : 'Имя растения'
    -speciesName : 'Вид растения'

    -onChangeName & onChangeSpecies

    -onSubmit - кнопка подтверждения

    */

    render(){
        const defaultName = this.props.plantName == null? '':this.props.name
        const defaultSpecies = this.props.speciesName == null? 'Выберете вид':this.props.speciesName

        return(
        <View style={styles.container}>

            <View style={{alignItems:'center'}}>
                <TextInput
                    style={styles.input}
                    placeholder={'Имя'}
                    value={defaultName}
                    onChangeText={(name)=>this.props.onChangeName(name)}
                />

                <Text style={{color: '#575757',fontSize:18,fontStyle:'italic'}}>
                    Введите имя растения
                </Text>

                <TouchableOpacity
                    style={styles.species}
                    onPress={()=> this.props.navigation.navigate('Species',{onChoose:this.props.onChangeSpecies})}
                >
                    <Text style={{fontSize:23, color:'#575757'}}>
                        {defaultSpecies}
                    </Text>

                </TouchableOpacity>

                <Text style={{color: '#575757',fontSize:18,fontStyle:'italic'}}>
                    Выберете вид растения
                </Text>

            </View>

            <MainBtn text={'Готово'} onPress={this.props.onSubmit}/>

        </View>
        )
    }
}

export default withNavigation(PlantEditor);

const styles = StyleSheet.create({
    container:{
        flexDirection:'column',
        justifyContent:'space-between',
        flex:1,
        padding:20,
        //alignItems:'center'
    },
    text:{
        fontSize:14,
        fontWeight:'bold'
    },
    input:{
        height:55,
        width:'65%',
        fontSize:26,
        color:'#575757',
        borderBottomWidth:1,
        alignItems:'center',
        justifyContent:'center',
        textAlign:'center'
    },
    species:{
        backgroundColor:'#ffffff',
        borderColor:'#BDBDBD',
        width:'95%',
        borderRadius:15,
        borderWidth:2,
        alignSelf:'center',
        justifyContent:'center',
        marginTop:50,
        minHeight:60,
        alignItems:'center',
    }
});
