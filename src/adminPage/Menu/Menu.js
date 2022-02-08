import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import {
  MaterialCommunityIcons,
  Entypo,
  FontAwesome,
  MaterialIcons,
  Feather,
  AntDesign,
  FontAwesome5,
  Ionicons,
  EvilIcons,
} from "@expo/vector-icons";
const { width, height } = Dimensions.get("screen");
import { useRecoilState, useRecoilValue } from "recoil";
import { tokenState } from "../../recoil/recoil";
export default function Menu({ navigation }) {
  const [token, setToken] = useRecoilState(tokenState);
  const data = [
    { title: "Lesson", onPress: "EditLesson" },
    { title: "Article", onPress: "EditArticle" },
    { title: "Test", onPress: "EditTest" },
  ];
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <View style={{ marginTop: Platform.OS === "ios" ? 0 : 30 }} />

      <View style={[styles.viewDetail]}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 29,
          }}
        >
          <Text style={{ width: "10%" }}></Text>
          <Text style={styles.textTitle}>Menu</Text>

          <TouchableOpacity
            style={{ width: "10%", alignItems: "flex-end" }}
            onPress={() => {
              setToken("");
              navigation.navigate("Login");
            }}
          >
            <Feather name="log-out" size={24} color="#484848" />
          </TouchableOpacity>
        </View>

        <FlatList
          numColumns={1}
          style={{ marginBottom: 20 }}
          data={data}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(item.onPress);
                }}
                style={styles.button}
              >
                <Text style={styles.textSubject}>{item.title}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 12,
  },
  viewDetail: {
    width: "100%",
    height: "100%",
    backgroundColor: "#f0e9e4",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 25,
    paddingHorizontal: 25,
  },
  textTitle: {
    fontSize: 18,
    fontFamily: "RobotoBold",
    color: "#484848",
    alignSelf: "center",
    textAlign: "center",
    marginBottom: 10,
  },
  button: {
    width: "100%",
    height: 65,
    borderWidth: 0.4,
    borderColor: "#484848",
    justifyContent: "center",
    paddingHorizontal: 22,
    borderRadius: 5,
    marginTop: 24,
  },
  textSubject: {
    fontSize: 18,
    fontFamily: "Roboto",
    color: "#484848",
  },
});
