import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput as RN_TextInput } from "react-native";
import { Dim, Colors } from "../Constants";

/*
  -- DOCUMENTATION --
*/
const TextInput = (props) => {
    return (
        <View>
            <Text style={styles.inputTitle}>{props.title}</Text>
            <RN_TextInput
                placeholder={props.placeholder}
                onChangeText={props.setText}
                value={props.text}
                secureTextEntry={props.isPassword}
                autoComplete={props.autoComplete}
                autoCorrect={props.autoCorrect}
                clearButtonMode="always"
                style={styles.inputStyle}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputStyle: {
        height: 50,
        width: Dim.width * 0.8,
        margin: 12,
        padding: 10,
        backgroundColor: Colors.lightGray,
        borderRadius: 10,
    },
    inputTitle: {
        marginLeft: 20,
        marginTop: 4,
        fontSize: 15,
        color: Colors.darkGray,
        textAlign: "left",
    },
});

export default TextInput;
