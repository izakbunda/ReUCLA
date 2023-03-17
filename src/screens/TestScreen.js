import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const asyncSignUp = async (userid) => {
    return await fetch("http://localhost:4000", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userid }),
    })
        .then((res) => res.json())
        .then((data) => {
            return data;
        })
        .catch((error) => {
            return error;
        });
};

const TestScreen = ({ props, resp }) => {
    const [test, setTest] = useState(null);

    const onPress = async () => {
        const resp = await asyncSignUp(userid);
        setTest(resp.userid);
    };

    return (
        <SafeAreaView style={{ marginTop: 100, marginLeft: 150 }}>
            <TouchableOpacity
                onPress={() => {
                    onPress;
                }}
            >
                <Text>POST REQUEST</Text>
                <View>{test ? <Text>{test}</Text> : null}</View>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({});

export default TestScreen;
