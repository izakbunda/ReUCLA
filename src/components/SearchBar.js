import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";


const SearchBar = () => {
    return (
        <View style={styles.container}>
            <Icon
                name={"search"}
                size={20}
                color={"#2F6B25"}
                style={styles.icon}
            />
            <TextInput 
                placeholder="Search for..."
                // style={styles.input}
                style={{ flex: 1 }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        height: 40,
        borderRadius: 10,
        width: 270
    },
    icon: {
        paddingLeft: 10,
        paddingRight: 10,
        resizeMode: 'stretch',
        alignItems: 'center',
    }
})

export default SearchBar;