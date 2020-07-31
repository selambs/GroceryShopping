import "react-native-gesture-handler";
import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import LogIn from "../screens/loginForm/loginForm";
import SignUp from "../screens/signup/signup";
import FarmersList from "../screens/farmersList/farmersList";
import ProductsList from "../screens/productsList/productsList";
import InCart from "../screens/cart/incart";
import MenuOptions from "../screens/menu/menu";
import Orderhistory from "../screens/orderhistory/orderhistory";
import GiveFeedback from "../screens/giveFeedback/givefeedback";

import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

const Stack = createStackNavigator();
const BottomTab = createMaterialBottomTabNavigator();

import { AuthenticationContext } from "../context/context";

function Home() {
  return (
    <BottomTab.Navigator
      barStyle={{ backgroundColor: "#E6E6FA" }}
      labeled={false}
    >
      <BottomTab.Screen
        name="Farmer"
        component={FarmersList}
        options={{
          title: "Farmers List",
          tabBarIcon: ({ black }) => (
            <MaterialCommunityIcons name="home" color={black} size={26} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Shopping Cart"
        component={InCart}
        options={{
          title: "Cart",
          tabBarIcon: ({ black }) => (
            <MaterialIcons name="shopping-cart" color={black} size={26} />
          ),
        }}
      />
      <BottomTab.Screen
        name="menu"
        component={MenuOptions}
        options={{
          title: "Menu",
          tabBarIcon: ({ black }) => (
            <MaterialIcons name="menu" color={black} size={26} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

const NavigationBar = () => {
  const { token } = useContext(AuthenticationContext);

  return (
    <NavigationContainer>
      <Stack.Navigator labeled={false}>
        {!token ? (
          <>
            <Stack.Screen
              name="Login"
              component={LogIn}
              options={{ title: "Login", headerShown: false }}
            />
            <Stack.Screen name="Signup" component={SignUp} />
          </>
        ) : (
          <>
            <Stack.Screen name="Farmer List" component={Home} />
            <Stack.Screen name="Products List" component={ProductsList} />
            <Stack.Screen name="Order History" component={Orderhistory} />
            <Stack.Screen name="Give Us Feedback" component={GiveFeedback} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationBar;
