import React, { useState } from "react";
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
import { useEffect } from "react";
import { Dim, Colors } from "../Constants";
import SmallListing from "../components/SmallListing";
import Icon from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";

/*
  -- DOCUMENTATION --
*/

const profileProps = {
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
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [bio, setBio] = useState("");
    const [major, setMajor] = useState("");
    const [instagram, setInstagram] = useState("");
    const [discord, setDiscord] = useState("");
    const [twitter, setTwitter] = useState("");
    const [pfp, setPfp] = useState("");

    // console.log("LAST NAME FROM SIGN IN:" + item);
    // console.log("LAST NAME FROM SIGN IN:" + item);
    // console.log("BIO FROM SIGN IN:" + item);
    // console.log("MAJOR FROM SIGN IN:" + item);
    // console.log("INSTAGRAM FROM SIGN IN:" + item);

    useEffect(() => {
        AsyncStorage.getItem("@firstName", (err, item) => {
            // console.log("FIRST NAME FROM SIGN IN:" + item);
            setFirstName(item);
        });
        AsyncStorage.getItem("@lastName", (err, item) => {
            // console.log("LAST NAME FROM SIGN IN:" + item);
            setLastName(item);
        });
        AsyncStorage.getItem("@bio", (err, item) => {
            // console.log("BIO FROM SIGN IN:" + item);
            setBio(item);
        });
        AsyncStorage.getItem("@major", (err, item) => {
            // console.log("MAJOR FROM SIGN IN:" + item);
            setMajor(item);
        });
        AsyncStorage.getItem("@instagram", (err, item) => {
            // console.log("INSTA FROM SIGN IN:" + item);
            setInstagram(item);
        });
        AsyncStorage.getItem("@discord", (err, item) => {
            // console.log("DISCORD FROM SIGN IN:" + item);
            setDiscord(item);
        });
        AsyncStorage.getItem("@twitter", (err, item) => {
            // console.log("TWITTER FROM SIGN IN:" + item);
            setTwitter(item);
        });
        AsyncStorage.getItem("@pfpURI", (err, item) => {
            // console.log("PFP FROM SIGN IN:" + item);
            setPfp(item);
        });
    }, []);

    const handleClick = (type) => {
        {
            switch (type) {
                case 1:
                    Alert.alert("Follow me on Instagram: " + instagram);
                    break;
                case 2:
                    Alert.alert("Add me on Discord " + discord);
                    break;
                case 3:
                    Alert.alert("Follow me on Twitter " + twitter);
                    break;
            }
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.photoContainer}>
                        <Image
                            source={{
                                uri: pfp,
                            }}
                            style={styles.photoContainer}
                        />
                    </View>

                    <Text style={styles.name}>
                        {firstName + " " + lastName}
                    </Text>
                    <Text style={styles.major}>{major} </Text>

                    <View
                        style={{
                            flexDirection: "row",
                            alignSelf: "center",
                            paddingTop: 20,
                            paddingBottom: 10,
                        }}
                    >
                        <TouchableOpacity onPress={() => handleClick(1)}>
                            <Icon
                                name={"instagram"}
                                size={30}
                                color={Colors.primary}
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleClick(2)}>
                            <Icon
                                name={"message-square"}
                                size={30}
                                color={Colors.primary}
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleClick(3)}>
                            <Icon
                                name={"twitter"}
                                size={30}
                                color={Colors.primary}
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            alignSelf: "center",
                            paddingTop: 20,
                            paddingBottom: 10,
                        }}
                    >
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
                                name={"message-square"}
                                size={30}
                                color={Colors.primary}
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Icon
                                name={"twitter"}
                                size={30}
                                color={Colors.primary}
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.bioContainer}>
                        <Text style={styles.bio}>{bio}</Text>
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
    logout: {
        alignSelf: "flex-start",
        position: "absolute",
        top: -15,
        right: -165,
    },
});

export default ProfileScreen;
