import React from "react";
import { View, StyleSheet, Text } from "react-native";

/*
  -- DOCUMENTATION --
*/

const HomeScreen = (props) => {
    return (
        <View>
            <Text style={{ color: "red", paddingTop: 90 }}>
                Hello! You're Home!
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({});

export default HomeScreen;
