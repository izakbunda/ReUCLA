import React from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import { Colors } from "../Constants";
import Icon from "react-native-vector-icons/Feather";
import { Dim } from "../Constants";

const AddListingPhoto = (props) => {
    return (
        <View style={{ width: Dim.width * 0.8 }}>
            <Text style={styles.inputTitle}>Add Photo</Text>

            <View
                style={{
                    flexDirection: "row",
                    marginTop: 15,
                }}
            >
                {props.imagePicked ? (
                    <Image
                        source={{ uri: props.image }}
                        style={{
                            height: Dim.width * 0.8,
                            width: Dim.width * 0.8,
                            borderRadius: 10,
                            marginBottom: 20,
                        }}
                    />
                ) : (
                    <TouchableOpacity onPress={props.onPress}>
                        <View
                            style={{
                                ...props.style,
                                borderColor: Colors.primary,
                                borderWidth: 2,
                                borderRadius: 10,
                                height: Dim.width * 0.8,
                                width: Dim.width * 0.8,
                                marginRight: 3,
                            }}
                        >
                            <Icon
                                style={{
                                    position: "absolute",
                                    top: Dim.width * 0.36,
                                    left: Dim.width * 0.36,
                                    right: 0,
                                    bottom: 0,
                                }}
                                name={"plus"}
                                size={24}
                                color={Colors.primary}
                            />
                        </View>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    inputTitle: {
        marginTop: 4,
        fontSize: 15,
        color: Colors.darkGray,
        textAlign: "left",
    },
});

export default AddListingPhoto;
