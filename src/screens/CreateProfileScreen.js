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

/*
  -- DOCUMENTATION --
*/

const asyncCreateProfile = async (
    major,
    bio,
    instagram,
    discord,
    twitter,
    uID
) => {
    // console.log("HERE!!!")
    // console.log(email)
    return await fetch("http://localhost:4000/user/update", {
        // If you are posting something, use POST
        // If you are fetching something, use GET
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ major, bio, instagram, discord, twitter, uID }),
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
    // console.log(image);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            // aspect: [4, 3],
            quality: 1,
        });

        console.log(result);
        if (!result.canceled) {
            setImage(result.assets[0].uri);
            setImagePicked(true);
        }
    };

<<<<<<< HEAD
    function success(navigation) {
        {
            navigation.navigate("Create Profile");
        }
    };

=======
>>>>>>> e306685 (Finishing up frontend of Sign In Flow)
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
                uID
            );
            console.log(resp);
            // console.log(userID);
            AsyncStorage.setItem("@bio", resp.bio);
            AsyncStorage.setItem("@contact", resp.contact); // ARRAY!!
            AsyncStorage.setItem("@major", resp.major);
            AsyncStorage.setItem("@signedIn", "true");
            setLoading(false);
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
                                    error={errors.major}
                                    errorMessage={"Enter a valid major."}
                                    onEndEditing={() => {
                                        if (!RegexName.test(major)) {
                                            setErrors({
                                                ...errors,
                                                major: "Please enter a valid major.",
                                            });
                                        } else {
                                            setErrors({
                                                ...errors,
                                                major: undefined,
                                            });
                                        }
                                    }}
                                />

                                <TextInput
                                    title={"Bio"}
                                    setText={setBio}
                                    multiline={true}
                                    value={bio}
                                    placeholder={"Tell us about yourself"}
                                    isPassword={false}
                                    autoCorrect={false}
                                    error={errors.bio}
                                    errorMessage={"Enter a valid bio."}
                                    onEndEditing={() => {
                                        if (!RegexName.test(bio)) {
                                            setErrors({
                                                ...errors,
                                                bio: "Please enter a valid bio.",
                                            });
                                        } else {
                                            setErrors({
                                                ...errors,
                                                bio: undefined,
                                            });
                                        }
                                    }}
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
                                    error={errors.instagram}
                                    errorMessage={
                                        "Enter a valid Instagram handle"
                                    }
                                    onEndEditing={() => {
                                        if (!RegexInstagram.test(instagram)) {
                                            setErrors({
                                                ...errors,
                                                instagram:
                                                    "Please enter a valid instagram handle.",
                                            });
                                        } else {
                                            setErrors({
                                                ...errors,
                                                instagram: undefined,
                                            });
                                        }
                                    }}
                                />
                                <TextInput
                                    setText={setDiscrod}
                                    value={discord}
                                    placeholder={"#discord_tag"}
                                    isPassword={false}
                                    autoCorrect={false}
                                    error={errors.discord}
                                    errorMessage={
                                        "Please enter a valid Discord tag."
                                    }
                                    onEndEditing={() => {
                                        if (!RegexDiscord.test(discord)) {
                                            setErrors({
                                                ...errors,
                                                discord:
                                                    "Please enter a valid Discord tag.",
                                            });
                                        } else {
                                            setErrors({
                                                ...errors,
                                                discord: undefined,
                                            });
                                        }
                                    }}
                                />
                                <TextInput
                                    setText={setTwitter}
                                    value={twitter}
                                    placeholder={"@twitter_user"}
                                    isPassword={false}
                                    autoCorrect={false}
                                    error={errors.twitter}
                                    errorMessage={
                                        "Enter a valid Twitter handle."
                                    }
                                    onEndEditing={() => {
                                        if (!RegexTwitter.test(twitter)) {
                                            setErrors({
                                                ...errors,
                                                twitter:
                                                    "Please enter a Twitter handle.",
                                            });
                                        } else {
                                            setErrors({
                                                ...errors,
                                                twitter: undefined,
                                            });
                                        }
                                    }}
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
        alignSelf: "center",
        backgroundColor: Colors.primaryGreen,
    },
    activity: {
        marginTop: 30,
        marginBottom: 40,
        alignSelf: "center",
    },
});

export default CreateProfileScreen;
