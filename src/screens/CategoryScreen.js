import { useEffect, useState } from "react";
import { 
    View,
    StyleSheet, 
    Text, 
    SafeAreaView, 
    FlatList, 
    Alert 
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import BigListing from "../components/BigListing";
import { Dim } from "../Constants";

const CategoryScreen = ({navigation, route}) => {
    const { categoryName , category, gender, subcategory} = route.params;
    const [data, setData] = useState([])

    useEffect(() => {
        fetch(`http://localhost:4000/listings/${category}/${gender}/${subcategory}`)
            .then((res) => res.json())
            .then((data) => { 
                setData(data.listingData);
            })
            .catch((error) => {
                console.error('Error:', error);
                return error;
            })
    }, [])

    return (
        <SafeAreaView style={{flex: 1}}>
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
            <View>
                <FlatList
                    style={{width: "100%", height: "95%"}}
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
                        )
                    }}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: Dim.height * 0.05
    },
    header: {
        fontSize: 20,
        fontWeight: "bold",
    },
    icon: {
        position: "absolute",
        left: 2,
    }
});

export default CategoryScreen; 