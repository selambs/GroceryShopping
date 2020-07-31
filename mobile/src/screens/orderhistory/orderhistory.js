import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  SafeAreaView,
} from "react-native";

import { AuthenticationContext } from "../../context/context";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";

export default function orderHistory({ navigation: { navigate } }) {
  const [orders, setOrders] = useState({ orderByTime: [], message: null });
  const [selectedValue, setSelectedValue] = useState("Order Date");

  const { token } = useContext(AuthenticationContext);

  useEffect(() => {
    getOrderHistory();
  }, []);

  const getOrderHistory = async () => {
    let response = await axios.get(
      "http://localhost:3000/api/customer/orderhistory",
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
   
    if (response.data.data.length <= 0) {
      setOrders((prevState) => ({
        ...prevState,
        message: "You don't have recent orders!",
      }));
    } else {
      setOrders((prevState) => ({
        ...prevState,
        orderByTime: response.data.data,
      }));
    }
  };

  const clickListener = () => {
    navigate("Farmer");
  };

  const filterByStatus = (val) => {
    if (val == "Order Date") {
      setOrders((prevState) => ({
        ...prevState,
        orderByTime: orders.orderByTime,
      }));
    } else if (val == "Pending") {
      orders.orderByTime.filter((item) => {
        if (item.orderStatus == "Pending") {
          console.log(item);
        }
      });
    } else if (val == "Ready") {
      // orders.orderByTime.filter((item) => {
      //   if (item.orderStatus == "Ready") {
      //     console.log(item);
      //   }
      // });
      console.log(orders);
    } else {
      orders.orderByTime.filter((item) => {
        if (item.orderStatus == "Complete") {
          console.log(item);
        }
      });
    }
  };

  return (
    <SafeAreaView>
      {orders.message ? (
        <View>
          <View>
            <Text style={styles.orderMsg}>{orders.message}</Text>
          </View>
        </View>
      ) : (
        <ScrollView>
          <View>
            <View>
              <Text style={styles.noOrderMsg}>Your Orders</Text>
            </View>
            {orders.orderByTime.map((item) =>
              item.items.map((order) => (
                <View style={styles.box} key={order._id}>
                  <Image style={styles.image} source={{ uri: order.image }} />
                  <View>
                    <Text style={styles.item}>
                      {order.itemName} (Qty {order.quantity})
                    </Text>
                    <View>
                      <View>
                        <Text style={styles.item}>{item.orderStatus}</Text>
                      </View>
                      <View>
                        <Text style={styles.item}>
                          {new Date(item.time).toLocaleString(undefined, {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.buttonBox}>
                      <TouchableHighlight onPress={() => clickListener()}>
                        <Text style={styles.buttons}>Buy Again</Text>
                      </TouchableHighlight>
                    </View>
                  </View>
                </View>
              ))
            )}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    fontFamily: "Times New Roman",
  },
  image: {
    width: 100,
    height: 100,
    paddingLeft: 10,
  },
  box: {
    padding: 20,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: "white",
    flexDirection: "row",
  },
  noOrderMsg: {
    padding: 10,
    marginTop: 5,
    fontWeight: "bold",
    alignSelf: "center",
    flexDirection: "row",
    fontFamily: "Times New Roman",
  },
  orderMsg: {
    flex: 1,
    color: "red",
    marginTop: 40,
    alignSelf: "center",
  },
  item: {
    fontFamily: "Times New Roman",
  },
  buttons: {
    textAlign: "center",
    justifyContent: "center",
    fontFamily: "Times New Roman",
    fontWeight: "bold",
  },
  buttonBox: {
    backgroundColor: "#D3D3D3",
    height: 25,
    width: 100,
  },
  pickerStyle: {
    flex: 1,
    flexDirection: "row",
    padding: 20,
    justifyContent: "space-around",
  },
});
