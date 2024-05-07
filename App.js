import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg"
import { ToastAndroid } from 'react-native';
import { supabase } from './lib/supabase';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native'; 
import Menu from './Menu';

const { width, height } = Dimensions.get('window');

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Menu" component={Menu} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const { data, error } = await supabase
        .from('Usuario')
        .select('*')
        .eq('CorreoElectronico', username)
        .eq('Contraseña', password)
        .single(); 
      
      if (error) {
        throw error;
      } else if (data) {
        console.log('Inicio de sesión exitoso:', data);
        ToastAndroid.show('Conexión exitosa', ToastAndroid.SHORT);
        navigation.navigate('Menu'); // Usa navigation para navegar a la pantalla Menu
      } else {
        console.log('Credenciales incorrectas');
        ToastAndroid.show('Credenciales incorrectas', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error.message);
    }
  }

  function SvgTop() {
    return (
      <Svg xmlns="http://www.w3.org/2000/svg" width={width} height={height * 1.2} fill="none" style={styles.svgBackground}>
        <Path fill="url(#a)" d={`M0 0h${width}v${height}H0z`} />
        <Defs>
          <LinearGradient id="a" x1={180} x2={180} y1={0} y2={height} gradientUnits="userSpaceOnUse">
            <Stop offset={0.03} stopColor="#00C2FF" />
            <Stop offset={0.82} stopColor="#94FF83" />
          </LinearGradient>
        </Defs>
      </Svg>
    );
  }

  return (
    <View style={styles.container}>
      <SvgTop/>
      <View style={styles.content}>
        <Text style={styles.titulo}>SALTILLO GAMING</Text>
        <Text style={styles.subtitulo}>Inicie sesión con su cuenta</Text>
        <TextInput 
          placeholder="Usuario" 
          style={styles.TextInput} 
          value={username} 
          onChangeText={text => setUsername(text)} 
        />
        <TextInput 
          placeholder="Contraseña" 
          style={styles.TextInput} 
          value={password} 
          onChangeText={text => setPassword(text)} 
          secureTextEntry={true} 
        />
        <TouchableOpacity onPress={handleLogin}>
          <Text style={styles.loginButton}>Iniciar Sesión</Text>
        </TouchableOpacity>
        <Text style={styles.forgotPassword}>Olvidó su contraseña</Text>
        <StatusBar style="auto" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  titulo: {
    fontSize: 40,
    color: '#34434D',
    fontWeight: 'bold',
  },
  subtitulo: {
    fontSize: 20,
    color: 'gray',
  },
  TextInput: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    width: '80%',
    height: 50,
    marginTop: 20,
    borderRadius: 30,
    backgroundColor: '#fff',
  },
  loginButton: {
    fontSize: 20,
    color: 'white',
    backgroundColor: '#34434D',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 20,
  },
  forgotPassword: {
    fontSize: 14,
    color: 'gray',
    marginTop: 20,
  },
  svgBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
  },
});
