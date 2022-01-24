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
  AntDesign,
} from "@expo/vector-icons";
const { width, height } = Dimensions.get("screen");
export default function AddQuizTest({ navigation }) {
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <View style={{ marginTop: Platform.OS === "ios" ? 0 : 30 }} />
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
            <Entypo name="chevron-thin-left" size={24} color="#484848" />
          </TouchableOpacity>
          <Text style={styles.textTitle}>Plant</Text>
          <TouchableOpacity onPress={() => {}} style={{ width: "10%" }}>
            <AntDesign name={"checkcircleo"} size={24} color="#484848" />
          </TouchableOpacity>
        </View>
        <Text
          style={[
            styles.textTitle,
            { width: "100%", textAlign: "left", marginTop: 20 },
          ]}
        >
          Plant
        </Text>
        <TextInput
          placeholder="Proposition"
          placeholderTextColor={"#484848"}
          multiline
          style={styles.inputProposition}
        />
        <TextInput
          placeholder="Correct answer"
          placeholderTextColor={"#484848"}
          style={styles.inputAnswer}
        />
        <TextInput
          placeholder="Answer"
          placeholderTextColor={"#484848"}
          style={styles.inputAnswer}
        />
        <TextInput
          placeholder="Answer"
          placeholderTextColor={"#484848"}
          style={styles.inputAnswer}
        />
        <TextInput
          placeholder="Answer"
          placeholderTextColor={"#484848"}
          style={styles.inputAnswer}
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
    height: "90%",
    backgroundColor: "#f0e9e4",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 25,
    paddingHorizontal: 29,
  },
  textLight: { fontSize: 18, fontFamily: "RobotoLight", color: "#484848" },
  textTitle: {
    fontSize: 18,
    fontFamily: "RobotoBold",
    color: "#484848",
    width: "60%",
    textAlign: "center",
    marginBottom: 10,
  },
  inputProposition: {
    width: "100%",
    minHeight: 95,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Roboto",
    color: "#484848",
    textAlignVertical: "top",
    paddingHorizontal: 11,
    paddingVertical: 14,
    marginVertical: 20,
  },
  inputAnswer: {
    width: "100%",
    height: 50,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Roboto",
    color: "#484848",
    paddingHorizontal: 24,
    marginTop: 12,
  },
});
