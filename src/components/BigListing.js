import React from "react";
import {
    View,
    StyleSheet,
    Text,
    Image,
    Touchable,
    TouchableOpacity,
} from "react-native";
import { Dim, Colors } from "../Constants";

/*
  -- DOCUMENTATION --
*/
const BigListing = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={styles.container}>
                <Image
                    source={{
                        uri: props.listingPhoto,
                    }}
                    style={styles.listingPhoto}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{props.listingName}</Text>
                    <Text style={styles.price}>${props.listingPrice}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 5,
        marginLeft: 5,
        borderRadius: 10,
        width: Dim.width * 0.48,
        height: Dim.width * 0.48,
    
    },
    textContainer: {
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        position: "absolute",
        top: 110,
        left: 5,
        right: 0,
        bottom: 0,
    },
    text: {
        color: "white",
        fontWeight: "bold",
        position: "absolute",
        fontSize: 15,
        top: 45,
        left: 10,
    },
    price: {
        color: "white",
        fontWeight: "bold",
        position: "absolute",
        fontSize: 15,
        top: 30,
        left: 10,
    },
    listingPhoto: {
        borderRadius: 10,
        width: Dim.width * 0.48,
        height: Dim.width * 0.48,
    },
});

export default BigListing;