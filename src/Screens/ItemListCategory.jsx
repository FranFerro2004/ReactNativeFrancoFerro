import React from 'react'
import { useState, useEffect } from 'react'
import { View, Text, FlatList, Image, StyleSheet } from 'react-native'
import ItemsInfo from '../data/ItemsInfo.json'

const ItemListCategory = ({ route }) => {
    const { category } = route.params;

    const [filteredItems, setFilteredItems] = useState([])
    
    useEffect(() => {
        if (category === "all") {
            setFilteredItems(ItemsInfo);
        } else {
            const categories = ItemsInfo.filter(item => item.category === category);
            setFilteredItems(categories);
        }
    }, [category]);
    
    

    return (
        <View style={styles.container}>
            <Text style={styles.categoryTitle}>Productos de la categoría: {category}</Text>
            <FlatList
                data={filteredItems}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Image source={{ uri: item.thumbnail }} style={styles.itemImage} />
                        <Text style={styles.itemTitle}>{item.title}</Text>
                        <Text style={styles.itemPrice}>Precio: ${item.price}</Text>
                    </View>
                )}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    )
}

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

export default ItemListCategory
