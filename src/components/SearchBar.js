import React from "react";
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { Dim } from "../Constants";

const SearchBar = (props) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={props.onPressSearch}>
                <Icon
                    name={"search"}
                    size={20}
                    color={"#2F6B25"}
                    style={styles.icon}
                />
            </TouchableOpacity>

            <TextInput
                placeholder="Search for..."
                // style={styles.input}
                value={props.value}
                onChangeText={props.onChangeText}
                style={{ flex: 1, fontSize: 15 }}
                autoCapitalize={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        height: 50,
        borderRadius: 10,
        width: Dim.width * 0.73,
    },
    icon: {
        paddingLeft: 10,
        paddingRight: 10,
        resizeMode: "stretch",
        alignItems: "center",
    },
});

export default SearchBar;
