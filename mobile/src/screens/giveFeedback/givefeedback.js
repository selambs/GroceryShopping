import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { RadioButton } from "react-native-paper";

import { AuthenticationContext } from "../../context/context";

export default function feedback({ navigation: { navigate } }) {
  const { token, getFarmerId } = useContext(AuthenticationContext);

  const [selectedValue, setSelectedValue] = useState("Excellent");
  const [feedback, setFeedback] = useState("Enter Your Feedback Here...");

  const clickhandler = async (rate, feedback) => {
    let id = await getFarmerId();
    console.log(id);
    await axios.post(
      `http://localhost:3000/api/customer/farmers/${id}`,
      { rate: rate, feedback: feedback },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    Alert.alert("Thank you!");
  };

  return (
    <View style={styles.container}>
      <View style={styles.textAreaContainer}>
        <Text style={styles.title}>We'd love your rate and feedback!</Text>
        <Text>
          <Text style={styles.note}>Please note: </Text>
          <Text>
            For help with your order and any other issues, contact Farmer.
          </Text>
        </Text>
        <View style={styles.selectionBox}>
          <RadioButton.Group
            onValueChange={(value) => {
              setSelectedValue(value);
            }}
            value={selectedValue}
          >
            <View style={styles.selectionBox}>
              <Text style={styles.textStyles}>Excellent</Text>
              <RadioButton value="Excellent" />
            </View>
            <View style={styles.selectionBox}>
              <Text style={styles.textStyles}>Good</Text>
              <RadioButton value="Good" />
            </View>
            <View style={styles.selectionBox}>
              <Text style={styles.textStyles}>Bad</Text>
              <RadioButton value="Bad" />
            </View>
          </RadioButton.Group>
        </View>
        <TextInput
          multiline={true}
          numberOfLines={4}
          keyboardType="default"
          style={styles.textArea}
          onChangeText={(text) => {
            setFeedback(text);
          }}
          placeholder={feedback}
        />
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => clickhandler(selectedValue, feedback)}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 100,
    alignContent: "center",
  },
  selectionBox: {
    margin: 10,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  textStyles: {
    fontFamily: "Times New Roman",
    fontWeight: "bold",
  },
  note: { fontFamily: "Times New Roman", fontWeight: "bold" },
  textAreaContainer: {
    justifyContent: "center",
    alignContent: "center",
    padding: 10,
  },
  textArea: {
    height: 80,
    borderWidth: 1,
    borderColor: "#000000",
    borderBottomWidth: 3,
    borderRadius: 13,
  },
  title: {
    fontWeight: "bold",
    alignSelf: "center",
    margin: 20,
    fontSize: 16,
  },
  buttonStyle: {
    marginTop: 15,
    alignSelf: "center",
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 400,
    borderRadius: 10,
    backgroundColor: "#000000",
  },
  buttonText: { color: "#FFFFFF", fontWeight: "bold" },
});
