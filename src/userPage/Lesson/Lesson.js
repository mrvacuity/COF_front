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
export default function Lesson({ navigation }) {
  const [page, setPage] = useState(1);
  const [testLight, setTestLight] = useState(false);
  const [testMedium, setTestMedium] = useState(false);
  const [testDark, setTestDark] = useState(false);
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
          <Text style={styles.textTitle}>Roasting</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("TestHistory");
            }}
          >
            <MaterialCommunityIcons
              name="clock-time-four-outline"
              size={26}
              color="#484848"
            />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <TouchableOpacity
            onPress={() => {
              setPage(1);
              setTestLight(false);
              setTestDark(false);
              setTestMedium(false);
            }}
            style={[
              styles.selextPage1,
              {
                backgroundColor: page == 1 ? "#FFFFFF" : "#E6E6E6",
              },
            ]}
          >
            <Text style={styles.textLight}>Light</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setPage(2);
              setTestLight(false);
              setTestDark(false);
              setTestMedium(false);
            }}
            style={[
              styles.selectPage2,
              {
                backgroundColor: page == 2 ? "#FFFFFF" : "#E6E6E6",
              },
            ]}
          >
            <Text style={[styles.textLight]}>Medium</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setPage(3);
              setTestLight(false);
              setTestDark(false);
              setTestMedium(false);
            }}
            style={[
              styles.selectPage2,
              {
                backgroundColor: page == 3 ? "#FFFFFF" : "#DCDCDC",
                zIndex: 3,
              },
            ]}
          >
            <Text style={[styles.textLight]}>Dark</Text>
          </TouchableOpacity>
        </View>
        {page == 1 ? (
          <View style={styles.viewPage}>
            <View
              style={{
                flexDirection: "row",
                width: "120%",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 18, fontFamily: "RobotoBold" }}>
                Light Roast
              </Text>
              {testLight ? (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Test");
                  }}
                  style={[styles.buttonTest, { width: 105 }]}
                >
                  <Text style={styles.textLight}>{"Test >>>"}</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    setTestLight((val) => !val);
                  }}
                  style={styles.buttonTest}
                >
                  <Text style={styles.textLight}>{"<<<"}</Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.viewImgCoffee}>
              <Text style={styles.text15}>Coffee Picture</Text>
            </View>
            <Text style={styles.textLight}>
              It is a roasting process where the coffee beans are not exposed to
              much heat. The resulting coffee beans are light in color. The
              coffee beans will not come out as much oil. The coffee taste is
              sour from the fruit acids. And a little sweet on the tip of the
              tongue, which is the identity of light roast coffee. The resulting
              aroma will come out in the direction of fruits, flowers, and
              berries. Gives a light, refreshing taste, not bitter when eating,
              light roast coffee is popularly used to make hot coffee. It can be
              a drip, siphon, or various slobars.
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Video");
              }}
              style={styles.buttonVideo}
            >
              <Text style={styles.textLight}>Video</Text>
            </TouchableOpacity>
          </View>
        ) : page == 2 ? (
          <View style={styles.viewPage}>
            <View
              style={{
                flexDirection: "row",
                width: "120%",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 18, fontFamily: "RobotoBold" }}>
                Medium Roast
              </Text>
              {testMedium ? (
                <TouchableOpacity
                  onPress={() => {}}
                  style={[styles.buttonTest, { width: 105 }]}
                >
                  <Text style={styles.textLight}>{"Test >>>"}</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    setTestMedium((val) => !val);
                  }}
                  style={styles.buttonTest}
                >
                  <Text style={styles.textLight}>{"<<<"}</Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.viewImgCoffee}>
              <Text style={styles.text15}>Coffee Picture</Text>
            </View>
            <Text style={styles.textLight}>
              It is a roasting process where the coffee beans are not exposed to
              much heat. The resulting coffee beans are light in color. The
              coffee beans will not come out as much oil. The coffee taste is
              sour from the fruit acids. And a little sweet on the tip of the
              tongue, which is the identity of light roast coffee. The resulting
              aroma will come out in the direction of fruits, flowers, and
              berries. Gives a light, refreshing taste, not bitter when eating,
              light roast coffee is popularly used to make hot coffee. It can be
              a drip, siphon, or various slobars.
            </Text>
            <TouchableOpacity style={styles.buttonVideo}>
              <Text style={styles.textLight}>Video</Text>
            </TouchableOpacity>
          </View>
        ) : (
          page == 3 && (
            <View style={styles.viewPage}>
              <View
                style={{
                  flexDirection: "row",
                  width: "120%",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 18, fontFamily: "RobotoBold" }}>
                  Dark Roast
                </Text>
                {testDark ? (
                  <TouchableOpacity
                    onPress={() => {}}
                    style={[styles.buttonTest, { width: 105 }]}
                  >
                    <Text style={styles.textLight}>{"Test >>>"}</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      setTestDark((val) => !val);
                    }}
                    style={styles.buttonTest}
                  >
                    <Text style={styles.textLight}>{"<<<"}</Text>
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.viewImgCoffee}>
                <Text style={styles.text15}>Coffee Picture</Text>
              </View>
              <Text style={styles.textLight}>
                It is a roasting process where the coffee beans are not exposed
                to much heat. The resulting coffee beans are light in color. The
                coffee beans will not come out as much oil. The coffee taste is
                sour from the fruit acids. And a little sweet on the tip of the
                tongue, which is the identity of light roast coffee. The
                resulting aroma will come out in the direction of fruits,
                flowers, and berries. Gives a light, refreshing taste, not
                bitter when eating, light roast coffee is popularly used to make
                hot coffee. It can be a drip, siphon, or various slobars.
              </Text>
              <TouchableOpacity style={styles.buttonVideo}>
                <Text style={styles.textLight}>Video</Text>
              </TouchableOpacity>
            </View>
          )
        )}
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
    paddingRight: 29,
  },
  textTitle: {
    fontSize: 18,
    fontFamily: "Roboto",
    color: "#484848",
    width: "30%",
    textAlign: "center",
    marginBottom: 10,
  },
  textLight: {
    fontSize: 14,
    fontFamily: "RobotoLight",
    color: "#484848",
  },
  selextPage1: {
    width: 93,
    height: 39,
    borderTopRightRadius: 50,
    justifyContent: "center",
    paddingLeft: 20,
    zIndex: 5,
  },
  selectPage2: {
    width: 113,
    height: 39,
    borderTopRightRadius: 50,
    justifyContent: "center",
    paddingLeft: 40,
    marginLeft: -30,
    zIndex: 4,
  },
  viewPage: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    height: "100%",
    borderTopRightRadius: 50,
    paddingHorizontal: 16,
    paddingVertical: 19,
  },
  viewImgCoffee: {
    width: "100%",
    height: 200,
    backgroundColor: "#E5E5E5",
    borderRadius: 20,
    marginVertical: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  text15: { fontSize: 15, fontFamily: "Roboto", color: "#484848" },
  buttonVideo: {
    backgroundColor: "#E0DAD6",
    width: "100%",
    height: 33,
    borderRadius: 5,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTest: {
    width: 54,
    height: 32,
    borderWidth: 0.2,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    paddingLeft: 10,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
  },
});
