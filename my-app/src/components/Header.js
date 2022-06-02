import React from 'react'
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native'
import Flag from './Flag'

export default props => {
    return (
        <View style={styles.container}>
            <View styles={styles.flagContainer}>
                <TouchableOpacity onPress={props.onFlagPress}>
                    <Flag bigger/>
                </TouchableOpacity>
                <Text style={styles.flagsLeft}>= {props.flagsLeft}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={props.onNewGame}>
                <Text style={styles.buttonText}>Novo Jogo</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = stylesheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#EEE',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    flagContainer: {
        flexDirection: 'row',
    },
    flagButton:{
        marginTop: 10,
        minWidth: 30
    },
    flagsLeft:{
        fontSize: 30,
        fontWeight: 'bold',
        paddingTop: 5,
        marginLeft: 20,
    },
    button: {
        backgroundColor: '#999',
    },
    buttonLabel:{
        fontSize: 20,
        color: '#ddd',
        fontWeight: 'bold'
    }
})