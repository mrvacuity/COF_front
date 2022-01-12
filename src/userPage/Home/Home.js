import React from "react";
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
import Unorderedlist from "react-native-unordered-list";
const { width, height } = Dimensions.get("screen");
export default function Home({ navigation }) {
  const DATA1 = [
    {
      title: "Plant",

      detail1: [
        { name: "Coffee plant species" },
        { name: "How to plant and care" },
      ],
      img: require("../../img/beans.png"),
    },
    {
      title: "How To Grow Coffee Plant",
      detail1: [{ name: "Harvest methods" }, { name: " Processed" }],
      img: require("../../img/basket.png"),
    },
    {
      title: "Roasting",

      detail1: [
        { name: "Light loast" },
        { name: "Medium loast" },
        { name: "Dark loast" },
      ],
      img: require("../../img/bans.png"),
    },
    {
      title: "Brew",

      detail1: [{ name: "Moka Pot" }, { name: "Drip" }, { name: "Aeropress" }],
      img: require("../../img/cold.png"),
    },
  ];
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <View style={{ marginTop: Platform.OS === "ios" ? 0 : 30 }} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.viewDetail]}>
          <View style={{ paddingHorizontal: 29 }}>
            <Text
              style={[styles.textBold, { fontSize: 18, alignSelf: "center" }]}
            >
              HOME
            </Text>
            <Text
              style={[styles.textRegular, { marginTop: 35, marginBottom: 8 }]}
            >
              Welcome back, Bird!
            </Text>
            <Text style={styles.textLight}>Have you drunk yet?</Text>
            <Text style={[styles.textBold, { fontSize: 18, marginTop: 12 }]}>
              Lesson
            </Text>
          </View>

          <FlatList
            numColumns={1}
            style={{}}
            data={DATA1}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Pretest");
                  }}
                  style={styles.viewHistory}
                >
                  <View style={{ width: "65%" }}>
                    <Text style={styles.textRegular}>{item.title}</Text>

                    <FlatList
                      numColumns={1}
                      style={{ marginLeft: 10, marginVertical: 12 }}
                      data={item.detail1}
                      renderItem={({ item, index }) => {
                        return (
                          <View>
                            <Unorderedlist>
                              <Text
                                style={[
                                  styles.textLight,
                                  { fontSize: 13, color: "#484848" },
                                ]}
                              >
                                {item.name}
                              </Text>
                            </Unorderedlist>
                          </View>
                        );
                      }}
                    />
                    <Text
                      style={[
                        styles.textLight,
                        { fontSize: 13, color: "#484848" },
                      ]}
                    >
                      Pre-test: -
                    </Text>
                    <Text
                      style={[
                        styles.textLight,
                        { fontSize: 13, color: "#484848" },
                      ]}
                    >
                      Post-test: -
                    </Text>
                  </View>
                  <View style={styles.viewImgHistorty}>
                    <Image
                      style={{ width: 100, height: 100 }}
                      source={item.img}
                    />
                    <View style={{ marginTop: 11 }}>
                      <Text
                        style={[
                          styles.textLight,
                          { fontSize: 11, color: "#484848" },
                        ]}
                      >
                        {"Start >>>"}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
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
  textBold: { fontFamily: "RobotoBold", color: "#484848" },
  textRegular: { fontFamily: "Roboto", color: "#484848", fontSize: 18 },
  textLight: { fontSize: 15, fontFamily: "RobotoLight", color: "#888888" },
  buttonLesson: {
    width: 60,
    height: 60,
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    alignItems: "center",

    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  viewHistory: {
    width: "95%",
    borderWidth: 0.6,
    borderColor: "#484848",
    flexDirection: "row",
    minHeight: 154,
    marginTop: 12,
    paddingTop: 25,
    paddingBottom: 6,
    alignSelf: "center",
    borderRadius: 5,
    paddingLeft: 22,
  },
  viewImgHistorty: { width: "30%", alignItems: "flex-end", paddingTop: 5 },
});
