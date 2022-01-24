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
export default function Lesson({ navigation, route }) {
  //const [page, setPage] = useState(1);
  const [testLight, setTestLight] = useState(false);
  const [testMedium, setTestMedium] = useState(false);
  const [testDark, setTestDark] = useState(false);
  const data = route.params.lesson;
  const [tab, setTab] = useState(0);
  console.log(route.params);
  if (data == null) {
    return null;
  }
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
              paddingLeft: 29,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("MyTabs");
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
          <View>
            <FlatList
              style={{}}
              data={data}
              horizontal
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setTab(index);
                    }}
                    style={[
                      styles.selectPage2,
                      {
                        backgroundColor: index == tab ? "#FFFF" : "#f0e9e4",
                      },
                    ]}
                  >
                    <Text style={styles.textLight}>{item.title}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          {/* <View style={{ flexDirection: "row", marginTop: 10 }}>
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
          </View> */}

          <View style={styles.viewPage}>
            <View
              style={{
                flexDirection: "row",
                width: "120%",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 18, fontFamily: "RobotoBold" }}>
                {data[tab].title}
              </Text>
              {testMedium ? (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Test", route.params.id);
                  }}
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
            <Image
              style={styles.viewImgCoffee}
              source={{ uri: data[tab].image_url }}
            />
            <Text style={styles.textLight}>{data[tab].description}</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Video", route.params.lesson[tab]);
              }}
              style={styles.buttonVideo}
            >
              <Text style={styles.textLight}>Video</Text>
            </TouchableOpacity>
          </View>

          {/* { page == 2 ? (
            <View style={styles.viewPage}>
              <View
                style={{
                  flexDirection: "row",
                  width: "120%",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 18, fontFamily: "RobotoBold" }}>
                  {data[1].title}
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
              <Image
                style={styles.viewImgCoffee}
                source={{ uri: data[1].image_url }}
              />
              <Text style={styles.textLight}>{data[1].description}</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Video", route.params.lesson[1]);
                }}
                style={styles.buttonVideo}
              >
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
                    {data[2].title}
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
                <Image
                  style={styles.viewImgCoffee}
                  source={{ uri: data[2].image_url }}
                />
                <Text style={styles.textLight}>{data[2].description}</Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Video", route.params.lesson[2]);
                  }}
                  style={styles.buttonVideo}
                >
                  <Text style={styles.textLight}>Video</Text>
                </TouchableOpacity>
              </View>
            )
          )} */}
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
    width: 83,
    height: 39,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,

    justifyContent: "center",
    alignItems: "center",
    //borderWidth: 0.2,
    //borderBottomWidth: 0,
    // borderLeftWidth: 0,
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
