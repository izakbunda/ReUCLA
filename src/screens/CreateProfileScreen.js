import React from "react";
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    Alert,
    Image,
    TouchableWithoutFeedback,
    Keyboard,
    ActivityIndicator,
} from "react-native";
import { useState } from "react";
import TextInput from "../components/TextInput";
import {
    Colors,
    RegexDiscord,
    RegexInstagram,
    RegexTwitter,
    RegexUsername,
} from "../Constants";
import { useEffect } from "react";
import Button from "../components/Button";
import { RegexPassword, RegexName } from "../Constants";
import AddProfilePhoto from "../components/AddProfilePhoto";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { deleteApp } from "firebase/app";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebase";
/*
  -- DOCUMENTATION --
*/

const asyncCreateProfile = async (
    major,
    bio,
    instagram,
    discord,
    twitter,
    uID,
    pfpPath
) => {
    // console.log("HERE!!!")
    return await fetch("http://localhost:4000/user/update", {
        // If you are posting something, use POST
        // If you are fetching something, use GET
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            major,
            bio,
            instagram,
            discord,
            twitter,
            uID,
            pfpPath,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            return data;
        })
        .catch((error) => {
            return error;
        });
};

const CreateProfileScreen = ({ props, navigation }) => {
    const [major, setMajor] = useState("");
    const [bio, setBio] = useState("");
    const [instagram, setInstagram] = useState("");
    const [discord, setDiscrod] = useState("");
    const [twitter, setTwitter] = useState(true);
    const [uID, setUserId] = useState("");
    const [pfpPath, setPath] = useState(null);

    const [errors, setErrors] = useState({
        major: undefined,
        bio: undefined,
        instagram: undefined,
        discord: undefined,
        twitter: undefined,
    });

    AsyncStorage.getItem("@userId", (err, item) => setUserId(item));

    const [image, setImage] = useState(null);
    const [imagePicked, setImagePicked] = useState(false);
    const [loading, setLoading] = useState(false);

    // console.log(imagePicked);
    // console.log(pfp);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            // aspect: [4, 3],
            quality: 1,
        });

        // console.log(result);
        if (!result.canceled) {
            setImage(result.assets[0].uri);
            setImagePicked(true);
            const path = result.assets[0].uri.substring(
                result.assets[0].uri.lastIndexOf("/") + 1
            );
            console.log(path);

            const reference = ref(storage, path);

            const img = await fetch(result.assets[0].uri);
            const bytes = await img.blob();
            // console.log(bytes);

            const delay = (ms) =>
                new Promise((resolve) => setTimeout(resolve, ms));
            await delay(1500);
            await uploadBytes(reference, bytes).then(() => {
                console.log("File Uploaded");
            });

            setPath(path);
        }
    };

    const onPressRegister = async () => {
        const majorError =
            major.length > 0 ? undefined : "You must enter a major";
        const bioError =
            bio.length > 0 ? undefined : "Please enter a valid password.";
        const instagramError =
            instagram.length > 0 ? undefined : "Enter a valid Instagram handle";
        const discordError =
            discord.length > 0
                ? undefined
                : "You must enter valid Discord tag.";
        const twitterError =
            twitter.length > 0
                ? undefined
                : "You must enter valid Twitter handle.";

        if (
            majorError ||
            bioError ||
            instagramError ||
            discordError ||
            twitterError
        ) {
            setErrors({
                major: majorError,
                bio: bioError,
                instagram: instagramError,
                discord: discordError,
                twitter: twitterError,
            });
        } else {
            setLoading(true);
            const resp = await asyncCreateProfile(
                major,
                bio,
                instagram,
                discord,
                twitter,
                uID,
                image,
                pfpPath
            );
            console.log(resp);
            // console.log(userID);
            AsyncStorage.setItem("@bio", resp.userData.bio);
            AsyncStorage.setItem("@instagram", resp.userData.contact[0]);
            AsyncStorage.setItem("@discord", resp.userData.contact[1]);
            AsyncStorage.setItem("@twitter", resp.userData.contact[2]);
            AsyncStorage.setItem("@major", resp.userData.major);
            AsyncStorage.setItem("@pfpURI", image);
            AsyncStorage.setItem("@signedIn", "true");
            setLoading(false);
            AsyncStorage.multiGet(["@userId", "@signedIn"]).then((userId) => {
                console.log(userId);
            });
            navigation.navigate("NavBarStack");
        }
    };

    return (
        <KeyboardAwareScrollView
            style={{
                backgroundColor: "white",
                flex: Platform.OS === "ios" ? 1 : null,
                paddingTop: 0,
            }}
            contentContainerStyle={{
                alignItems: "center",
                justifyContent: "center",
            }}
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            extraScrollHeight={25}
            keyboardShouldPersistTaps="handled"
        >
            <SafeAreaView>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <ScrollView>
                        <View
                            style={{
                                flexDirection: "column",
                                alignItems: "center",
                                paddingTop: 25,
                            }}
                        >
                            <Text style={styles.title}>
                                Create your profile
                            </Text>

                            <View
                                style={{
                                    marginVertical: 10,
                                    marginLeft: 10,
                                    marginBottom: 20,
                                }}
                            >
                                <Text style={{ marginBottom: 20 }}>
                                    Add Profile Photo:
                                </Text>

                                {image ? (
                                    <View>
                                        {image && (
                                            <Image
                                                source={{ uri: image }}
                                                style={{
                                                    width: 104,
                                                    height: 104,
                                                    borderRadius: 1000,
                                                    marginBottom: 20,
                                                }}
                                            />
                                        )}
                                    </View>
                                ) : (
                                    <View>
                                        <AddProfilePhoto
                                            style={{
                                                margin: 10,
                                                backgroundColor:
                                                    Colors.primaryGreen,
                                            }}
                                            onPress={pickImage}
                                        />
                                    </View>
                                )}
                            </View>

                            <View>
                                <TextInput
                                    title={"Major"}
                                    setText={setMajor}
                                    value={major}
                                    placeholder={"Where is your major?"}
                                    isPassword={false}
                                    autoCorrect={false}
                                />

                                <TextInput
                                    title={"Bio"}
                                    setText={setBio}
                                    multiline={true}
                                    value={bio}
                                    placeholder={"Tell us about yourself"}
                                    isPassword={false}
                                    autoCorrect={false}
                                />

                                <Text style={styles.subtitle}>
                                    Contact Information
                                </Text>

                                <TextInput
                                    setText={setInstagram}
                                    value={instagram}
                                    placeholder={"@instagram_handle"}
                                    isPassword={false}
                                    autoCorrect={false}
                                />
                                <TextInput
                                    setText={setDiscrod}
                                    value={discord}
                                    placeholder={"#discord_tag"}
                                    isPassword={false}
                                    autoCorrect={false}
                                />
                                <TextInput
                                    setText={setTwitter}
                                    value={twitter}
                                    placeholder={"@twitter_user"}
                                    isPassword={false}
                                    autoCorrect={false}
                                />

                                <View>
                                    {loading ? (
                                        <ActivityIndicator
                                            size="large"
                                            color={Colors.primary}
                                            style={styles.activity}
                                        />
                                    ) : (
                                        <Button
                                            title="Continue"
                                            onPress={onPressRegister}
                                            style={styles.button}
                                        />
                                    )}
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({
    title: {
        marginTop: 4,
        fontSize: 25,
        color: Colors.darkGray,
        textAlign: "center",
        fontWeight: "bold",
        paddingBottom: 30,
    },
    subtitle: {
        paddingLeft: 20,
        marginTop: 30,
        fontSize: 15,
        color: Colors.darkGray,
        textAlign: "left",
        paddingBottom: 10,
    },
    button: {
        marginTop: 30,
        marginBottom: 40,
        marginBottom: 40,
        alignSelf: "center",
        backgroundColor: Colors.primaryGreen,
    },
    activity: {
        marginTop: 30,
        marginBottom: 40,
        alignSelf: "center",
    },
    activity: {
        marginTop: 30,
        marginBottom: 40,
        alignSelf: "center",
    },
});

export default CreateProfileScreen;
