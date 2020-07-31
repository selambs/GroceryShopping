import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { Entypo, Feather, FontAwesome } from "@expo/vector-icons";

import { AuthenticationContext } from "../../context/context";

export default function userProfileView({ navigation: { navigate } }) {
  const { signOut, userInfo } = useContext(AuthenticationContext);

  //navigate to the selected screen
  const orderhistoryScreenHandler = () => {
    navigate("Order History");
  };

  const settingScreenHandler = () => {
    console.log("Nothing to Set");
  };

  const logoutScreenHandler = async () => {
    try {
      await signOut();

      navigate("Login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image
            style={styles.avatar}
            source={{
              uri: "https://bootdey.com/img/Content/avatar/avatar6.png",
            }}
          />

          <Text style={styles.name}>{userInfo.firstName}</Text>
          <Text style={styles.userInfo}>{userInfo.lastName} </Text>
          <Text style={styles.userInfo}>{userInfo.email} </Text>
        </View>
      </View>

      <View style={styles.body}>
        <TouchableOpacity
          style={[styles.buttonContainer, styles.signupButton]}
          onPress={() => orderhistoryScreenHandler()}
        >
          <FontAwesome name="history" size={24} color="black" />
          <Text style={styles.buttonText}>Order History</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.buttonContainer, styles.signupButton]}
          onPress={() => settingScreenHandler()}
        >
          <Feather name="settings" size={24} color="black" />
          <Text style={styles.buttonText}>Account Setting</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.buttonContainer, styles.signupButton]}
          onPress={() => logoutScreenHandler()}
        >
          <Entypo name="log-out" size={24} color="black" />
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#DCDCDC",
  },
  headerContent: {
    padding: 30,
    alignItems: "center",
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    color: "#000000",
    fontWeight: "600",
  },
  userInfo: {
    fontSize: 16,
    color: "#778899",
    fontWeight: "600",
  },
  body: {
    backgroundColor: "#778899",
    height: 500,
    alignItems: "center",
  },

  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    alignItems: "center",
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    marginTop: 20,
    width: 250,
    borderRadius: 30,
  },
  buttonText: { marginLeft: 20 },
});
