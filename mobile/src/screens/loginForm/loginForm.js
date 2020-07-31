import React, { useState, useContext } from "react";
import axios from "axios";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Alert,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import { AuthenticationContext } from "../../context/context";

export default function login({ navigation: { navigate } }) {
  const [state, setLogin] = useState({ email: "", password: "" });
  const [response, setData] = useState({ token: "" });

  const { logIn } = useContext(AuthenticationContext);

  const loginHandler = async () => {
    try {
      let user = await axios.post(
        "http://localhost:3000/api/customer/signin",
        {
          email: state.email,
          password: state.password,
        }
      );

      if (user.data.status == "ok") {
        setData({
          ...response,
          token: user.data.token,
        });

        logIn(user.data.token, user.data.userInformation);

        navigate("Farmer List");
      } else {
        Alert.alert(user.data.messege);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <MaterialIcons
          name="email"
          size={24}
          color="#00b5ec"
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.inputs}
          placeholder="Email"
          keyboardType="email-address"
          underlineColorAndroid="transparent"
          onChangeText={(email) => setLogin({ ...state, email: email })}
        />
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome5
          name="key"
          size={24}
          color="#00b5ec"
          style={styles.inputIcon}
        />

        <TextInput
          style={styles.inputs}
          placeholder="Password"
          secureTextEntry={true}
          underlineColorAndroid="transparent"
          onChangeText={(password) =>
            setLogin({ ...state, password: password })
          }
        />
      </View>

      <TouchableHighlight
        style={[styles.buttonContainer, styles.loginButton]}
        onPress={() => loginHandler()}
      >
        <Text style={styles.loginText}>Login</Text>
      </TouchableHighlight>

      <TouchableHighlight
        style={styles.buttonContainer}
        onPress={() => console.log("restore_password")}
      >
        <Text>Forgot your password?</Text>
      </TouchableHighlight>

      <TouchableHighlight
        style={styles.buttonContainer}
        onPress={() => navigate("Signup")}
      >
        <Text>Register</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DCDCDC",
    opacity: 0.8,
  },
  inputContainer: {
    alignItems: "center",
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: "center",
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: "white",
  },
});
