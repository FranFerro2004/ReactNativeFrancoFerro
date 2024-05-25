import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { useGetProfileImageQuery } from '../services/shopService';

const MyProfileScreen = ({ navigation }) => {
    
    const {imageCamera, localId} = useSelector(state => state.auth.value)
    
    const {data: imageFromBase} = useGetProfileImageQuery(localId)
    

    return (
        <View style={styles.container}>
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
