import React, { useEffect, useContext } from "react";
import axios from "axios";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { AuthenticationContext } from "../../context/context";

export default function productList({ route: { params } }) {
  const { farmerData } = params;

  const { token, addTocart, getFarmerId } = useContext(AuthenticationContext);

  const addToCartHandler = async (item, id) => {
    let farmerId = await getFarmerId();

    if (farmerId == null) {
      addTocart(id);

      await axios.post("http://localhost:3000/api/customer/farmers", item, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    } else if (farmerId == id) {
      await axios.post("http://localhost:3000/api/customer/farmers", item, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    } else if (farmerId != id) {
      Alert.alert(
        "Not allowed to add from different farmer",
        "Do you want to add from a another farmer?",
        [
          {
            text: "No",
            onPress: () => console.log("Cancelled"),
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: async () => {
              addTocart(id);

              //clear the cart before adding new
              await axios.post("http://localhost:3000/api/customer", " ", {
                headers: {
                  Authorization: "Bearer " + token,
                },
              });

              //add product to cart
              await axios.post(
                "http://localhost:3000/api/customer/farmers",
                item,
                {
                  headers: {
                    Authorization: "Bearer " + token,
                  },
                }
              );

            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContainer}
        data={farmerData.products}
        horizontal={false}
        numColumns={2}
        keyExtractor={(item) => {
          return item._id;
        }}
        ItemSeparatorComponent={() => {
          return <View style={styles.separator} />;
        }}
        renderItem={(post) => {
          const item = post.item;
          return (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.title}>{item.itemName}</Text>
                  <Text style={styles.price}>${item.price}</Text>
                </View>
              </View>

              <Image style={styles.cardImage} source={{ uri: item.image }} />

              <View style={styles.cardHeader}>
                <Text style={styles.title}>Detail: {item.detail}</Text>
              </View>

              <View style={styles.cardFooter}>
                <View style={styles.socialBarContainer}>
                  <TouchableOpacity
                    style={styles.socialBarButton}
                    onPress={() => addToCartHandler(item, farmerData._id)}
                  >
                    <MaterialIcons
                      name="shopping-cart"
                      color="blue"
                      size={26}
                    />
                    <Text style={[styles.socialBarLabel, styles.buyNow]}>
                      Add To Cart
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  list: {
    paddingHorizontal: 5,
    backgroundColor: "#E6E6E6",
  },
  listContainer: {
    alignItems: "center",
  },
  separator: {
    marginTop: 10,
  },
  /******** card **************/
  card: {
    shadowColor: "#00000021",
    shadowOffset: {
      width: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor: "white",
    flexBasis: "47%",
    marginHorizontal: 5,
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage: {
    flex: 1,
    height: 150,
    width: null,
  },
  /******** card components **************/
  title: {
    fontSize: 18,
    flex: 1,
  },
  price: {
    fontSize: 16,
    color: "green",
    marginTop: 5,
  },
  buyNow: {
    color: "purple",
  },
  icon: {
    width: 25,
    height: 25,
  },
  /******** social bar ******************/
  socialBarContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
  },
  socialBarSection: {
    justifyContent: "center",
    flexDirection: "row",
    flex: 1,
  },
  socialBarlabel: {
    marginLeft: 8,
    alignSelf: "flex-end",
    justifyContent: "center",
  },
  socialBarButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
