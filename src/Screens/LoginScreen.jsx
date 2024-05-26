import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Pressable } from 'react-native';
import { setUser } from '../Features/User/userSlice';
import { useSignInMutation } from '../services/authService';
import { insertSession } from '../persistence';

const LoginScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const [triggerSignIn, result] = useSignInMutation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    useEffect(() => {
        if (result.isSuccess && result.data) {
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
    }, [result]);

    const onSubmit = () => {
        triggerSignIn({ email, password });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Iniciar Sesión</Text>
            <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={onSubmit}>
                <Text style={styles.buttonText}>Ingresar</Text>
            </TouchableOpacity>
            {result.isLoading && <ActivityIndicator size="large" color="#0000ff" />}
            {result.isError && <Text style={styles.errorText}>Error al iniciar sesión. Intente nuevamente.</Text>}
            
            <Pressable onPress={() => navigation.navigate("SignUp")}>
                    <Text>Sign up</Text>
            </Pressable>
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
        marginTop: 16,
    },
});

export default LoginScreen; 

