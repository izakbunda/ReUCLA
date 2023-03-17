import React from "react";
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
} from "react-native";
import { useState } from "react";
import SearchBar from "../components/SearchBar";
import Category from "../components/Category";
import CategoryButton from "../components/CategoryButton";
import Icon from "react-native-vector-icons/Feather";
import { Dim } from "../Constants";

const menProducts = [
    {
        product: "TOPS",
        photo: "https://i.pinimg.com/474x/64/0e/16/640e16ef7a62d8e147cac02974c47fd1.jpg",
        subcategory: "tops",
    },
    {
        product: "BOTTOMS",
        photo: "https://i.pinimg.com/564x/5c/3a/e8/5c3ae8eb7247b00225616d3f7b6a4efd.jpg",
        subcategory: "bottoms",
    },
    {
        product: "SHOES",
        photo: "https://i.pinimg.com/736x/6e/7b/31/6e7b3154f170982e723fc6d112142107.jpg",
        subcategory: "shoes",
    },
    {
        product: "OUTERWEAR",
        photo: "https://i.pinimg.com/736x/a7/70/cc/a770ccd23bbd459317047d4703af1f06.jpg",
        subcategory: "outerwear",
    },
];

const womenProducts = [
    {
        product: "TOPS",
        photo: "https://i.pinimg.com/474x/1a/35/f9/1a35f9e6d3221a9daf34387f90ea2079.jpg",
        subcategory: "tops",
    },
    {
        product: "BOTTOMS",
        photo: "https://i.pinimg.com/474x/a7/43/d2/a743d2a56350e6142e79097ef3e24520.jpg",
        subcategory: "bottoms",
    },
    {
        product: "SHOES",
        photo: "https://i.pinimg.com/474x/2d/7a/0d/2d7a0d6265f5d82971de01091a9379a7.jpg",
        subcategory: "shoes",
    },
    {
        product: "OUTERWEAR",
        photo: "https://i.pinimg.com/474x/31/dd/55/31dd55b6ab534dc2f0289904c1b5f156.jpg",
        subcategory: "outerwear",
    },
];

const HomeScreen = ({ navigation, props }) => {
    const [search, setSearch] = useState("");

    const searchHandler = () => {
        // Alert.alert("HEY");
        navigation.navigate("Search", {
            title: search,
        });
    };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View style={styles.container}>
                    <SearchBar
                        value={search}
                        onChangeText={setSearch}
                        onPressSearch={searchHandler}
                    />
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Saved")}
                    >
                        <Icon
                            name={"bookmark"}
                            size={35}
                            color={"#2F6B25"}
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={styles.sectionHeader}>MENSWEAR</Text>
                <View style={styles.section}>
                    <FlatList
                        data={menProducts}
                        horizontal={true}
                        renderItem={({ item }) => {
                            return (
                                <Category
                                    photo={item.photo}
                                    product={item.product}
                                    onPress={() => {
                                        navigation.navigate("Category", {
                                            categoryName: item.product,
                                            category: "clothes",
                                            gender: 1,
                                            subcategory: item.subcategory,
                                        });
                                    }}
                                />
                            );
                        }}
                    />
                </View>
                <Text style={styles.sectionHeader}>WOMENSWEAR</Text>
                <View style={styles.section}>
                    <FlatList
                        data={womenProducts}
                        horizontal={true}
                        renderItem={({ item }) => {
                            return (
                                <Category
                                    photo={item.photo}
                                    product={item.product}
                                    onPress={() => {
                                        navigation.navigate("Category", {
                                            categoryName: item.product,
                                            category: "clothes",
                                            gender: 2,
                                            subcategory: item.subcategory,
                                        });
                                    }}
                                />
                            );
                        }}
                    />
                </View>
                <View style={{ paddingBottom: 10 }}>
                    <Text style={styles.sectionHeader}>PRODUCTS</Text>
                    <View style={styles.button}>
                        <CategoryButton
                            onPress={() => {
                                navigation.navigate("Category", {
                                    categoryName: "BOOKS",
                                    category: "books",
                                });
                            }}
                            product="BOOKS"
                        />
                        <CategoryButton
                            onPress={() => {
                                navigation.navigate("Category", {
                                    categoryName: "FURNITURE",
                                    category: "furniture",
                                });
                            }}
                            product="FURNITURE"
                        />
                    </View>
                    <View style={styles.button}>
                        <CategoryButton
                            onPress={() => {
                                navigation.navigate("Category", {
                                    categoryName: "TECHNOLOGY",
                                    category: "technology",
                                });
                            }}
                            product="TECHNOLOGY"
                        />
                        <CategoryButton
                            onPress={() => {
                                navigation.navigate("Category", {
                                    categoryName: "PLANTS",
                                    category: "plants",
                                });
                            }}
                            product="PLANTS"
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 30,
        paddingLeft: 20,
    },
    icon: {
        paddingLeft: 30,
    },
    sectionHeader: {
        fontSize: 25,
        fontWeight: "bold",
        marginTop: 25,
        paddingLeft: 20,
        paddingBottom: 20,
    },
    section: {
        width: Dim.width,
        paddingLeft: 20,
    },
    button: {
        paddingLeft: 20,
        flexDirection: "row",
    },
});

export default HomeScreen;
