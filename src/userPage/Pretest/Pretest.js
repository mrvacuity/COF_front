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
} from "@expo/vector-icons";
const { width, height } = Dimensions.get("screen");
export default function Pretest({ navigation }) {
  const [choiceIndex, setChoiceIndex] = useState(-1);
  const [data, setData] = useState("");

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
  const choiceChangeHandler = (index, data) => {
    // console.log("index \t", index);
    setChoiceIndex((preIndex) => index);
    setData(data);
  };
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <View style={{ marginTop: Platform.OS === "ios" ? 0 : 30 }} />
      <View style={[styles.viewDetail]}>
        <View style={{ height: height * 0.75 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.goBack("");
              }}
              style={{ width: "10%" }}
            >
              <Entypo name="chevron-thin-left" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.textTitle}>Pre-Test</Text>
            <Text style={{ width: "10%" }}></Text>
          </View>

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
                    <TouchableOpacity
                      key={data}
                      style={styles.buttonSelect}
                      onPress={choiceChangeHandler.bind(this, index, data)}
                    >
                      <FontAwesome
                        name={
                          index === choiceIndex ? "dot-circle-o" : "circle-thin"
                        }
                        size={14}
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
                    </TouchableOpacity>
                  ))}
                </View>
              );
            }}
          />
        </View>
        <View style={{ height: height * 0.06 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Lesson");
            }}
            style={styles.buttonDone}
          >
            <Text
              style={{ fontSize: 18, fontFamily: "Roboto", color: "#484848" }}
            >
              Done
            </Text>
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
    fontFamily: "Roboto",
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
