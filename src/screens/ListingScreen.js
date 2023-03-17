import React, { useEffect } from "react";
import {
    View,
    StyleSheet,
    Text,
    Image,
    ScrollView,
    Alert
} from "react-native";
import { AlignCenter, List } from "react-native-feather";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../components/Button.js";
import SaveButton from "../components/SaveButton.js";
import AsyncStorage from "@react-native-async-storage/async-storage";


// import CategoryButton from "../components/CategoryButton";



// const ProfileScreen = ({ navigation, props }) => {
//     const [firstName, setFirstName] = useState("");
//     const [lastName, setLastName] = useState("");
//     const [bio, setBio] = useState("");
//     const [major, setMajor] = useState("");
//     const [instagram, setInstagram] = useState("");
//     const [discord, setDiscord] = useState("");
//     const [twitter, setTwitter] = useState("");
//     const [pfp, setPfp] = useState("");

//     // console.log("LAST NAME FROM SIGN IN:" + item);
//     // console.log("LAST NAME FROM SIGN IN:" + item);
//     // console.log("BIO FROM SIGN IN:" + item);
//     // console.log("MAJOR FROM SIGN IN:" + item);
//     // console.log("INSTAGRAM FROM SIGN IN:" + item);

//     useEffect(() => {
//         AsyncStorage.getItem("@firstName", (err, item) => {
//             // console.log("FIRST NAME FROM SIGN IN:" + item);
//             setFirstName(item);
//         });
//         AsyncStorage.getItem("@lastName", (err, item) => {
//             // console.log("LAST NAME FROM SIGN IN:" + item);
//             setLastName(item);
//         });



//     }, [])};

const Dummy = () => {
    const testListings = [
        {  
            title: "Red Vintage Sweater",
            image: "https://i.pinimg.com/474x/1a/35/f9/1a35f9e6d3221a9daf34387f90ea2079.jpg",
            price: "15",
            description: "This is a really nice red shirt. It is vintage from my closet.",
            size: "L",
            condition: "New",
            category: "Clothes",
            subcategory: "Tops",
            gender: "Male",
            sellerName: "Nate Stevenson",
            sellerCity: "Las Vegas, Nevada",
            sellerRating: 5,
        }
    ];
    return ListingScreen(testListings[0])
}

const ListingScreen = (props) => {
    useEffect(()=> {
        console.log(props)
    },[])
    return (
        <ScrollView>
        <SafeAreaView>
            <Image
                style={styles.image}
                source={{
                uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
                }}
            />
            <Text style={styles.title}>{props.title}</Text>

            <View style={{flexDirection: 'row', 
                    textAlign: 'center',
                    borderColor: 'black',
                    justifyContent:'center'
                    }}>
                <Text style={styles.price}>${props.price}</Text>
                <Text style={styles.size}>Size: {props.size}</Text>
                <Text style={styles.condition}>Condition: {props.condition}</Text>
            </View>


            <View style={{flexDirection: 'row', 
                    textAlign: 'center',
                    borderColor: 'black',
                    justifyContent:'center'
                    }}>
                <Text style={styles.category}>{props.category}</Text>
                <Text style={styles.subcategory}>{props.subcategory}</Text>
                <Text style={styles.gender}>Gender: {props.gender}</Text>
            </View>

            <Text style={styles.description}>Description: {props.description}</Text>
            <Text style={styles.about}>About the Seller:</Text>

            <View style={{flexDirection: 'row', 
                        textAlign: 'center',
                        borderColor: 'black',
                        justifyContent:'center'
                        }}>
                        
                        <View>
                        <Image
                            style={styles.profileImage}
                            source={{
                            uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
                            }}
                        />    
                        </View>            
                        
                        <View style={styles.profileInfo}>
                            <Text style={styles.sellerName}>{props.sellerName}</Text>
                            {/* <Text style={styles.sellerName}>{firstName + " " + lastName}</Text> */}
                            <Text style={styles.sellerCity}>{props.sellerCity}</Text>
                            <Text style={styles.sellerRating}>Rating: {props.sellerRating} stars</Text>
                        </View>

            </View>
            <SaveButton 
                onPress={ () => {
                Alert.alert("Item has been saved to bag.")
            }}
            label="Save Item"
            />

        </SafeAreaView>
        </ScrollView>

    );
};

const styles = StyleSheet.create({
    image: {
        width: 150,
        height: 150,
        marginTop: 12,
        alignSelf: 'center',

    },

    title: {
        paddingTop: 6,
        color: '#20232a',
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
      },

    price: {
      paddingVertical: 6,
      paddingHorizontal: 30,
      flex: 1,
      color: '#20232a',
      textAlign: 'center',
      fontSize: 25,
      fontWeight: 'bold',
    //   backgroundColor: 'red'
    
    },


      size: {
        paddingVertical: 6,
        paddingHorizontal: 30,
        flex: 1,
        // backgroundColor: 'blue',
        color: '#20232a',
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'normal',
      },
      condition: {
        paddingVertical: 6,
        paddingHorizontal: 30,
        flex: 2,
        // backgroundColor: 'blue',
        color: '#20232a',
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'normal',

      },
      category: {
        paddingVertical: 6,
        paddingHorizontal: 30,
        flex: 1,
        // backgroundColor: 'blue',
        color: '#20232a',
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'normal',
      },
      subcategory: {
        paddingVertical: 6,
        paddingHorizontal: 30,
        flex: 2,
        // backgroundColor: 'blue',
        color: '#20232a',
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'normal',

      },
      gender: {
        paddingVertical: 6,
        paddingHorizontal: 30,
        flex: 2,
        // backgroundColor: 'blue',
        color: '#20232a',
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'normal',
      },

      description: {
        fontweight:'normal',  // bold=700, heavy=900
        fontSize: 16,
        paddingHorizontal: 24,
        paddingVertical: 10,
        backgroundColor: '#eaeaea',
      },

      about: {
        fontweight:'normal',  // normall = 400, bold=700, heavy=900
        fontSize: 20,
        paddingBottom: 24,
        paddingHorizontal: 24,
        backgroundColor: '#eaeaea',
        textAlign: 'left',
   
      },

      profileImage:
      {
        width: 50,
        height: 50,
        // marginTop: 12,
        alignSelf: 'center',
        flex: 1,
        backgroundColor: 'red',
      },

      profileInfo:
      {
        flexDirection: 'column', 
        textAlign: 'center',
        borderColor: 'green',
        borderWidth: 8,
        justifyContent:'center',
        flex: 9,
      },
      sellerName: {
        paddingVertical: 2,
        borderWidth: 4,
        paddingHorizontal: 4,
        textAlign: 'left',
        fontSize: 30,
        fontWeight: 'bold',
      },
      sellerCity: {
        paddingVertical: 2,
        borderWidth: 4,
        paddingHorizontal: 4,
        textAlign: 'left',
        fontSize: 30,
        fontWeight: 'bold',
      },
      sellerRating: {
        paddingVertical: 2,
        borderWidth: 4,
        paddingHorizontal: 4,
        textAlign: 'left',
        fontSize: 30,
        fontWeight: '',
      },

  });
  
export {ListingScreen, Dummy, g};

