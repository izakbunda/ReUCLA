import React, { useState } from "react";
import { 
    View,
    StyleSheet, 
    Text, 
    ScrollView, 
    SafeAreaView, 
    FlatList, 
    TouchableOpacity, 
    Alert 
} from "react-native";
import SearchBar from "../components/SearchBar";
import Category from "../components/Category";
import CategoryButton from "../components/CategoryButton";
import Icon from "react-native-vector-icons/Feather";
import { Dim, Colors } from "../Constants";

/*
  -- DOCUMENTATION --
*/

const menProducts = [
    {
        product: "TOPS",
        photo: "https://i.pinimg.com/474x/64/0e/16/640e16ef7a62d8e147cac02974c47fd1.jpg"
    },
    {
        product: "BOTTOMS",
        photo: "https://i.pinimg.com/564x/5c/3a/e8/5c3ae8eb7247b00225616d3f7b6a4efd.jpg"
    },
    {
        product: "SHOES",
        photo: "https://i.pinimg.com/736x/6e/7b/31/6e7b3154f170982e723fc6d112142107.jpg"
    },
    {
        product: "OUTERWEAR",
        photo: "https://i.pinimg.com/736x/a7/70/cc/a770ccd23bbd459317047d4703af1f06.jpg"
    }
]

const womenProducts = [
    {
        product: "TOPS",
        photo: "https://i.pinimg.com/474x/1a/35/f9/1a35f9e6d3221a9daf34387f90ea2079.jpg"
    },
    {
        product: "BOTTOMS",
        photo: "https://i.pinimg.com/474x/a7/43/d2/a743d2a56350e6142e79097ef3e24520.jpg"
    },
    {
        product: "SHOES",
        photo: "https://i.pinimg.com/474x/2d/7a/0d/2d7a0d6265f5d82971de01091a9379a7.jpg"
    },
    {
        product: "OUTERWEAR",
        photo: "https://i.pinimg.com/474x/31/dd/55/31dd55b6ab534dc2f0289904c1b5f156.jpg"
    }
]


const HomeScreen = (props) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View style={styles.container}>
                    <SearchBar/>
                    <TouchableOpacity>
                        <Icon 
                            name={"shopping-bag"}
                            size={35}
                            color={"#2F6B25"}
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={styles.sectionHeader}>MENSWEAR</Text>
                <View style={styles.section}>
                    <FlatList
                        data={ menProducts }
                        horizontal={ true }
                        renderItem={({ item }) => {
                            return (
                                <Category
                                    photo={ item.photo }
                                    product={ item.product }
                                    onPress={ () => {
                                        Alert.alert("go to category page")
                                    }}
                                />
                            )
                            
                        }}
                    />
                </View>
                <Text style={styles.sectionHeader}>WOMENSWEAR</Text>
                <View style={styles.section}>
                    <FlatList
                        data={ womenProducts }
                        horizontal={ true }
                        renderItem={({ item }) => {
                            return (
                                <Category
                                    photo={ item.photo }
                                    product={ item.product }
                                    onPress={ () => {
                                        Alert.alert("go to category page")
                                    }}
                                />
                            )}}
                    />
                </View>
                <Text style={styles.sectionHeader}>PRODUCTS</Text>
                <View style={styles.button}>
                    <CategoryButton
                        onPress={ () => {
                            Alert.alert("go to product page")
                        }}
                        product = "Clothes"
                    />
                    <CategoryButton
                        onPress={ () => {
                            Alert.alert("go to product page")
                        }}
                        product = "Technology"
                    />
                </View>
                <View style={styles.button}>
                    <CategoryButton
                        onPress={ () => {
                            Alert.alert("go to product page")
                        }}
                        product = "Books"
                    />
                    <CategoryButton
                        onPress={ () => {
                            Alert.alert("go to product page")
                        }}
                        product = "Furniture"
                    />
                </View>
                <View style={styles.button}>
                    <CategoryButton
                        onPress={ () => {
                            Alert.alert("go to product page")
                        }}
                        product = "Food"
                    />
                    <CategoryButton
                        onPress={ () => {
                            Alert.alert("go to product page")
                        }}
                        product = "Plants"
                    />
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
        paddingLeft: 30
    },
    sectionHeader: {
        fontSize: 25,
        fontWeight: "bold",
        marginTop: 35,
        paddingLeft: 20,
        paddingBottom: 15,
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
