// In App.js in a new project

import * as React from "react";
import { View, Text, Image, Linking, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
  Feather,
} from "@expo/vector-icons";
import Login from "../userPage/Login/Login";
import Home from "../userPage/Home/Home";
import Camara from "../userPage/Camara/Camara";
import Articles from "../userPage/Articles/Articles";
import Profile from "../userPage/Profile/Profile";
import Pretest from "../userPage/Pretest/Pretest";
import Lesson from "../userPage/Lesson/Lesson";
import Test from "../userPage/Test/Test";
import Video from "../userPage/Video/Video";
import TestHistory from "../userPage/TestHistory/TestHistory";
import { tokenState } from "../recoil/recoil";
import { useRecoilState } from "recoil";
const { width, height } = Dimensions.get("screen");

const Stack = createStackNavigator();

function main() {
  const [token, setToken] = useRecoilState(tokenState);
  console.log(token);
  return (
    <Stack.Navigator headerMode="none" mode="modal" initialRouteName="Login">
      {token == null ? (
        <Stack.Screen name="Login" component={Login} />
      ) : (
        <Stack.Screen name="MyTabs" component={MyTabs} />
      )}

      <Stack.Screen name="Pretest" component={Pretest} />
      <Stack.Screen name="Lesson" component={Lesson} />
      <Stack.Screen name="Test" component={Test} />
      <Stack.Screen name="Video" component={Video} />
      <Stack.Screen name="TestHistory" component={TestHistory} />
    </Stack.Navigator>
  );
}
const Tab = createBottomTabNavigator();
function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
      tabBarOptions={{
        activeTintColor: "#CCCCCC",
        style: { height: 85 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size, focused }) => (
            <View
              style={{
                alignItems: "center",
                marginTop: 15,
              }}
            >
              <MaterialIcons
                name="laptop-chromebook"
                size={22}
                color={!focused ? "#9A9A9A" : "#805333"}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Camara"
        component={Camara}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ alignItems: "center", marginTop: 15 }}>
              <Feather
                name="camera"
                size={21}
                color={!focused ? "#9A9A9A" : "#805333"}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Articles"
        component={Articles}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ alignItems: "center", marginTop: 15 }}>
              <MaterialIcons
                name="my-library-books"
                size={22}
                color={!focused ? "#9A9A9A" : "#805333"}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ alignItems: "center", marginTop: 15 }}>
              <MaterialIcons
                name="account-circle"
                size={22}
                color={!focused ? "#9A9A9A" : "#805333"}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
function App() {
  return <NavigationContainer>{main()}</NavigationContainer>;
}

export default App;
