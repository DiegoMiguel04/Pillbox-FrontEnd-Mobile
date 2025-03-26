import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../../../types';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image, Platform } from 'react-native';

const Login = () => {
const ipPC = "192.168.6.253"
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [errorMessage, setErrorMessage] = useState('');
const navigation = useNavigation<NavigationProps>();

const handleLogin = async () => {
let errors = [];

if (!email.trim()) {
	errors.push('* El correo electrónico es obligatorio');
}
if (!password.trim()) {
	errors.push('* La contraseña es obligatoria');
}

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
if (email && !emailPattern.test(email)) {
	errors.push('* El correo electrónico no tiene un formato válido');
}

const response = await fetch(`http://${ipPC}:3000/check-email/${email}`);
const emailData = await response.json();
if (!emailData.exists) {
	errors.push('* El correo electrónico no está registrado');
}

if (errors.length > 0) {
	setErrorMessage(errors.join('\n'));
	return;
}

const loginResponse = await fetch(`http://${ipPC}:3000/login`, {
	method: 'POST',
	headers: { 'Content-Type': 'application/json' },
	body: JSON.stringify({ email, password }),
});

const loginData = await loginResponse.json();

if (loginResponse.ok) {
	setErrorMessage('');
	navigation.navigate('home', { userId: loginData.userId });
} else {
	setErrorMessage(loginData.message);
	setTimeout(() => setErrorMessage(''), 3000);
}
};

return (
	<View style={styles.container}>
    <View style={styles.rightContainer}>
			<Image source={ require('../../../assets/background-gradient.jpg') } style={styles.image} />
		</View>
		{/* <View style={styles.leftContainer}></View> */}
		<View style={styles.formContainer}>
			<Text style={styles.title}>Iniciar Sesión</Text>
			{errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
			<TextInput
			placeholder="Correo Electrónico"
			style={styles.input}
			keyboardType="email-address"
			autoCapitalize="none"
			autoCorrect={false}
			value={email}
			onChangeText={setEmail}
			/>
			<TextInput
			placeholder="Contraseña"
			secureTextEntry
			style={styles.input}
			value={password}
			onChangeText={setPassword}
			/>
			<TouchableOpacity style={styles.button} onPress={handleLogin}>
			<Text style={styles.textButton}>Iniciar sesión</Text>
			</TouchableOpacity>
			<View style={styles.containerAnchors}>
				<Text>¿No tienes una cuenta? </Text>
				<TouchableOpacity onPress={() => navigation.navigate('register')}>
					<Text style={styles.linkText}>Registrarse</Text>
				</TouchableOpacity>
			</View>
		</View>
	</View>
	);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: Platform.OS === 'web' ? 'row' : 'column',
  },
  leftContainer: {
    flex: 1,
    backgroundColor: '#97d6ff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    position: 'relative'
  },
  rightContainer: {
    flex: 1,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
	zIndex: 1
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  formContainer: {
    width: Platform.OS === 'web' ? 400 : 320,
    padding: 30,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -160 }, { translateY: -200 }],
	  zIndex: 10
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  button: {
    backgroundColor: '#000',
    borderRadius: 20,
    marginTop: 20,
    padding: 10,
    alignItems: 'center',
  },
  textButton: {
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  containerAnchors: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  linkText: {
    fontSize: 13,
    color: '#595959',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    fontSize: 14,
  },
});


export default Login;