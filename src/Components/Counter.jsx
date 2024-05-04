import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrease, increment, incrementByAmount, resetAmount } from "../Features/Counter/CounterSlice";


const Counter = () => {
    
    const count  =  useSelector(state => state.counter.value);
    const [amount, setAmount] = useState(0);
    const dispatch = useDispatch();

    return (
        <View style={styles.container}>
            <View style={styles.buttonsContainer}>
                <Pressable 
                    style={styles.button}
                    onPress={ () => dispatch(decrease())}
                >
                    <Text style={styles.buttonText}>-</Text>
                </Pressable>
                <Text style={styles.span}>{count}</Text>
                <Pressable 
                    style={styles.button}
                    onPress={ () => dispatch(increment())}
                >
                    <Text style={styles.buttonText}>+</Text>
                </Pressable>
            </View>
            <View style={styles.buttonsContainer}>
                <TextInput
                    placeholder="Cantidad a aumentar"
                    style={styles.spanInput}
                    onChangeText={ (e) => setAmount(e) }
                    
                />
                <Pressable 
                    style={styles.button}
                    onPress={ () => dispatch(incrementByAmount(Number(amount))) } 
                >
                    <Text style={styles.buttonText} >Add</Text>
                </Pressable>
            </View>
            <Pressable 
                style={styles.button}
                onPress={() => dispatch(resetAmount())}
            >
                <Text style={styles.buttonText}>Reset</Text>
            </Pressable>
        </View>
    );
};

export default Counter;

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        
        padding: 10,
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },
    button: {
        padding: 10,
    },
    span: {
        width: "60%",
        padding: 10,
        textAlign: "center",
        fontSize: 20,
    },
    spanInput: {
        width: "60%",
        padding: 10,
        textAlign: "center",
        fontSize: 16,
    },
    buttonText: {
        fontSize: 18,
        fontFamily: "Josefin",
    }
})
    