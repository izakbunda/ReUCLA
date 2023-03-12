import React from "react";
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    SafeAreaView,
    FlatList,
    Image,
    Alert,
    TouchableOpacity,
} from "react-native";
import { Dim, Colors } from "../Constants";
import SmallListing from "../components/SmallListing";
import Icon from "react-native-vector-icons/Feather";

/*
  -- DOCUMENTATION --
*/

const profileProps = {
    profilePhoto: "https://google.com",
    name: "Izak Bunda",
    major: "Computer Science",
    bio: "Hello! I am a 2nd year UCLA student interested in fashion. I have a problem of buying too many clothes, so this is my solution. Feel free to message me to negotiate, none of the prices are final!",
    contactInformation: [7609942957, "@izakbunda", "izakbunda@gmail.com"],
    listingData: [
        {
            listingPhoto:
                "https://www.etsy.com/img/13961967/r/il/a150c5/3045227226/il_570xN.3045227226_4gag.jpg",
            listingPrice: 10,
            listingName: "magic pants",
            listingDescription: "these are pants!",
            category: ["clothing", "menswear", "bottoms"],
            condition: 1,
            sold: 1,
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
        },
    ],
    savedData: [
        {
            listingPhoto:
                "https://www.etsy.com/img/13961967/r/il/a150c5/3045227226/il_570xN.3045227226_4gag.jpg",
            listingPrice: 10,
            listingName: "magic pants",
            listingDescription: "these are pants!",
            category: ["clothing", "menswear", "bottoms"],
            condition: 1,
            sold: 1,
        },
    ],
};

const ProfileScreen = ({ navigation, props }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.photoContainer}>
                        <Image
                            source={{
                                uri: profileProps.profilePhoto,
                            }}
                            style={styles.photoContainer}
                        />
                    </View>

                    <Text style={styles.name}>{profileProps.name} </Text>
                    <Text style={styles.major}>{profileProps.major} </Text>

                    <View style={styles.bioContainer}>
                        <Text style={styles.bio}>{profileProps.bio}</Text>
                    </View>

                    <View style={{ width: Dim.width * 0.9, paddingTop: 20 }}>
                        <Text style={styles.listings}>Listings</Text>
                        <FlatList
                            data={profileProps.listingData}
                            horizontal={true}
                            renderItem={({ item }) => {
                                return (
                                    <SmallListing
                                        listingPhoto={item.listingPhoto}
                                        listingPrice={item.listingPrice}
                                        listingName={item.listingName}
                                        sold={item.sold}
                                        onPress={() => {
                                            Alert.alert("Fix tomorrow");
                                        }}
                                        // useNavigation to navigate // figure out tmr
                                    />
                                );
                            }}
                        />
                    </View>

                    <View
                        style={{
                            width: Dim.width * 0.9,
                            paddingTop: 20,
                            marginBottom: 10,
                        }}
                    >
                        <Text style={styles.listings}>Saved</Text>
                        <FlatList
                            data={profileProps.savedData}
                            horizontal={true}
                            renderItem={({ item }) => {
                                return (
                                    <SmallListing
                                        listingPhoto={item.listingPhoto}
                                        listingPrice={item.listingPrice}
                                        listingName={item.listingName}
                                        sold={item.sold}
                                        onPress={() => {
                                            Alert.alert("Fix tomorrow");
                                        }}
                                        // useNavigation to navigate // figure out tmr
                                    />
                                );
                            }}
                        />
                    </View>
                    <View
                        style={{
                            width: Dim.width * 0.9,
                            paddingVertical: 20,
                        }}
                    >
                        <Text style={styles.listings}>Contact Me</Text>
                        <View
                            style={{
                                width: Dim.width * 0.9,
                                flexDirection: "row",
                            }}
                        >
                            <TouchableOpacity>
                                <Icon
                                    name={"message-circle"}
                                    size={30}
                                    color={Colors.primary}
                                    style={styles.icon}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Icon
                                    name={"instagram"}
                                    size={30}
                                    color={Colors.primary}
                                    style={styles.icon}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Icon
                                    name={"mail"}
                                    size={30}
                                    color={Colors.primary}
                                    style={styles.icon}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 30,
    },
    photoContainer: {
        alignItems: "center",
        // paddingTop: 60,
        height: 110,
        width: 110,
        borderRadius: 1000,
        backgroundColor: "black",
    },
    name: { marginTop: 15, fontSize: 25, fontWeight: "bold" },
    major: { marginTop: 5, fontSize: 13, fontWeight: "bold" },
    bioContainer: {
        marginTop: 20,
        width: Dim.width * 0.9,
        borderColor: "#2F6B25",
        borderWidth: 1,
        borderRadius: 10,
        padding: 17,
    },
    bio: { fontSize: 15, textAlign: "center" },
    listings: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
    contactContainer: {
        marginTop: 20,
        // width: Dim.width * 0.9,
        borderColor: Colors.primary,
        borderWidth: 1,
        borderRadius: 10,
        padding: 17,
    },
    icon: {
        marginRight: 14,
    },
});

export default ProfileScreen;
