import React from "react";
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    Alert,
    Keyboard,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ActivityIndicator,
    Platform,
} from "react-native";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TextInput from "../components/TextInput";
import { Colors } from "../Constants";
import Button from "../components/Button";
import { RegexEmail, RegexPassword, RegexName } from "../Constants";
import { Underline } from "react-native-feather";
import Icon from "react-native-vector-icons/Feather";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AddListingPhoto from "../components/AddListingPhoto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DropDownPicker from "react-native-dropdown-picker";
import { Dim } from "../Constants";
import * as ImagePicker from "expo-image-picker";

/*
  -- DOCUMENTATION --
*/
const asyncfunction = async (email, password, first_name, last_name) => {
    // console.log("HERE!!!")
    // console.log(email)
    return await fetch("http://localhost:4000/create/User", {
        // If you are posting something, use POST
        // If you are fetching something, use GET
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, first_name, last_name }),
    })
        .then((res) => res.json())
        .then((data) => {
            return data;
        })
        .catch((error) => {
            return error;
        });
};

const AddListingScreen = ({ props, navigation }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [imagePicked, setImagePicked] = useState(false);
    const [category, setCategory] = useState(null);
    const [condition, setCondition] = useState(null);
    const [price, setPrice] = useState("");

    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        { label: "Clothes", value: "clothes" },
        { label: "Books", value: "books" },
        { label: "Food", value: "food" },
        { label: "Technology", value: "technology" },
        { label: "Furniture", value: "furniture" },
        { label: "Plants", value: "plants" },
    ]);

    // console.log(category);
    // console.log(condition);

    const [loading, setLoading] = useState(false);
    const [userID, setUID] = useState("");

    const [errors, setErrors] = useState({
        title: undefined,
        description: undefined,
        price: undefined,
    });

    // console.log(errors);
    // console.log(lastName);

    const onPressCreate = async () => {
        const titleError =
            title.length > 0 ? undefined : "You must enter a title.";
        const descriptionError =
            description.length > 0
                ? undefined
                : "You must enter a item description.";
        const priceError =
            price.length > 0 ? undefined : "You must enter a price.";

        if (titleError || descriptionError || priceError) {
            setErrors({
                title: titleError,
                description: descriptionError,
                price: priceError,
            });
        } else {
            setLoading(true);
            console.log(title);
            console.log(description);
            console.log(category);
            console.log(condition);
            console.log(price);
            // const resp = await asyncSignUp(
            //     email,
            //     password,
            //     firstName,
            //     lastName
            // );
            // console.log(resp);
            // setUID(resp.userID);
            // console.log("HELLO " + userID);
            setLoading(false);
            setTitle("");
            setDescription("");
            setCategory(null);
            setCondition(null);
            setPrice("");
            setImagePicked(false);
            setImage("");
            navigation.navigate("Profile");
        }
    };

    const pickImage = async () => {
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
                    <View
                        style={{
                            flexDirection: "column",
                            alignItems: "center",
                            paddingTop: 25,
                        }}
                    >
                        <Text style={styles.title}>Listing</Text>

                        <TextInput
                            setText={setTitle}
                            value={title}
                            title={"Title"}
                            placeholder={""}
                            isPassword={false}
                            autoCorrect={false}
                            error={errors.title}
                            errorMessage={"Enter a valid title."}
                        />

                        <TextInput
                            setText={setDescription}
                            value={description}
                            title={"Item Description"}
                            placeholder={""}
                            isPassword={false}
                            autoCorrect={false}
                            error={errors.description}
                            errorMessage={"Enter a valid description."}
                            multiline={true}
                        />

                        <View style={{ marginBottom: 20 }}>
                            <AddListingPhoto
                                onPress={pickImage}
                                imagePicked={imagePicked}
                                image={image}
                            />
                        </View>

                        <View
                            style={{
                                width: Dim.width * 0.8,
                                paddingBottom: 25,
                            }}
                        >
                            <Text style={styles.inputTitle}>Category</Text>
                            <DropDownPicker
                                open={open}
                                value={category}
                                items={items}
                                setOpen={setOpen}
                                setValue={setCategory}
                                setItems={setItems}
                                selectedItemContainerStyle={{
                                    backgroundColor: Colors.primary,
                                }}
                                listMode={"MODAL"}
                                modalProps={{
                                    animationType: "slide",
                                }}
                                textStyle={{
                                    fontSize: 17,
                                    padding: 10,
                                }}
                                style={styles.modalContent}
                            />
                        </View>

                        <View style={{ width: Dim.width * 0.8 }}>
                            <Text style={styles.inputTitle}>Condition</Text>
                        </View>
                        <View style={styles.actionRow}>
                            <TouchableOpacity onPress={() => setCondition(3)}>
                                {condition == 3 ? (
                                    <Icon
                                        name={"frown"}
                                        size={40}
                                        color={Colors.primary}
                                        style={styles.action}
                                    />
                                ) : (
                                    <Icon
                                        name={"frown"}
                                        size={40}
                                        color={Colors.darkGray}
                                        style={styles.action}
                                    />
                                )}
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => setCondition(2)}>
                                {condition == 2 ? (
                                    <Icon
                                        name={"meh"}
                                        size={40}
                                        color={Colors.primary}
                                        style={styles.action}
                                    />
                                ) : (
                                    <Icon
                                        name={"meh"}
                                        size={40}
                                        color={Colors.darkGray}
                                        style={styles.action}
                                    />
                                )}
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => setCondition(1)}>
                                {condition == 1 ? (
                                    <Icon
                                        name={"smile"}
                                        size={40}
                                        color={Colors.primary}
                                        style={styles.action}
                                    />
                                ) : (
                                    <Icon
                                        name={"smile"}
                                        size={40}
                                        color={Colors.darkGray}
                                        style={styles.action}
                                    />
                                )}
                            </TouchableOpacity>
                        </View>

                        <TextInput
                            setText={setPrice}
                            value={price}
                            title={"Price"}
                            placeholder={"$"}
                            isPassword={false}
                            autoCorrect={false}
                            inputMode={"numeric"}
                            error={errors.price}
                            errorMessage={"Enter a valid price."}
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
                                    title="Create Listing"
                                    onPress={onPressCreate}
                                    style={styles.button}
                                />
                            )}
                        </View>
                    </View>
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
        paddingBottom: 10,
    },
    subtitle: {
        paddingLeft: 20,
        marginTop: 20,
        fontSize: 17,
        color: Colors.darkGray,
        textAlign: "left",
        fontWeight: "bold",
        paddingBottom: 30,
    },
    button: {
        marginTop: 30,
        alignSelf: "center",
    },
    activity: { marginTop: 20, marginBottom: 40 },
    icon: {
        alignSelf: "flex-start",
        position: "absolute",
        top: 5,
        left: -170,
    },
    inputTitle: {
        marginTop: 4,
        fontSize: 15,
        marginBottom: 15,
        color: Colors.darkGray,
        textAlign: "left",
    },
    actionRow: {
        flexDirection: "row",
        paddingBottom: 25,
    },
    action: { paddingTop: 10, marginHorizontal: 20 },
    modalContent: {
        justifyContent: "center",
        alignItems: "center",
        margin: 0,
    },
});

export default AddListingScreen;
