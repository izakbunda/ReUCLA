import React from "react";
<<<<<<< HEAD
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
} from "react-native";
import { Dim, Colors } from "../Constants";

const Button = (props) => {
    return (
        <TouchableOpacity onPress={ props.onPress }>
            <View style={styles.button}>
                <Text style={styles.text}>
                    {props.product}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.primary,
        width: Dim.width * 0.45,
        height: 40,
        borderRadius: 10,
        marginBottom: 5,
        marginRight: 7,
        justifyContent: "center",
    },
    text: {
        textAlign: "center",
        color: "white",
        fontWeight: "bold",
        fontSize: 15,
      }
})

export default Button;
=======
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Colors, Dim } from "../Constants";

/*
  -- DOCUMENTATION --
*/
const Button = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View
                style={{
                    ...props.style,
                    width: Dim.width * 0.5,
                    borderRadius: 10,
                    backgroundColor: Colors.primary,
                }}
            >
                <Text
                    style={{
                        padding: 15,
                        fontSize: 16,
                        color: "white",
                        textAlign: "center",
                    }}
                >
                    {props.title}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({});

export default Button;
>>>>>>> main
