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
import Unorderedlist from "react-native-unordered-list";
import { useRecoilState, useRecoilValue } from "recoil";
import { tokenState } from "../../recoil/recoil";
import { apiservice } from "../../service/api";
const { width, height } = Dimensions.get("screen");
export default function Home({ navigation }) {
  const [token, setToken] = useRecoilState(tokenState);

  const [data, setData] = useState([]);
  const [userData, setUserData] = useState();

  useEffect(() => {
    getLesson();
    getProfile();
  }, []);
  const getLesson = async () => {
    const res = await apiservice({
      path: "/lesson/getalllesson",
      method: "get",
    });

    if (res.status == 200) {
      console.log("lesson", res.data);
      setData(res.data);
    } else {
    }
  };
  const getProfile = async () => {
    const res = await apiservice({
      path: "/authen/user",
      method: "get",
      token: token.accessToken,
    });

    if (res.status == 200) {
      setUserData(res.data.result);
    } else {
    }
  };
  if (userData == undefined) {
    return <View></View>;
  }
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
              {"Welcome back, " + userData.first_name + "!"}
            </Text>
            <Text style={styles.textLight}>Have you drunk yet?</Text>
            <Text style={[styles.textBold, { fontSize: 18, marginTop: 12 }]}>
              Lesson
            </Text>
          </View>

          <FlatList
            numColumns={1}
            style={{ marginBottom: 20 }}
            data={data}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Pretest", item);
                  }}
                  style={styles.viewHistory}
                >
                  <View style={{ width: "65%" }}>
                    <Text style={styles.textRegular}>{item.title}</Text>

                    <FlatList
                      numColumns={1}
                      style={{ marginLeft: 10, marginVertical: 12 }}
                      data={item.lesson}
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
                                {item.title}
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
                      source={{
                        uri:
                          "https://api-cof.wishesexistence.co/api/image/getimage/" +
                          item.image_url,
                      }}
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
