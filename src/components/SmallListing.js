import React from "react";
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
} from "react-native";
import { Dim, Colors } from "../Constants";

const SmallListing = (props) => {
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
        marginRight: 10,
        borderRadius: 10,
        width: Dim.width * 0.4,
        height: Dim.width * 0.4,
    },
    textContainer: {
        backgroundColor: Colors.primary,
        width: Dim.width * 0.4 - 3,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        position: "absolute",
        top: 110,
        left: 0,
        right: 0,
        bottom: 0,
    },
    text: {
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontWeight: "bold",
        position: "absolute",
        top: 6,
        left: 10,
        right: 0,
        bottom: 0,
    },
    price: {
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontWeight: "bold",
        position: "absolute",
        top: 22,
        left: 10,
        right: 0,
        bottom: 0,
    },
    listingPhoto: {
        borderRadius: 10,
        width: Dim.width * 0.4 - 3,
        height: Dim.width * 0.4 - 3,
    },
});

export default SmallListing;
