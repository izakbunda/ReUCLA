import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Colors, Dim } from "../Constants";

/*
  -- DOCUMENTATION --
*/
const Button = (props) => {
    return props.small ? (
        <TouchableOpacity onPress={props.onPress}>
            <View
                style={{
                    ...props.style,
                    width: Dim.width * 0.368,
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
    ) : props.unselected ? (
        <TouchableOpacity onPress={props.onPress}>
            <View
                style={{
                    ...props.style,
                    width: Dim.width * 0.368,
                    borderRadius: 10,
                    backgroundColor: "white",
                    borderColor: Colors.primary,
                    borderWidth: 2,
                }}
            >
                <Text
                    style={{
                        padding: 15,
                        fontSize: 16,
                        color: Colors.primary,
                        textAlign: "center",
                    }}
                >
                    {props.title}
                </Text>
            </View>
        </TouchableOpacity>
    ) : (
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
