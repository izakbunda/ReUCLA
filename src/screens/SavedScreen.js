import React from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dim } from "../Constants";
import SavedItem from "../components/SavedItem";
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
            <View style={styles.container}>
                <Text style={styles.saves}>My Saves</Text>

                <View style={{ width: Dim.width * 0.9 }}>
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
        textAlign: "center",
        fontSize: 25,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 15,
    },
});

export default SavedScreen;
