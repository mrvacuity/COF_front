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
import Camera from "../userPage/Camera/Camera";
import Articles from "../userPage/Articles/Articles";
import Profile from "../userPage/Profile/Profile";
import Pretest from "../userPage/Pretest/Pretest";
import Lesson from "../userPage/Lesson/Lesson";
import Test from "../userPage/Test/Test";
import Video from "../userPage/Video/Video";
import TestHistory from "../userPage/TestHistory/TestHistory";
import ChangePassword from "../userPage/ChangePassword/ChangePassword";
import ReportProblem from "../userPage/reportProblem/reportProblem";
import { tokenState } from "../recoil/recoil";
import { useRecoilState } from "recoil";
import HistoryResult from "../userPage/HistoryResult/HistoryResult";
import HistoryResultEdit from "../userPage/HistoryResultEdit/HistoryResultEdit";
import ArticsDetail from "../userPage/ArticlesDetail/ArticsDetail";
import Favorite from "../userPage/Favorite/Favorite";
import Post from "../userPage/Post/Post";
import Menu from "../adminPage/Menu/Menu";
import EditLesson from "../adminPage/EditLesson/EditLesson";
import EditArticle from "../adminPage/EditArticle/EditArticle";
import LessonList from "../adminPage/LessonList/LessonList";
import NewLesson from "../adminPage/NewLesson/NewLesson";
import EditTest from "../adminPage/EditTest/EditTest";
import ExamTest from "../adminPage/ExamTest/ExamTest";
import AddQuizTest from "../adminPage/AddQuizTest/AddQuizTest";
const { width, height } = Dimensions.get("screen");

const Stack = createStackNavigator();

function main() {
  const [token, setToken] = useRecoilState(tokenState);

  return (
    <Stack.Navigator headerMode="none" mode="modal" initialRouteName="Login">
      {token == "" ? (
        <Stack.Screen name="Login" component={Login} />
      ) : token.role == "ADMIN" ? (
        <Stack.Screen name="Menu" component={Menu} />
      ) : (
        <Stack.Screen name="MyTabs" component={MyTabs} />
      )}
      <Stack.Screen name="Pretest" component={Pretest} />
      <Stack.Screen name="Lesson" component={Lesson} />
      <Stack.Screen name="Test" component={Test} />
      <Stack.Screen name="Video" component={Video} />
      <Stack.Screen name="TestHistory" component={TestHistory} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="ReportProblem" component={ReportProblem} />
      <Stack.Screen name="HistoryResult" component={HistoryResult} />
      <Stack.Screen name="HistoryResultEdit" component={HistoryResultEdit} />
      <Stack.Screen name="ArticlesDetail" component={ArticsDetail} />
      <Stack.Screen name="Favorite" component={Favorite} />
      <Stack.Screen name="Post" component={Post} />

      <Stack.Screen name="EditLesson" component={EditLesson} />
      <Stack.Screen name="EditArticle" component={EditArticle} />
      <Stack.Screen name="LessonList" component={LessonList} />
      <Stack.Screen name="NewLesson" component={NewLesson} />
      <Stack.Screen name="EditTest" component={EditTest} />
      <Stack.Screen name="ExamTest" component={ExamTest} />
      <Stack.Screen name="AddQuizTest" component={AddQuizTest} />
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
        name="Camera"
        component={Camera}
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
