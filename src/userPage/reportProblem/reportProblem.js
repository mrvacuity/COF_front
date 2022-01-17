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
} from "@expo/vector-icons";

const { width, height } = Dimensions.get("screen");
export default function reportProblem({ navigation }) {
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <View style={{ marginTop: Platform.OS === "ios" ? 0 : 30 }} />
      <View style={[styles.viewDetail]}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingLeft: 29,
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
          <Text style={styles.textTitle}>Report Problem</Text>
          <Text style={{ width: "10%" }}></Text>
        </View>
        <View style={{ alignSelf: "center" }}>
          <Text style={styles.textSuject}>Topic of problem.</Text>
          <TextInput
            placeholder="What went wrong?"
            style={styles.inputDetail}
          />
          <Text style={[styles.textSuject, { marginTop: 22 }]}>
            Please describe the problem.
          </Text>
          <TextInput multiline style={styles.inputdescription} />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.textButton}>Submit</Text>
          </TouchableOpacity>
        </View>
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
  },
  textTitle: {
    fontSize: 18,
    fontFamily: "RobotoBold",
    color: "#484848",
    width: "60%",
    textAlign: "center",
    marginBottom: 10,
  },
  textSuject: {
    fontFamily: "Roboto",
    fontSize: 13,
    color: "#484848",
    marginTop: 12,
  },
  inputDetail: {
    width: width * 0.65,
    height: 45,
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    fontFamily: "RobotoLight",
    fontSize: 13,
    paddingHorizontal: 10,
    marginTop: 12,
    color: "#484848",
  },
  inputdescription: {
    width: width * 0.65,
    minHeight: 66,
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    fontFamily: "RobotoLight",
    fontSize: 13,
    padding: 10,
    marginTop: 12,
    color: "#484848",
  },
  button: {
    width: width * 0.65,
    height: 33,
    backgroundColor: "#E0DAD6",
    borderWidth: 0.5,
    borderColor: "#484848",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  textButton: {
    fontSize: 14,
    fontFamily: "RobotoLight",
    color: "#484848",
  },
});
