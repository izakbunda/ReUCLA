<<<<<<< HEAD
import { useEffect } from "react";
import { 
=======
import { useEffect, useState } from "react";
import {
>>>>>>> main
    View,
    StyleSheet,
    Text,
    SafeAreaView,
    FlatList,
    Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import BigListing from "../components/BigListing";
import { Dim } from "../Constants";

const CategoryScreen = ({navigation, route}) => {
<<<<<<< HEAD
    const { category } = route.params;
    const {listings, setListings} = useEffect(null)
    useEffect(()=> {

    },[])
    const getListings = () => {
        const res = await fetch("http://localhost:4000/listings/fetch/categories", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ category }),
        })
        const json = await res.json();
        setListings(json);
    }
=======
    const { categoryName , category, gender, subcategory} = route.params;
    const [data, setData] = useState([])

    useEffect(() => {
        fetch(
            `http://localhost:4000/listings/${category}/${gender}/${subcategory}`
        )
            .then((res) => res.json())
            .then((data) => {
                setData(data.listingData);
            })
            .catch((error) => {
                console.error('Error:', error);
                return error;
            })
    }, [])

>>>>>>> main
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Icon
                    name={"arrow-left"}
                    size={28}
                    color={"#2F6B25"}
                    onPress={() => navigation.goBack()}
                    style={styles.icon}
                />
                <Text style={styles.header}> {categoryName} </Text>
            </View>
<<<<<<< HEAD
            <View>
                {listings == null ? <View></View> : 
=======
            <View style={styles.flatListcontainer}>
>>>>>>> main
                <FlatList
                    style={{ width: "100%", height: "95%" }}
                    data={data}
                    horizontal={false}
                    numColumns={2}
                    renderItem={({ item }) => {
                        return (
                            <BigListing
<<<<<<< HEAD
                                listingPhoto={"https://picsum.photos/300/300"} // TODO - change to actual photo
                                listingPrice={item.price}
                                listingName={item.title}
=======
                                listingPhoto={item.photoPath}
                                price={item.price}
                                title={item.title}
>>>>>>> main
                                onPress={() => {
                                    navigation.navigate("")
                                }}
                            />
                        );
                    }}
                />
}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: Dim.height * 0.05,
    },
    flatListcontainer: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
        flex: 1,
        width: Dim.width * 0.9,
        // height: Dim.height * 0.05,
    },
    header: {
        fontSize: 20,
        fontWeight: "bold",
    },
    icon: {
        position: "absolute",
        left: 20,
    },
});

export default CategoryScreen;
