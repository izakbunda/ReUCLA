import React from "react";
import { View, StyleSheet, Text, ScrollView, Alert, Image } from "react-native";
import { useState } from "react";
import TextInput from "../components/TextInput";
import {
    Colors,
    RegexDiscord,
    RegexInstagram,
    RegexTwitter,
    RegexUsername,
} from "../Constants";
import Button from "../components/Button";
import { RegexPassword, RegexName } from "../Constants";
import AddProfilePhoto from "../components/AddProfilePhoto";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

/*
  -- DOCUMENTATION --
*/
const CreateProfileScreen = ({ props, navigation }) => {
    const [location, setLocation] = useState("");
    const [bio, setBio] = useState("");
    const [instagram, setInstagram] = useState("");
    const [discord, setDiscrod] = useState("");
    const [twitter, setTwitter] = useState(true);

    const [errors, setErrors] = useState({
        location: undefined,
        bio: undefined,
        instagram: undefined,
        discord: undefined,
        twitter: undefined,
    });

    // console.log(errors);
    // console.log(lastName);

    const [image, setImage] = useState(null);
    const [imagePicked, setImagePicked] = useState(false);

    console.log(imagePicked);
    console.log(image);

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

    const onPressRegister = async () => {
        const locationError =
            location.length > 0 ? undefined : "You must enter a location";
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
            locationError ||
            bioError ||
            instagramError ||
            discordError ||
            twitterError
        ) {
            setErrors({
                location: locationError,
                bio: bioError,
                instagram: instagramError,
                discord: discordError,
                twitter: twitterError,
            });
        } else {
            setCreate(true);
        }
    };

    return (
        <KeyboardAwareScrollView
            style={{
                backgroundColor: "white",
                flex: Platform.OS === "ios" ? 1 : null,
                paddingTop: 50,
            }}
            contentContainerStyle={{
                alignItems: "center",
                justifyContent: "center",
            }}
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            extraScrollHeight={25}
            keyboardShouldPersistTaps="handled"
        >
            <ScrollView>
                <View
                    style={{
                        flexDirection: "column",
                        alignItems: "center",
                        paddingTop: 25,
                    }}
                >
                    <Text style={styles.title}>Create your profile</Text>

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
                                        backgroundColor: Colors.primaryGreen,
                                    }}
                                    onPress={pickImage}
                                />
                            </View>
                        )}
                    </View>

                    <View>
                        <TextInput
                            title={"Location"}
                            setText={setLocation}
                            value={location}
                            placeholder={"Where are you located?"}
                            isPassword={false}
                            autoCorrect={false}
                            error={errors.location}
                            errorMessage={"Enter a valid location."}
                            onEndEditing={() => {
                                if (!RegexName.test(location)) {
                                    setErrors({
                                        ...errors,
                                        location:
                                            "Please enter a valid location.",
                                    });
                                } else {
                                    setErrors({
                                        ...errors,
                                        location: undefined,
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

                        <Text style={styles.subtitle}>Contact Information</Text>

                        <TextInput
                            setText={setInstagram}
                            value={instagram}
                            placeholder={"@instagram_handle"}
                            isPassword={false}
                            autoCorrect={false}
                            error={errors.instagram}
                            errorMessage={"Enter a valid Instagram handle"}
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
                            errorMessage={"Please enter a valid Discord tag."}
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
                            errorMessage={"Enter a valid Twitter handle."}
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

                        <Button
                            title="Continue"
                            onPress={onPressRegister}
                            // onPress={() =>
                            //     navigation.navigate("Create Profile")
                            // }
                            style={styles.button}
                        />
                    </View>
                </View>
            </ScrollView>
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
        alignSelf: "center",
        backgroundColor: Colors.primaryGreen,
    },
});

export default CreateProfileScreen;
