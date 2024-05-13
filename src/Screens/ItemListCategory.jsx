import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { itemIdSelected } from '../Features/Shop/shopSlice';
import { useDispatch } from 'react-redux';
import { useGetProductsByCategoryQuery } from '../services/shopService';

const ItemListCategory = ({ navigation, route }) => {
    const { category } = route.params;

    const dispatch = useDispatch();

    const { data: fetchedItems, isLoading } = useGetProductsByCategoryQuery(category);

    const [filteredItems, setFilteredItems] = useState([]);

    useEffect(() => {
        if (!isLoading && fetchedItems) {
            setFilteredItems(fetchedItems);
        }
    }, [isLoading, fetchedItems]);

    const handleItemCard = (id) => {
        dispatch(itemIdSelected(id));
        navigation.navigate('ItemCard', { itemIdToShow: id });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.categoryTitle}>Productos de la categoría: {category}</Text>
            <FlatList
                data={filteredItems}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.itemContainer}
                        onPress={() => handleItemCard(item.id)}
                    >
                        <Image source={{ uri: item.thumbnail }} style={styles.itemImage} />
                        <Text style={styles.itemTitle}>{item.title}</Text>
                        <Text style={styles.itemPrice}>Precio: ${item.price}</Text>
                    </TouchableOpacity>
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

export default ItemListCategory;
