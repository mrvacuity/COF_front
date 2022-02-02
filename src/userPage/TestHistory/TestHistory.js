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
  Modal,
} from "react-native";
import {
  MaterialCommunityIcons,
  Entypo,
  FontAwesome,
} from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { tokenState } from "../../recoil/recoil";
import { apiservice } from "../../service/api";
import { useIsFocused } from "@react-navigation/native";
import { useRecoilState, useRecoilValue } from "recoil";
import moment from "moment";
const { width, height } = Dimensions.get("screen");
export default function TestHistory({ navigation }) {
  const [Dropdown, setDropdown] = useState(false);
  const [token, setToken] = useRecoilState(tokenState);
  const [lesson, setlesson] = useState("Roasting");
  const [lessonScore, setlessonScore] = useState(1);
  const [score, setScore] = useState([]);
  const [data, setData] = useState([]);

  const isfocused = useIsFocused();

  const getLesson = async () => {
    const res = await apiservice({
      path: "/lesson/getalllesson",
      method: "get",
    });

    if (res.status == 200) {
      setData(res.data);
    } else {
    }
  };

  useEffect(() => {
    if (isfocused) {
      getScore(token);
      getLesson();
    }
  }, [isfocused]);

  const getScore = async () => {
    const res = await apiservice({
      path: "/lesson/score",
      method: "get",
      token: token.accessToken,
    });

    if (res.status == 200) {
      setScore(res.data);
    }
  };

  console.log(score);

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
            <View style={{ zIndex: 999 }}>
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
            </View>
          </View>
          {Dropdown && (
            <View style={styles.listDropdown}>
              <FlatList
                numColumns={1}
                data={data}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setlesson(item.title);
                        setlessonScore(item.id);
                        setDropdown(false);
                      }}
                      style={[
                        styles.selectDropdown,
                        {
                          borderTopWidth: index == 0 ? 0.6 : 0,
                        },
                      ]}
                    >
                      <Text style={[styles.textLight, { color: "#000000" }]}>
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          )}
          <Text style={styles.text18}>
            Pre-test:{" "}
            {score.filter((items) => {
              return items.lesson_id == lessonScore && items.Type == "PRETEST";
            })[0]?.score == undefined
              ? ""
              : score.filter((item) => {
                  return (
                    item.lesson_id == lessonScore && item.Type == "PRETEST"
                  );
                })[0]?.score + " %"}
          </Text>
          <Text style={[styles.text18, { marginTop: 17 }]}>Post-test:</Text>
          <FlatList
            numColumns={1}
            style={{ marginTop: 10 }}
            data={score
              .filter((item) => {
                return item.lesson_id == lessonScore && item.Type == "POSTTEST";
              })
              .sort((a, b) => b.score - a.score)}
            renderItem={({ item, index }) => {
              return (
                <View style={styles.listPosttest}>
                  <Text style={[styles.textLight, { color: "#000000" }]}>
                    {item?.score}
                    {" %"} {index == 0 && "(high score)"}
                  </Text>
                  <Text
                    style={[
                      styles.textLight,
                      { color: "#000000", fontSize: 12 },
                    ]}
                  >
                    {"Date: " +
                      moment(item?.createdAt).format("DD/MM/YYYY") +
                      "\t\tTime: " +
                      moment(item?.createdAt).format("HH:mm")}
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
    zIndex: 999,
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
    width: "78%",
    backgroundColor: "#FFF",
    alignSelf: "flex-end",
    position: "absolute",
    zIndex: 99,
    marginTop: height * 0.1,
    paddingRight: 20,
  },
  selectDropdown: {
    width: "100%",
    backgroundColor: "#F4F3F3",
    height: 37,
    paddingHorizontal: 10,
    justifyContent: "center",
    borderWidth: 0.6,
    zIndex: 999,
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
