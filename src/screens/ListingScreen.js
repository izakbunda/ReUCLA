import React from "react";
import { View, StyleSheet, Image, Text, SafeAreaView } from "react-native";
import { Colors, Dim } from "../Constants";
import Icon from "react-native-vector-icons/Feather";
import { ScrollView } from "react-native";

/*
  -- DOCUMENTATION --
*/
const ListingScreen = ({ navigation, route }) => {
    const { title, price, description, condition, category, photoPath } =
        route.params;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.headerContainer}>
                    <Icon
                        name={"arrow-left"}
                        size={28}
                        color={"#2F6B25"}
                        onPress={() => navigation.goBack()}
                        style={styles.icon}
                    />
                    <Text style={styles.header}> {title} </Text>
                </View>
                <View style={styles.container}>
                    <Image
                        source={{
                            uri: photoPath,
                        }}
                        style={{
                            height: Dim.width * 0.9,
                            width: Dim.width * 0.9,
                            borderRadius: 10,
                            marginBottom: 20,
                        }}
                    />
                    <Text style={styles.header2}>{title}</Text>
                    <View
                        style={{
                            marginBottom: 15,
                            flexDirection: "row",
                            paddingBottom: 10,
                        }}
                    >
                        <View style={styles.fields}>
                            <Text
                                style={{
                                    color: "white",
                                    fontSize: 18,
                                    padding: 15,
                                    fontWeight: "bold",
                                }}
                            >
                                {"$" + price}
                            </Text>
                        </View>
                        <View style={styles.fields}>
                            <Text
                                style={{
                                    color: "white",
                                    padding: 15,
                                    fontSize: 18,
                                    fontWeight: "bold",
                                }}
                            >
                                {condition == 1
                                    ? "😄"
                                    : condition == 2
                                    ? "😐"
                                    : condition == 3
                                    ? "🙁"
                                    : null}
                            </Text>
                        </View>
                        <View style={styles.fields}>
                            <Text
                                style={{
                                    color: "white",
                                    padding: 15,
                                    fontWeight: "bold",
                                    fontSize: 18,
                                }}
                            >
                                {category}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.bioContainer}>
                        <Text style={styles.bio}>{description}</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: "white",
        // flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    container: {
        backgroundColor: "white",
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        marginTop: 10,
    },
    icon: {
        position: "absolute",
        left: 20,
    },
    header: {
        fontSize: 20,
        fontWeight: "bold",
        paddingVertical: 10,
    },
    header2: {
        fontSize: 30,
        fontWeight: "bold",
        paddingVertical: 10,
        paddingBottom: 20,
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
        paddingVertical: 10,
    },
    bioContainer: {
        // marginTop: 20,
        width: Dim.width * 0.9,
        borderColor: "#2F6B25",
        borderWidth: 1,
        borderRadius: 10,
        padding: 17,
    },
    bio: {
        textAlign: "center",
        fontSize: 17,
    },
    fields: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 10,
        borderRadius: 10,
        marginHorizontal: 10,
        fontSize: 18,
    },
});

export default ListingScreen;