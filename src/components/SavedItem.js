import React from "react";
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    Alert,
} from "react-native";
import { Dim, Colors } from "../Constants";
import Icon from "react-native-vector-icons/Feather";

const SavedItem = (props) => {
    return props.saved ? (
        <TouchableOpacity onPress={props.onPress}>
            <View style={styles.container}>
                <Image
                    source={{
                        uri: props.listingPhoto,
                    }}
                    style={styles.listingPhoto}
                />
                <View style={styles.soldContainer}>
                    {props.sold ? <Text style={styles.sold}>SOLD</Text> : null}
                </View>
                <View style={styles.savedContainer}>
                    {props.saved ? (
                        <TouchableOpacity onPress={() => Alert.alert("Unsave")}>
                            <Icon
                                name={"bookmark"}
                                size={30}
                                color={Colors.error}
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                    ) : null}
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.text}>{props.listingName}</Text>
                    <Text style={styles.price}>${props.listingPrice}</Text>
                </View>
            </View>
        </TouchableOpacity>
    ) : null;
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
        borderRadius: 10,
        width: Dim.width * 0.9,
        height: Dim.width * 0.8,
    },
    listingPhoto: {
        borderRadius: 10,
        width: Dim.width * 0.9,
        height: Dim.width * 0.8,
    },
    textContainer: {
        backgroundColor: Colors.primary,
        width: Dim.width * 0.9,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        position: "absolute",
        top: 260,
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

    soldContainer: {
        position: "absolute",
        top: 10,
        left: 10,
    },
    savedContainer: {
        position: "absolute",
        top: 10,
        right: 10,
    },
    sold: {
        color: "white",
        fontWeight: "bold",
        fontSize: 13,
        padding: 3,
        backgroundColor: Colors.error,
    },
});

export default SavedItem;
