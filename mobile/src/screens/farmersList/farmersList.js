import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import { StyleSheet, Text, View, Image, SafeAreaView } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";

import { AuthenticationContext } from "../../context/context";

export default function farmersList({ navigation: { navigate } }) {
  const [state, setData] = useState({ farmersList: null });

  const { token } = useContext(AuthenticationContext);

  useEffect(() => {
    listOfFarmers();
  }, []);

  const listOfFarmers = async () => {
    const res = await axios.get("http://localhost:3000/api/customer/farmers", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    setData((prev) => ({ ...prev, farmersList: res.data.farmers }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.contentList}
        columnWrapperStyle={styles.listContainer}
        data={state.farmersList}
        keyExtractor={(item) => {
          return item._id;
        }}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() => {
                navigate("Products List", { farmerData: item });
              }}
            >
              <Image style={styles.image} source={{ uri: item.logo }} />
              <View style={styles.cardContent}>
                <Text style={styles.name}>{item.companyname}</Text>
                <Text style={styles.count}>Rating: {item.rate}</Text>
              </View>
            </TouchableOpacity>
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
    backgroundColor: "#ebf0f7",
  },
  contentList: {
    flex: 1,
  },
  cardContent: {
    marginLeft: 20,
    marginTop: 10,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: "#ebf0f7",
  },

  card: {
    shadowColor: "#00000021",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    backgroundColor: "white",
    padding: 10,
    flexDirection: "row",
    borderRadius: 30,
  },

  name: {
    fontSize: 18,
    flex: 1,
    alignSelf: "center",
    color: "#3399ff",
    fontWeight: "bold",
  },
  count: {
    fontSize: 14,
    flex: 1,
    alignSelf: "center",
    color: "#6666ff",
  },
  productButton: {
    marginTop: 10,
    height: 35,
    width: 120,
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#dcdcdc",
  },
  rateButton: {
    marginTop: 10,
    height: 40,
    width: 150,
    padding: 10,
    marginLeft: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#dcdcdc",
  },
  productButtonText: {
    color: "#dcdcdc",
    fontSize: 14,
  },
});
