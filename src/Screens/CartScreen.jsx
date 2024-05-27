import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { deleteItem } from '../Features/Cart/cartSlice';
import { usePostOrderMutation } from '../services/shopService';

const CartScreen = () => {
    const cart = useSelector(state => state.cart.value.cart);
    const total = useSelector(state => state.cart.value.total);
    const dispatch = useDispatch();


    const user = useSelector(state => state.auth.value.user)

    const [triggerPost, result] = usePostOrderMutation()

    const handleRemoveItem = (id) => {
        dispatch(deleteItem(id));
    };

    const handleConfirmPurchase = () => {
        triggerPost({total, cartItems: cart, user: user})
        alert('Compra confirmada');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.categoryTitle}>Productos en el carrito:</Text>
            <FlatList
                data={cart}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Image source={{ uri: item.thumbnail }} style={styles.itemImage} />
                        <View style={styles.itemInfo}>
                            <Text style={styles.itemTitle}>{item.title}</Text>
                            <Text style={styles.itemPrice}>Precio: ${item.price * item.quantity}</Text>
                            <Text>Cantidad: {item.quantity}</Text>
                        </View>
                        <TouchableOpacity 
                            style={styles.deleteButton}
                            onPress={() => handleRemoveItem(item.id)}
                        >
                            <Text style={styles.deleteButtonText}>Eliminar</Text>
                        </TouchableOpacity>
                    </View>
                )}
                keyExtractor={item => item.id.toString()}
            />
            <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Total del carrito: ${total}</Text>
            </View>
            <TouchableOpacity 
                style={styles.confirmButton}
                onPress={handleConfirmPurchase}
            >
                <Text style={styles.confirmButtonText}>Confirmar compra</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f5f5f5',
    },
    categoryTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    itemContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 20,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
        borderColor: '#ddd',
        borderWidth: 1,
        alignItems: 'center',
    },
    itemImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        resizeMode: 'cover',
        marginRight: 10,
    },
    itemInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemPrice: {
        fontSize: 14,
        color: 'gray',
        marginVertical: 5,
    },
    deleteButton: {
        backgroundColor: '#ff6347',
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    totalContainer: {
        marginTop: 20,
        padding: 10,
        borderTopWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    confirmButton: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    confirmButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CartScreen;
