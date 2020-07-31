import React, { useEffect, useState, useMemo, useContext } from "react";
import { AsyncStorage } from "react-native";
import { StyleSheet, View, ActivityIndicator } from "react-native";

import { AuthenticationContext } from "./src/context/context";
import Navbar from "./src/navigation/navbar";

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [userToken, setToken] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const [farmerId, setFarmerId] = useState({});

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    (async () => {
      let token = await AsyncStorage.getItem("userToken");
      let user = await AsyncStorage.getItem("userInfo");

      if (token !== null) {
        setToken(token);
        setUserInfo(JSON.parse(user));
      }
    })();
  }, []);

  const authContext = {
    logIn: async (token, userInformation) => {
      setToken(token);
      await AsyncStorage.setItem("userToken", token);
      await AsyncStorage.setItem("userInfo", JSON.stringify(userInformation));

      setLoading(false);
    },
    signUp: () => {
      setToken(null);
      setLoading(false);
    },
    signOut: async () => {
      await AsyncStorage.removeItem("userToken");
      setToken(null);
      await AsyncStorage.removeItem("userInfo");
      await AsyncStorage.removeItem("farmerId");
      setLoading(false);
    },
    addTocart: async (id) => {
      await AsyncStorage.setItem("farmerId", id);
      setFarmerId(id);
    },
    getFarmerId: async () => {
      return await AsyncStorage.getItem("farmerId");
    },
    token: userToken,
    userInfo: userInfo,
  };

  if (isLoading) {
    return (
      <View style={styles.activityIndicator}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AuthenticationContext.Provider value={authContext}>
      <View style={styles.container}>
        <Navbar></Navbar>
      </View>
    </AuthenticationContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: { flex: 1, alignItems: "center", justifyContent: "center" },
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
});
