import { useEffect, useState } from "react";
import {
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

const SearchScreen = ({ navigation, route }) => {
    const title = route.params.title;
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:4000/listings/${title}`)
            .then((res) => res.json())
            .then((data) => {
                setData(data.listingData);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);

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
                <Text style={styles.header}> {"Search Screen"} </Text>
            </View>
            <View style={styles.flatListcontainer}>
                <FlatList
                    style={{ width: "100%", height: "95%" }}
                    data={data}
                    horizontal={false}
                    numColumns={2}
                    renderItem={({ item }) => {
                        return (
                            <BigListing
                                listingPhoto={item.photoPath}
                                price={item.price}
                                title={item.title}
                                onPress={() => {
                                    Alert.alert("go to listing screen");
                                }}
                            />
                        );
                    }}
                />
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

export default SearchScreen;
