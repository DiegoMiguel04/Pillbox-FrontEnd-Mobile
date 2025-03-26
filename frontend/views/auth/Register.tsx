import React, { useState } from 'react';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../../../types';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image, Platform } from 'react-native';

const Register = () => {
const ipPC = "192.168.6.253"
const [name, setName] = useState('');
const [lastname, setLastName] = useState('');
const [email, setEmail] = useState('');
const [phone, setPhone] = useState('');
const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const [errorMessage, setErrorMessage] = useState('');
const navigation = useNavigation<NavigationProps>();

const [fontsLoaded] = useFonts({ 'Montserrat-VariableFont_wght': require('../../../assets/fonts/Montserrat-VariableFont_wght.ttf') });

const handleRegister = async () => {
	const url = `http://${ipPC}:3000/register`;
	let errors = [];

	if (!name.trim()) { errors.push('* El nombre es obligatorio'); }
	if (!lastname.trim()) { errors.push('* El apellido es obligatorio'); }
	if (!email.trim()) { errors.push('* El correo electrónico es obligatorio'); }
	if (errors.length > 0) { setErrorMessage(errors.join('\n')); return; }

	const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

	if (!emailPattern.test(email)) { errors.push('* El correo electrónico no tiene un formato válido'); }

	const response = await fetch(`http://${ipPC}:3000/check-email/${email}`);
	const emailData = await response.json();

	if (emailData.exists) { errors.push('* El correo electrónico ya está registrado'); }
	if (!phone.trim()) { errors.push('* El teléfono es obligatorio'); }
	if (!/^\d{10}$/.test(phone)) { errors.push('* El teléfono debe tener 10 caracteres numéricos'); }
	if (!password.trim()) { errors.push('* La contraseña es obligatoria'); }
	if (!confirmPassword.trim()) { errors.push('* La confirmación de la contraseña es obligatoria'); }
	if (password !== confirmPassword) { errors.push('* Las contraseñas no coinciden'); }
	if (errors.length > 0) { setErrorMessage(errors.join('\n')); return; }

	try {
	const response = await fetch(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ name, lastname, email, phone, password }),
	});
	const data = await response.json();
	if (response.ok) {
		setErrorMessage('');
		navigation.navigate('login', { userId: data.userId });
	} else {
		setErrorMessage(data.message);
		setTimeout(() => setErrorMessage(''), 3000);
	}
	} catch (error) {
		console.error('Error:', error);
		setErrorMessage('* Hubo un problema al procesar la solicitud');
	}
};

return (
	<View style={styles.container}>
		<View style={styles.rightContainer}>
			<Image source={ require('../../../assets/background-gradient.jpg') } style={styles.image} />
		</View>
		<View style={styles.formContainer}>
				<Text style={styles.title}>Registrarse</Text>
				{errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
				<TextInput placeholder='Nombre' style={styles.input} value={name} onChangeText={setName} />
				<TextInput placeholder='Apellido' style={styles.input} value={lastname} onChangeText={setLastName} />
				<TextInput placeholder='Correo Electrónico' style={styles.input} keyboardType="email-address" autoCapitalize="none" autoCorrect={false} value={email} onChangeText={setEmail} />
				<TextInput placeholder='Teléfono' style={styles.input} keyboardType="numeric" value={phone} onChangeText={setPhone} />
				<TextInput placeholder='Contraseña' secureTextEntry style={styles.input} value={password} onChangeText={setPassword} />
				<TextInput placeholder='Confirmar Contraseña' secureTextEntry style={styles.input} value={confirmPassword} onChangeText={setConfirmPassword} />
				<TouchableOpacity style={styles.button} onPress={handleRegister}>
					<Text style={styles.textButton}>Registrarse</Text>
				</TouchableOpacity>
				<View style={styles.containerAnchors}>
					<Text>¿Ya tienes una cuenta? </Text>
					<TouchableOpacity onPress={() => navigation.navigate('login')}>
						<Text style={styles.linkText}>Iniciar sesión</Text>
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
		marginTop: -100
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
		fontFamily: 'Montserrat-VariableFont_wght'
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

export default Register;