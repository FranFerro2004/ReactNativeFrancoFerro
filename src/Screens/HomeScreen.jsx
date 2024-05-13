import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import ItemsCategories from '../data/ItemsCategories.json';
import { useDispatch } from 'react-redux';
import { setCatergorySelected } from '../Features/Shop/shopSlice';
import { useGetCategoriesQuery } from '../services/shopService';

const HomeScreen = ({ navigation }) => {
    const { data: categories, error, isLoading } = useGetCategoriesQuery();

    const dispatch = useDispatch();

    const handleSetCategory = (item) => {
        dispatch(setCatergorySelected(item));
        navigation.navigate('ItemList', { category: item });
    };

    if (error) {
        Alert.alert('Error', 'Ha ocurrido un error al cargar las categorías.');
        return null;
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={categories} 
                keyExtractor={(index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.categoryItem}
                        onPress={() => handleSetCategory(item)}
                    >
                        <Text style={styles.categoryText}>{item}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 15,
        paddingBottom: 15,
    },
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryItem: {
        flex: 1,
        marginVertical: 3,
        marginHorizontal: 3,
        padding: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    categoryText: {
        fontSize: 16,
        textAlign: 'center',
    },
});

export default HomeScreen;
