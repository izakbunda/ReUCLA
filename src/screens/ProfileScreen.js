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

const profileProps = {
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
    const [uID, setuID] = useState("");
    const [data, setData] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem("@firstName", (err, item) => {
            setFirstName(item);
        });
        AsyncStorage.getItem("@lastName", (err, item) => {
            setLastName(item);
        });
        AsyncStorage.getItem("@bio", (err, item) => {
            setBio(item);
        });
        AsyncStorage.getItem("@major", (err, item) => {
            setMajor(item);
        });
        AsyncStorage.getItem("@instagram", (err, item) => {
            setInstagram(item);
        });
        AsyncStorage.getItem("@discord", (err, item) => {
            setDiscord(item);
        });
        AsyncStorage.getItem("@twitter", (err, item) => {
            setTwitter(item);
        });
        AsyncStorage.getItem("@pfpURI", (err, item) => {
            setPfp(item);
        });
        AsyncStorage.getItem("@userId", (err, item) => {
            setuID(item);
        });
    }, []);

    const getMyListings = async () => {
        if(uID == "") return;
        const res = await fetch(`http://localhost:4000/listings/get/${uID}`)
        const json = await res.json()
        setData(json.listingData)
    }

    useEffect(() => {
        getMyListings();
    }, [uID]);

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

    const profilepicture = String(pfp);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.photoContainer}>
                        <Image
                            source={{ uri: profilepicture }}
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

                    <View style={styles.bioContainer}>
                        <Text style={styles.bio}>{bio}</Text>
                    </View>

                    <View style={{ width: Dim.width * 0.9, paddingTop: 20 }}>
                        <Text style={styles.listings}>Listings</Text>
                        <FlatList
                            data={data}
                            horizontal={true}
                            renderItem={({ item }) => {
                                return (
                                    <SmallListing
                                        listingPhoto={item.photoPath}
                                        listingPrice={item.price}
                                        listingName={item.title}
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
