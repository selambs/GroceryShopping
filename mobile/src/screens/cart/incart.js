import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AsyncStorage } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Alert,
  Image,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { AuthenticationContext } from "../../context/context";
import { ScrollView } from "react-native-gesture-handler";

export default function shoppingCart({ navigation: { navigate } }) {
  const [items, setCart] = useState({
    cart: [],
    totalPrice: 0,
    message: null,
  });

  const { token, getFarmerId } = useContext(AuthenticationContext);

  useEffect(() => {
    inCart();
  }, []);

  //http requests for the necessary tasks
  const inCart = async () => {
    let result = await axios.get("http://localhost:3000/api/customer", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (result.data.itemsInCart.items.length == 0) {
      setCart((prevState) => ({
        ...prevState,
        message: "Your Shopping cart is empty",
      }));
    } else {
      setCart((prevState) => ({
        ...prevState,
        cart: result.data.itemsInCart.items,
        totalPrice: result.data.itemsInCart.totalPrice,
      }));
    }
  };

  const placeOrderHandler = async (productsInCart) => {
    let id = await getFarmerId();
    await axios.post(
      "http://localhost:3000/api/customer/order",
      { orders: productsInCart, farmerId: id },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    setCart((prevState) => ({
      ...prevState,
      cart: [],
      totalPrice: 0,
      message: null,
    }));

    await AsyncStorage.removeItem("farmerId");

    Alert.alert(
      "Order Placed",
      "Do you want to give feed back?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancelled"),
          style: "cancel",
        },
        { text: "OK", onPress: () => navigate("Give Us Feedback") },
      ],
      { cancelable: false }
    );
  };

  //navigation to other pages
  const shopHandler = () => {
    navigate("Farmer");
  };

  const clearCartHandler = async () => {
    await axios.post("http://localhost:3000/api/customer", " ", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    setCart((prevState) => ({
      ...prevState,
      cart: [],
      totalPrice: 0,
      message: "Your Shopping cart is empty",
    }));

    await AsyncStorage.removeItem("farmerId");
  };

  const deleteclickListener = async (prodId) => {
    await axios.delete(
      `http://localhost:3000/api/customer/farmer/products/${prodId}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  };

  return (
    <ScrollView>
      <SafeAreaView>
        {items.message ? (
          <View>
            <Text style={styles.emptyCart}>{items.message}</Text>

            <TouchableOpacity
              style={[styles.buttonContainer, styles.shopButton]}
              onPress={() => shopHandler()}
            >
              <Text>Shop now</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <View>
              <View>
                <TouchableOpacity
                  style={[styles.buttonContainer, styles.clearButton]}
                  onPress={() => clearCartHandler()}
                >
                  <Text style={styles.buttonText}>Clear Cart</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={[styles.placeOrderContainer, styles.shopButton]}
                onPress={() => placeOrderHandler(items.cart)}
              >
                <Text>Place Order</Text>
              </TouchableOpacity>

              <View>
                <Text style={styles.subtotal}>
                  Subtotal:-
                  <Text style={{ color: "red" }}>$ {items.totalPrice}</Text>
                </Text>
              </View>
            </View>

            <FlatList
              enableEmptySections={true}
              data={items.cart}
              renderItem={({ item }) => {
                return (
                  <View style={styles.box}>
                    <Image style={styles.image} source={{ uri: item.image }} />
                    <View style={styles.boxContent}>
                      <Text style={styles.itemName}>{item.itemName}</Text>
                      <Text style={styles.price}>
                        ${item.price} Qty -{item.quantity}
                      </Text>
                      <Text style={styles.inventory}>
                        only {item.inventory} left in stock.
                      </Text>
                      <View style={styles.buttons}>
                        <TouchableHighlight
                          style={[styles.button, styles.profile]}
                          onPress={() => deleteclickListener(item.productId)}
                        >
                          <Text>Delete</Text>
                        </TouchableHighlight>
                      </View>
                    </View>
                  </View>
                );
              }}
              keyExtractor={(item) => item._id}
            />
          </View>
        )}
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
  },
  box: {
    padding: 20,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: "white",
    flexDirection: "row",
  },
  boxContent: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    marginLeft: 10,
  },
  subtotal: {
    padding: 10,
    marginTop: 5,

    alignSelf: "center",
    flexDirection: "row",
  },
  emptyCart: {
    flex: 1,
    color: "red",
    marginTop: 40,
    alignSelf: "center",
  },
  itemName: {
    fontSize: 18,
    color: "#151515",
  },
  price: {
    fontSize: 15,
    color: "#646464",
  },
  inventory: {
    fontSize: 15,
    color: "red",
  },
  buttons: {
    flexDirection: "row",
  },
  button: {
    height: 35,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: 50,
    marginRight: 5,
    marginTop: 5,
  },
  icon: {
    width: 20,
    height: 20,
  },
  view: {
    backgroundColor: "#FF1493",
  },
  profile: {
    backgroundColor: "#1E90FF",
  },
  message: {
    backgroundColor: "#228B22",
  },
  buttonContainer: {
    marginTop: 40,
    alignSelf: "center",
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  shopButton: {
    backgroundColor: "#00b5ec",
  },
  clearButton: { backgroundColor: "#FF0000" },
  buttonText: { fontWeight: "bold", color: "white", fontSize: 15 },
  placeOrderContainer: {
    marginTop: 10,
    alignSelf: "center",
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
});
