import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const CartScreen = () => {
    const cart = useSelector(state => state.cart.cart);

    return (
        <View style={styles.container}>
            <Text style={styles.categoryTitle}>Productos en el carrito:</Text>
            <FlatList
                data={cart}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        style={styles.itemContainer}
                    >
                        <Image source={{ uri: item.thumbnail }} style={styles.itemImage} />
                        <Text style={styles.itemTitle}>{item.title}</Text>
                        <Text style={styles.itemPrice}>Precio: ${item.price}</Text>
                        <Text>Cantidad: {item.quantity}</Text>
                    </TouchableOpacity >
                )}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    categoryTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    itemContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    itemImage: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        marginBottom: 10,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemPrice: {
        fontSize: 14,
        color: 'gray',
    },
});

export default CartScreen;
