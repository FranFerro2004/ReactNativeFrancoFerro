import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useSingUpMutation } from '../services/authService';
import { setUser } from '../Features/User/userSlice';
import { insertSession } from '../persistence';

const SignUpScreen = () => {
    const [email, setEmail] = useState("");
    const [errorMail, setErrorMail] = useState("");
    const [password, setPassword] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorConfirmPassword, setErrorConfirmPassword] = useState("");

    const dispatch = useDispatch();
    const [triggerSignUp, result] = useSingUpMutation();

    useEffect(() => {
        if (result.isSuccess) {
            insertSession({
                email: result.data.email,
                localId: result.data.localId,
                token: result.data.idToken,
            })
                .then((response) => {
                    dispatch(
                    setUser({
                        email: result.data.email,
                        idToken: result.data.idToken,
                        localId: result.data.localId,
                    })
                );})
            
        }
    }, [result, dispatch]);

    const onSubmit = () => {
        setErrorMail("");
        setErrorPassword("");
        setErrorConfirmPassword("");
        
        if (!email) {
            setErrorMail("Correo electrónico es obligatorio");
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setErrorMail("Correo electrónico no válido");
            return;
        }
        if (!password) {
            setErrorPassword("Contraseña es obligatoria");
            return;
        }
        if (password.length < 6) {
            setErrorPassword("La contraseña debe tener al menos 6 caracteres");
            return;
        }
        if (password !== confirmPassword) {
            setErrorConfirmPassword("Las contraseñas deben coincidir");
            return;
        }

        triggerSignUp({ email, password, returnSecureToken: true });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registrarse</Text>
            <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            {errorMail ? <Text style={styles.errorText}>{errorMail}</Text> : null}
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            {errorPassword ? <Text style={styles.errorText}>{errorPassword}</Text> : null}
            <TextInput
                style={styles.input}
                placeholder="Confirmar contraseña"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />
            {errorConfirmPassword ? <Text style={styles.errorText}>{errorConfirmPassword}</Text> : null}
            <TouchableOpacity style={styles.button} onPress={onSubmit}>
                <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>
            {result.isLoading && <ActivityIndicator size="large" color="#0000ff" />}
            {result.isError && <Text style={styles.errorText}>Error al registrarse. Intente nuevamente.</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        padding: 8,
        marginBottom: 16,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        marginTop: 5,
        textAlign: 'center',
    },
});

export default SignUpScreen;
