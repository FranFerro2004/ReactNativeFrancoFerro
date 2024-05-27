import React, { useState } from 'react';
import { Pressable, View, Text, Image, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as ImagePicker from "expo-image-picker";
import { setCameraImage } from '../Features/User/userSlice';
import { usePostProfileImageMutation } from '../services/shopService';

const ImageSelector = ({ navigation }) => {
    const [image, setImage] = useState(null);

    const [triggerPostImage, result] = usePostProfileImageMutation();

    const {localId} = useSelector(state => state.auth.value)

    const dispatch = useDispatch();

    const verifyCameraPermissions = async () => {
        const {granted} = await ImagePicker.requestCameraPermissionsAsync()
        return granted
    };

    const pickImage = async () => {
        try{
                const isCameraOk = await verifyCameraPermissions()
                if (isCameraOk) {
                let result = await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    allowsEditing: true,
                    aspect: [1, 1],
                    base64: true,
                    quality: 0.2    
                })
                
                if (!result.canceled){
                    const image = `data:image/jpeg;base64,${result.assets[0].base64}`
                    setImage(image)
                }
            }
        }catch(error){
            
        }
        
    };

    const confirmImage = async () => {
        try {
            dispatch(setCameraImage(image))
            triggerPostImage({image, localId})
            navigation.goBack() 
        } catch (error) {
            
        }
    };

    return (
        <View style={styles.container}>
            {image ? (
                <>
                    <Image source={{ uri: image }} style={styles.image} />
                    <Pressable style={styles.button} onPress={pickImage}>
                        <Text style={styles.buttonText}>Take another photo</Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress={confirmImage}>
                        <Text style={styles.buttonText}>Confirm Photo</Text>
                    </Pressable>
                </>
            ) : (
                <>
                    <View style={styles.noImageContainer}>
                        <Text style={styles.noImageText}>No photo to show..</Text>
                    </View>
                    <Pressable style={styles.button} onPress={pickImage}>
                        <Text style={styles.buttonText}>Take a Photo</Text>
                    </Pressable>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
    },
    noImageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    noImageText: {
        fontSize: 18,
        color: 'gray',
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default ImageSelector;
