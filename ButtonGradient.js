import React from "react";
import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ButtonGradient(){
    return (
    <TouchableOpacity style={styles.container}>
            <LinearGradient
                colors={['#4c669f', '#3b5998', '#192f6a']}
                start={{x: 1, y: 0}}
                end={{x: 0, y: 0}}
                style={styles.button}
            >
                <Text style={styles.text}>LOGIN</Text>
            </LinearGradient>
    </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: 200,
        marginTop: 60,
    },
    text: {
        fontSize: 14,
        color: '#fff',
        fontWeight: 'bold',
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
});