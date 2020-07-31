import React, { useState } from "react";
import axios from "axios";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Image,
  Alert,
  ScrollView,
} from "react-native";

import { MaterialIcons, Entypo } from "@expo/vector-icons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function signup({ navigation: { navigate } }) {
  const [userInput, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errorMesseges, setMessege] = useState({ messege: "" });

  const signupInputHandle = async () => {
    try {
      let user = await axios.post(
        "http://localhost:3000/api/customer/signup",
        {
          firstName: userInput.firstName,
          lastName: userInput.lastName,
          email: userInput.email,
          password: userInput.password,
        }
      );
      if (user.data.status == "ok") {
        Alert.alert(
          "Account Created!",
          "Account Successfully created!",
          [{ text: "OK", onPress: () => navigate("Login") }],
          { cancelable: false }
        );
      } else {
        setMessege(() => ({
          ...errorMesseges,
          messege: user.data.messege,
        }));
      }
    } catch (error) {
      console.log(error.messege);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <Text style={styles.errMsg}>{errorMesseges.messege}</Text>
        </View>

        <View style={styles.inputContainer}>
          <Entypo
            name="user"
            size={24}
            color="#00b5ec"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.inputs}
            placeholder="First Name"
            underlineColorAndroid="transparent"
            onChangeText={(firstName) =>
              setData({ ...userInput, firstName: firstName })
            }
          />
        </View>

        <View style={styles.inputContainer}>
          <Entypo
            name="user"
            size={24}
            color="#00b5ec"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.inputs}
            placeholder="Last Name"
            underlineColorAndroid="transparent"
            onChangeText={(lastName) =>
              setData({ ...userInput, lastName: lastName })
            }
          />
        </View>

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
            onChangeText={(email) => setData({ ...userInput, email: email })}
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
              setData({ ...userInput, password: password })
            }
          />
        </View>

        <TouchableHighlight
          style={[styles.buttonContainer, styles.signupButton]}
          onPress={() => signupInputHandle()}
        >
          <Text style={styles.signupText}>Signup</Text>
        </TouchableHighlight>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  signupButton: {
    backgroundColor: "#00b5ec",
  },
  signupText: {
    color: "white",
  },
  errMsg: { color: "red", marginBottom: 20 },
});
