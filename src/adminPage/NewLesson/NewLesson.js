import React, { useState } from "react";
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
export default function NewLesson({ navigation }) {
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <View style={{ marginTop: Platform.OS === "ios" ? 0 : 30 }} />
      <ScrollView>
        <View style={[styles.viewDetail]}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.goBack("");
              }}
              style={{ width: "10%" }}
            >
              <Entypo name="chevron-thin-left" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.textTitle}>Name of new lesson</Text>
            <Text style={{ width: "10%" }}></Text>
          </View>
          <TextInput
            placeholder="Enter topic"
            placeholderTextColor={"#484848"}
            style={styles.inputTopic}
          />
          <TouchableOpacity style={styles.buttonAdd}>
            <Text style={styles.text}>+ Add Photo</Text>
            {/* <Image style={{ width: "100%", height: 165 }} source={{ uri: "" }} /> */}
          </TouchableOpacity>
          <TextInput
            multiline
            placeholder="Enter lesson"
            placeholderTextColor={"#484848"}
            style={styles.inputArticle}
          />
          <Text
            style={{
              fontSize: 14,
              fontFamily: "RobotoLight",
              color: "#484848",
              marginTop: 20,
            }}
          >
            URL of video:
          </Text>
          <TextInput
            placeholderTextColor={"#484848"}
            style={styles.inputTopic}
          />
          <TouchableOpacity style={styles.buttonPost}>
            <Text style={styles.text}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    width: "60%",
    textAlign: "center",
    marginBottom: 10,
  },
  inputTopic: {
    width: "100%",
    height: 37,
    backgroundColor: "#FFFFFF",
    fontSize: 18,
    fontFamily: "Roboto",
    color: "#484848",
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonAdd: {
    width: "100%",
    height: 165,
    backgroundColor: "#FFFFFF",
    marginTop: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  inputArticle: {
    width: "100%",
    minHeight: 300,
    backgroundColor: "#FFFFFF",
    fontSize: 14,
    fontFamily: "RobotoLight",
    color: "#484848",
    paddingHorizontal: 18,
    paddingVertical: 21,
    borderRadius: 5,
    textAlignVertical: "top",
    marginTop: 22,
  },
  buttonPost: {
    width: 89,
    height: 41,
    backgroundColor: "#EDE8E6",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    marginVertical: 32,
    alignSelf: "flex-end",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  text: {
    fontSize: 18,
    fontFamily: "Roboto",
    color: "#484848",
  },
});
