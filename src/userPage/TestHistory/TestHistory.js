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
  Modal,
} from "react-native";
import {
  MaterialCommunityIcons,
  Entypo,
  FontAwesome,
} from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
const { width, height } = Dimensions.get("screen");
export default function TestHistory({ navigation }) {
  const [Dropdown, setDropdown] = useState(false);
  const [lesson, setlesson] = useState("Roasting");
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <View style={{ marginTop: Platform.OS === "ios" ? 0 : 30 }} />
      <View style={[styles.viewDetail]}>
        <View style={styles.viewBack}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack("");
            }}
            style={{ width: "10%" }}
          >
            <Entypo name="chevron-thin-left" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.textTitle}>Test History</Text>
          <Text style={{ width: "10%" }}></Text>
        </View>
        <View style={styles.viewdetail2}>
          <View style={styles.viewDropDown}>
            <Text style={{ fontSize: 18, fontFamily: "RobotoBold" }}>
              Lesson:
            </Text>
            <View>
              <TouchableOpacity
                onPress={() => {
                  setDropdown((val) => !val);
                }}
                style={styles.buttonDropdown}
              >
                <Text style={{ fontSize: 18, fontFamily: "Roboto" }}>
                  {lesson}
                </Text>
                <AntDesign
                  name={Dropdown ? "caretup" : "caretdown"}
                  size={16}
                  color="#484848"
                />
              </TouchableOpacity>
              {Dropdown && (
                <View style={styles.listDropdown}>
                  <FlatList
                    numColumns={1}
                    data={[
                      { name: "Roasting" },
                      { name: "Plant" },
                      { name: "Brew" },
                      { name: "Harvest" },
                    ]}
                    renderItem={({ item, index }) => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            setlesson(item.name);
                            setDropdown(false);
                          }}
                          style={[
                            styles.selectDropdown,
                            {
                              borderTopWidth: index == 0 ? 0.6 : 0,
                            },
                          ]}
                        >
                          <Text
                            style={[styles.textLight, { color: "#000000" }]}
                          >
                            {item.name}
                          </Text>
                        </TouchableOpacity>
                      );
                    }}
                  />
                </View>
              )}
            </View>
          </View>
          <Text style={styles.text18}>Pre-test: 4/10</Text>
          <Text style={[styles.text18, { marginTop: 17 }]}>Post-test:</Text>
          <FlatList
            numColumns={1}
            style={{ marginTop: 10 }}
            data={[{ n: 1 }]}
            renderItem={({ item, index }) => {
              return (
                <View style={styles.listPosttest}>
                  <Text style={[styles.textLight, { color: "#000000" }]}>
                    10/10 (high score)
                  </Text>
                  <Text
                    style={[
                      styles.textLight,
                      { color: "#000000", fontSize: 12 },
                    ]}
                  >
                    {"Date: 10/12/2021\t\tTime: 14:01:45"}
                  </Text>
                </View>
              );
            }}
          />
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
    paddingHorizontal: 13,
  },
  textLight: { fontSize: 18, fontFamily: "RobotoLight", color: "#484848" },
  textTitle: {
    fontSize: 18,
    fontFamily: "Roboto",
    color: "#484848",
    width: "40%",
    textAlign: "center",
    marginBottom: 10,
  },
  text18: {
    fontSize: 18,
    fontFamily: "Roboto",
    color: "#484848",
    marginTop: 48,
  },
  bgModal: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000000bb",
    justifyContent: "center",
  },
  viewDetailModal: {
    width: "50%",
    height: 380,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    alignSelf: "center",
    paddingHorizontal: width * 0.05,
    paddingVertical: 50,
  },
  viewBack: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  viewdetail2: {
    width: "100%",
    height: "100%",
    backgroundColor: "#FFFFFF",
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    marginTop: 10,
    paddingVertical: 45,
    paddingHorizontal: 21,
  },
  viewDropDown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonDropdown: {
    backgroundColor: "rgba(196, 196, 196, 0.14)",
    width: width * 0.55,
    height: 37,
    paddingHorizontal: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  listDropdown: {
    width: "100%",
    backgroundColor: "#F4F3F3",
    position: "absolute",
    zIndex: 5,
    marginTop: 37,
  },
  selectDropdown: {
    width: "100%",
    backgroundColor: "#F4F3F3",
    height: 37,
    paddingHorizontal: 10,
    justifyContent: "center",
    borderWidth: 0.6,
  },
  listPosttest: {
    width: "100%",
    height: 60,
    borderWidth: 0.7,
    borderColor: "#000000",
    justifyContent: "center",
    paddingHorizontal: 10,
    marginTop: 10,
  },
});
