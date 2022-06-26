import React from 'react'
import Moment from 'moment'
import {Text} from "react-native";

/*
* props.date
*
*
*
* */
const DateVisualizer = (props) =>{
    Moment.loca
    const dateString = Moment(props.date).format('DD.MM.YY')
    const timeString = Moment(props.date).format('HH:mm:ss')
    return(
       <Text style={props.style}>
           {`${dateString} в ${timeString}`}
       </Text>
    );
}

module.exports = DateVisualizer
