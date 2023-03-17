import React from "react";
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
} from "react-native";
import { Dim } from "../Constants";

const Category = (props) => {
  return (
    <TouchableOpacity onPress={ props.onPress }>
      <View style={styles.container}>
        <Image
          source={{ uri: props.photo }}
          style={ styles.photo }
        />
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            {props.product}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    marginRight: 5,
    borderRadius: 10,
    width: Dim.width * 0.4,
    height: Dim.width * 0.4,
  },
  photo: {
    borderRadius: 10,
    width: Dim.width * 0.4 - 3,
    height: Dim.width * 0.4 - 3,
  },
  textContainer: {
    width: Dim.width * 0.4,
    height: Dim.width * 0.4,
    justifyContent: "center",
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    position: "absolute",
  },
  text: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  }

})

export default Category;