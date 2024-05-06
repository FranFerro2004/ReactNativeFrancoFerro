import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ItemsInfo from '../data/ItemsInfo.json';
import Counter from '../Components/Counter';
import { addItem } from '../Features/Cart/cartSlice';

const ItemCard = ({ navigation, route }) => {
    const quantity = useSelector(state=> state.counter.value);

    const dispatch = useDispatch();

    const { itemIdToShow } =  route.params;

    useEffect(() => {
        console.log(itemIdToShow);
    }, []);

    const product = ItemsInfo.find(item => item.id === itemIdToShow);

    if (!product) {
        return (
            <View style={styles.card}>
                <Text>No se encontró el producto</Text>
            </View>
        );
    };

    return (
        <View style={styles.card}>
            <Image source={{ uri: product.thumbnail }} style={styles.image} />
            <View style={styles.content}>
                <Text style={styles.title}>{product.title}</Text>
                <Text style={styles.price}>{product.price}</Text>
                <Text>{product.description}</Text>

                <Counter/>

                <Pressable 
                style={styles.button}
                onPress={() => dispatch(addItem({ id: product.id, title: product.title, price: product.price, thumbnail: product.thumbnail, quantity: quantity}))}
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
    }
});

export default ItemCard;
