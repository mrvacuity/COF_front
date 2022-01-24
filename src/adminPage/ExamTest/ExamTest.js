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
export default function ExamTest({ navigation }) {
  const DATA = [
    {
      Q: "When we should to stopped if we want the light color?",
      A: ["15 min", "End of first crack"],
    },
    {
      Q: "If you want light roasted coffee beans, what temperature should you use?",
      A: ["200 °F", "356 °F"],
    },
    {
      Q: "If you want light roasted coffee beans, what temperature should you use?",
      A: ["200 °F", "356 °F"],
    },
  ];

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <View style={{ marginTop: Platform.OS === "ios" ? 0 : 30 }} />
      <ScrollView
        style={{
          minHeight: "100%",
          backgroundColor: "#f0e9e4",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
      >
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
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("AddQuizTest");
              }}
              style={{ width: "10%" }}
            >
              <AntDesign name={"pluscircleo"} size={24} color="#484848" />
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
          <FlatList
            numColumns={1}
            style={{}}
            data={DATA}
            renderItem={({ item, index }) => {
              return (
                <View style={{ borderBottomWidth: 0.5, paddingVertical: 17 }}>
                  <Text style={[styles.textLight, { marginBottom: 11 }]}>
                    {item.Q}
                  </Text>
                  {item.A.map((data, index) => (
                    <View key={data} style={styles.buttonSelect}>
                      <MaterialCommunityIcons
                        name="checkbox-blank-circle"
                        size={16}
                        color="#484848"
                      />

                      <Text
                        style={[
                          styles.textLight,
                          { fontSize: 14, marginLeft: 5 },
                        ]}
                      >
                        {data}
                      </Text>
                    </View>
                  ))}
                </View>
              );
            }}
          />
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
    paddingHorizontal: 29,
  },
  textLight: { fontSize: 18, fontFamily: "RobotoLight", color: "#484848" },
  textTitle: {
    fontSize: 18,
    fontFamily: "RobotoBold",
    color: "#484848",
    width: "30%",
    textAlign: "center",
    marginBottom: 10,
  },
  buttonSelect: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    marginTop: 3,
  },
  buttonDone: {
    width: 89,
    height: 41,
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 1,
  },
});
