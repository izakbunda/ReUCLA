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
import { ref, uploadBytes } from "firebase/storage";
import { storage } from './firebase';

/*
  -- DOCUMENTATION --
*/

const asyncCreateListing = async (title, description, photoPath, category, condition, price, gender,
                            subcategory, uID) => {
    // console.log("HERE!!!")
    // console.log(email)
    return await fetch("http://localhost:4000/listings/create", {
        // If you are posting something, use POST
        // If you are fetching something, use GET
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify({ title, description, photoPath, category, condition, price, gender,
            subcategory, uID }),

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
    const [subcategory, setSubcategory] = useState("null");
    const [gender, setGender] = useState(0);
    const [condition, setCondition] = useState(null);
    const [price, setPrice] = useState("");
    const [pfpPath, setPath] = useState(null);
    const [uID, setuid] = useState("bruh");
    const [open, setOpen] = useState(false);
    const [openType, setOpenType] = useState(false);

    const [items, setItems] = useState([
        { label: "Clothes", value: "clothes" },
        { label: "Books", value: "books" },
        { label: "Food", value: "food" },
        { label: "Technology", value: "technology" },
        { label: "Furniture", value: "furniture" },
        { label: "Plants", value: "plants" },
    ]);
    const [itemType, setItemType] = useState([
        { label: "Tops", value: "tops" },
        { label: "Bottoms", value: "bottoms" },
        { label: "Shoes", value: "shoes" },
        { label: "Outerwear", value: "outerwear" },
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

    const onPressCreate = async () => {
            AsyncStorage.getItem("@userId", (err, item) =>
                setuid(item)
            );
            await asyncCreateListing(title, description, pfpPath, category, 
                condition, price, gender, subcategory, uID);
            setLoading(true);
            setLoading(false);
            // setTitle("");
            // setDescription("");
            // setCategory(null);
            // setCondition(null);
            // setPrice("");
            // setImagePicked(false);
            // setImage("");
            // setSubcategory("null");
            // setGender(0);
            
            // navigation.navigate("Profile");
    };

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
            const path = result.assets[0].uri.substring(result.assets[0].uri.lastIndexOf('/')+1);
            console.log(path);
            
            const reference = ref(storage, path);

            const img = await fetch(result.assets[0].uri);
            const bytes = await img.blob();
            // console.log(bytes);
            
            const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
            await delay(1500);
            await uploadBytes(reference, bytes)
                .then(() => {
                    console.log("File Uploaded");
                });

            setPath(path);
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
                        />

                        <TextInput
                            setText={setDescription}
                            value={description}
                            title={"Item Description"}
                            placeholder={""}
                            isPassword={false}
                            autoCorrect={false}
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
                                placeholder="Select a category"
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

                            {category == "clothes" ? (
                                <View>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignSelf: "center",
                                        }}
                                    >
                                        {gender == 1 ? (
                                            <Button
                                                title="Mens"
                                                onPress={() => setGender(1)}
                                                style={styles.button2}
                                                small={true}
                                            />
                                        ) : (
                                            <Button
                                                title="Mens"
                                                onPress={() => setGender(1)}
                                                style={styles.button2}
                                                unselected={true}
                                            />
                                        )}

                                        {gender == 2 ? (
                                            <Button
                                                title="Womens"
                                                onPress={() => setGender(2)}
                                                style={styles.button2}
                                                small={true}
                                            />
                                        ) : (
                                            <Button
                                                title="Womens"
                                                onPress={() => setGender(2)}
                                                style={styles.button2}
                                                unselected={true}
                                            />
                                        )}
                                    </View>

                                    <DropDownPicker
                                        placeholder="Select a subcategory"
                                        open={openType}
                                        value={subcategory}
                                        items={itemType}
                                        setOpen={setOpenType}
                                        setValue={setSubcategory}
                                        setItems={setItemType}
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
                            ) : null}
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

    button2: {
        marginTop: 20,
        alignSelf: "center",
        marginHorizontal: 10,
        marginBottom: 20,
    },
    button2_unselected: {
        marginTop: 20,
        alignSelf: "center",
        marginHorizontal: 10,
        marginBottom: 20,
        backgroundColor: "white",
        borderWidth: 2,
        borderColor: Colors.primary,
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