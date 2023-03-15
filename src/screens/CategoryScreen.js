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

const listingData = [
    {
        listingPhoto:
            "https://re-mm-assets.s3.amazonaws.com/product_photo/46595/large_large_Poly_Lime_374u_1471509935.jpg",
        listingPrice: 10,
        listingName: "magic pants",
        listingDescription: "these are pants!",
        category: ["clothing", "menswear", "bottoms"],
        condition: 1,
    },
    {
        listingPhoto:
            "https://re-mm-assets.s3.amazonaws.com/product_photo/46595/large_large_Poly_Lime_374u_1471509935.jpg",
        listingPrice: 7,
        listingName: "vintage shirt",
        listingDescription: "these are from the 90s!",
        category: ["clothing", "menswear", "tops"],
        condition: 1,
    },
    {
        listingPhoto:
            "https://re-mm-assets.s3.amazonaws.com/product_photo/46595/large_large_Poly_Lime_374u_1471509935.jpg",
        listingPrice: 20,
        listingName: "lava lamp",
        listingDescription:
            "I got scared of lava lamps, so I don't use anymore!",
        category: ["homegoods", "bedroom", "lights"],
        condition: 1,
    },
    {
        listingPhoto:
            "https://re-mm-assets.s3.amazonaws.com/product_photo/46595/large_large_Poly_Lime_374u_1471509935.jpg",
        listingPrice: 20,
        listingName: "lava lamp",
        listingDescription:
            "I got scared of lava lamps, so I don't use anymore!",
        category: ["homegoods", "bedroom", "lights"],
        condition: 1,
    }, 
    {
        listingPhoto:
            "https://re-mm-assets.s3.amazonaws.com/product_photo/46595/large_large_Poly_Lime_374u_1471509935.jpg",
        listingPrice: 20,
        listingName: "lava lamp",
        listingDescription:
            "I got scared of lava lamps, so I don't use anymore!",
        category: ["homegoods", "bedroom", "lights"],
        condition: 1,
    },
    {
        listingPhoto:
            "https://re-mm-assets.s3.amazonaws.com/product_photo/46595/large_large_Poly_Lime_374u_1471509935.jpg",
        listingPrice: 20,
        listingName: "lava lamp",
        listingDescription:
            "I got scared of lava lamps, so I don't use anymore!",
        category: ["homegoods", "bedroom", "lights"],
        condition: 1,
    },
    {
        listingPhoto:
            "https://re-mm-assets.s3.amazonaws.com/product_photo/46595/large_large_Poly_Lime_374u_1471509935.jpg",
        listingPrice: 20,
        listingName: "lava lamp",
        listingDescription:
            "I got scared of lava lamps, so I don't use anymore!",
        category: ["homegoods", "bedroom", "lights"],
        condition: 1,
    },
    {
        listingPhoto:
            "https://re-mm-assets.s3.amazonaws.com/product_photo/46595/large_large_Poly_Lime_374u_1471509935.jpg",
        listingPrice: 20,
        listingName: "lava lamp",
        listingDescription:
            "I got scared of lava lamps, so I don't use anymore!",
        category: ["homegoods", "bedroom", "lights"],
        condition: 1,
    },
    {
        listingPhoto:
            "https://re-mm-assets.s3.amazonaws.com/product_photo/46595/large_large_Poly_Lime_374u_1471509935.jpg",
        listingPrice: 20,
        listingName: "lava lamp",
        listingDescription:
            "I got scared of lava lamps, so I don't use anymore!",
        category: ["homegoods", "bedroom", "lights"],
        condition: 1,
    },
    {
        listingPhoto:
            "https://re-mm-assets.s3.amazonaws.com/product_photo/46595/large_large_Poly_Lime_374u_1471509935.jpg",
        listingPrice: 20,
        listingName: "lava lamp",
        listingDescription:
            "I got scared of lava lamps, so I don't use anymore!",
        category: ["homegoods", "bedroom", "lights"],
        condition: 1,
    },
    {
        listingPhoto:
            "https://re-mm-assets.s3.amazonaws.com/product_photo/46595/large_large_Poly_Lime_374u_1471509935.jpg",
        listingPrice: 20,
        listingName: "lava lamp",
        listingDescription:
            "I got scared of lava lamps, so I don't use anymore!",
        category: ["homegoods", "bedroom", "lights"],
        condition: 1,
    },
    {
        listingPhoto:
            "https://re-mm-assets.s3.amazonaws.com/product_photo/46595/large_large_Poly_Lime_374u_1471509935.jpg",
        listingPrice: 20,
        listingName: "lava lamp",
        listingDescription:
            "I got scared of lava lamps, so I don't use anymore!",
        category: ["homegoods", "bedroom", "lights"],
        condition: 1,
    },
    {
        listingPhoto:
            "https://re-mm-assets.s3.amazonaws.com/product_photo/46595/large_large_Poly_Lime_374u_1471509935.jpg",
        listingPrice: 20,
        listingName: "lava lamp",
        listingDescription:
            "I got scared of lava lamps, so I don't use anymore!",
        category: ["homegoods", "bedroom", "lights"],
        condition: 1,
    },
];

const CategoryScreen = ({navigation, route}) => {
    const { category } = route.params;
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
                <Text style={styles.header}> {category} </Text>
            </View>
            <View>
                <FlatList
                    style={{width: "100%", height: "95%"}}
                    data={listingData}
                    horizontal={false}
                    numColumns={2}
                    renderItem={({ item }) => {
                        return (
                            <BigListing
                                listingPhoto={item.listingPhoto}
                                listingPrice={item.listingPrice}
                                listingName={item.listingName}
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