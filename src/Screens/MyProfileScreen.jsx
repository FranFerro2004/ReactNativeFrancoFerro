import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useGetProfileImageQuery } from '../services/shopService';
import { truncateSessionsTable } from '../persistence';
import { clearUser } from '../Features/User/userSlice';

const MyProfileScreen = ({ navigation }) => {
    const dispatch = useDispatch();

    const {imageCamera, localId} = useSelector(state => state.auth.value)
    
    const {data: imageFromBase} = useGetProfileImageQuery(localId)
    
    const cerrarSesion = async () => {
        try {
            if (Platform.OS !== 'web'){
                const response =  await truncateSessionsTable();
                dispatch(clearUser())
            }
        } catch (error) {
            
        }
    }

    return (
        <View style={styles.container}>
            <Button title="Cerrar Session" onPress={cerrarSesion} />
            
            { imageFromBase || imageCamera ? (
                <Image source={{ uri: imageFromBase?.image || imageCamera }} style={styles.profileImage} />
            ) : (
                <Text style={styles.noImageText}>No existe foto de perfil</Text>
            )}
            
            <Button title="Cambiar foto de perfil" onPress={() => navigation.navigate("Picture Select")} />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
    },
    noImageText: {
        marginBottom: 20,
        fontSize: 18,
        color: 'gray',
    },
});

export default MyProfileScreen;
