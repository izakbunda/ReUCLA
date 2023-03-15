import React from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dim } from "../Constants";
import SavedItem from "../components/SavedItem";
import Icon from "react-native-vector-icons/Feather";
// import { Alert } from "react-native";
/*
  -- DOCUMENTATION --
*/

const savedData = [
    {
        listingPhoto:
            "https://www.etsy.com/img/13961967/r/il/a150c5/3045227226/il_570xN.3045227226_4gag.jpg",
        listingPrice: 10,
        listingName: "magic pants",
        listingDescription: "these are pants!",
        category: ["clothing", "menswear", "bottoms"],
        condition: 1,
        sold: 1,
        saved: 1,
    },
    {
        listingPhoto:
            "https://i.etsystatic.com/6071918/r/il/168482/1159433180/il_1588xN.1159433180_p347.jpg",
        listingPrice: 7,
        listingName: "vintage shirt",
        listingDescription: "these are from the 90s!",
        category: ["clothing", "menswear", "tops"],
        condition: 1,
        sold: 0,
        saved: 0,
    },
    {
        listingPhoto:
            "https://i.ebayimg.com/images/g/KyAAAOSwaaphBavz/s-l1600.jpg",
        listingPrice: 20,
        listingName: "lava lamp",
        listingDescription:
            "I got scared of lava lamps, so I don't use anymore!",
        category: ["homegoods", "bedroom", "lights"],
        condition: 1,
        sold: 0,
        saved: 1,
    },
];

const SavedScreen = ({ navigation, props }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.header}>
                <Icon
                    name={"arrow-left"}
                    size={28}
                    color={"#2F6B25"}
                    onPress={() => navigation.goBack()}
                    style={styles.icon}
                />
                <Text style={styles.saves}>My Saves</Text>
            </View>
            <View style={{ width: Dim.width * 0.9, marginLeft: 20 }}>
                <FlatList
                    data={savedData}
                    renderItem={({ item }) => {
                        return (
                            <SavedItem
                                listingPhoto={item.listingPhoto}
                                listingPrice={item.listingPrice}
                                listingName={item.listingName}
                                sold={item.sold}
                                saved={item.saved}
                                onPress={() => {
                                    Alert.alert("Fix tomorrow");
                                }}
                            />
                        );
                    }}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: "center",
    },
    saves: {
        fontSize: 20,
        fontWeight: "bold",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: Dim.height * 0.06
    },
    icon: {
        position: "absolute",
        left: 4,
    }
});

export default SavedScreen;
