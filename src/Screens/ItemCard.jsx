import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Counter from '../Components/Counter';
import { addItem } from '../Features/Cart/cartSlice';
import { useGetProductByIdQuery } from '../services/shopService';

const ItemCard = ({ navigation, route }) => {
    const quantity = useSelector(state => state.counter.value);
    const dispatch = useDispatch();
    const { itemIdToShow } = route.params;

    const { data, isLoading, error } = useGetProductByIdQuery(itemIdToShow);

    console.log("Item:", data)

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.card}>
                <Text>Error al obtener el producto</Text>
            </View>
        );
    }

    if (!data) {
        return (
            <View style={styles.card}>
                <Text>No se encontró el producto</Text>
            </View>
        );
    }

    return (
        <View style={styles.card}>
            <Image source={{ uri: data.thumbnail }} style={styles.image} />
            <View style={styles.content}>
                <Text style={styles.title}>{data.title}</Text>
                <Text style={styles.price}>${data.price}</Text>
                <Text>{data.description}</Text>

                <Counter />

                <Pressable 
                    style={styles.button}
                    onPress={() => dispatch(addItem({ id: data.id, title: data.title, price: data.price, thumbnail: data.thumbnail, quantity }))}
                >
                    <Text>Añadir al Carrito</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'column',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        height: '100%',
        width: '100%',
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        resizeMode: 'cover',
    },
    content: {
        marginLeft: 10,
        marginTop: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 14,
        color: '#888',
    },
    button: {
        marginTop: 10,
        backgroundColor: '#ff6347',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default ItemCard;
