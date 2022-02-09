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
  Alert,
} from "react-native";
import {
  MaterialCommunityIcons,
  Entypo,
  FontAwesome,
} from "@expo/vector-icons";
import { useRecoilState } from "recoil";
import { tokenState } from "../../recoil/recoil";
import { apiservice } from "../../service/api";
import { authActionScore } from "../../action/authAction";
const { width, height } = Dimensions.get("screen");
export default function Test({ navigation, route }) {
  const [token, setToken] = useRecoilState(tokenState);
  const [choiceIndex, setchoiceIndex] = useState(-1);
  const [quiz, setQuiz] = useState([]);
  const [choice, setchoice] = useState("");
  const [ans, setAns] = useState([]);

  const [state, setState] = useState({
    Type: "POSTTEST",
    lesson_id: route.params.id,
    score: "",
  });

  const [status, setStatus] = useState(false);
  useEffect(() => {
    getTest();
  }, []);
  async function send() {
    let data = {
      ...state,
      score: (
        (ans.filter((e) => e.myAns == e.Answer).length / quiz.length) *
        100
      ).toFixed(),
    };
    if (ans.length == quiz.length) {
      const send = await authActionScore({
        state: data,
        token: token.accessToken,
      });
      if (send) {
        setStatus(true);
      }
    } else {
      Alert.alert("Please answer all of the following questions.");
    }
  }
  const getTest = async () => {
    const res = await apiservice({
      path: "/lesson/gettest/" + route.params.id,
      method: "get",
    });

    if (res.status == 200) {
      setQuiz(res.data.data);
    } else {
    }
  };

  const choiceChangeHandler = (index, data) => {
    setchoiceIndex((preIndex) => index);
    setchoice(data);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <View style={{ marginTop: Platform.OS === "ios" ? 0 : 30 }} />
      <View style={[styles.viewDetail]}>
        <View style={{ height: height * 0.7 }}>
          <Text style={[styles.textTitle, { alignSelf: "center" }]}>Test</Text>
          <Text
            style={[styles.textTitle, { width: "100%", textAlign: "left" }]}
          >
            {route.params.title}
          </Text>
          {status && (
            <Text
              style={[
                styles.textTitle,
                { width: "100%", textAlign: "left", fontFamily: "RobotoBold" },
              ]}
            >
              Score: {ans.filter((e) => e.myAns == e.Answer).length.toFixed()}/
              {quiz.length}
            </Text>
          )}
          <View>
            <FlatList
              numColumns={1}
              style={{ marginBottom: 20 }}
              data={quiz}
              renderItem={({ item, index }) => {
                return (
                  <View
                    style={{
                      borderBottomWidth: 0.5,
                      paddingVertical: 17,
                    }}
                  >
                    <Text style={[styles.textLight, { marginBottom: 11 }]}>
                      {item.title}
                    </Text>
                    {item.choice.map((data, indexs) => (
                      <TouchableOpacity
                        disabled={status ? true : false}
                        key={data}
                        style={[
                          styles.buttonSelect,
                          {
                            backgroundColor:
                              status &&
                              data == item.answer &&
                              "rgba(174, 195, 160, 0.19)",
                          },
                        ]}
                        onPress={() => {
                          setAns((val) => {
                            return val.filter((e) => e.number != index);
                          });
                          setAns((val) =>
                            val.concat({
                              number: index,
                              myAns: data,
                              Answer: item.answer,
                            })
                          );
                        }}
                      >
                        <FontAwesome
                          name={
                            ans.filter(
                              (e) => e.myAns == data && e.number == index
                            ).length > 0
                              ? "dot-circle-o"
                              : "circle-thin"
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
          {!status ? (
            <TouchableOpacity onPress={send} style={styles.buttonDone}>
              <Text
                style={{ fontSize: 18, fontFamily: "Roboto", color: "#484848" }}
              >
                Done
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Home");
              }}
              style={[styles.buttonDone, { width: 154 }]}
            >
              <Text
                style={{ fontSize: 18, fontFamily: "Roboto", color: "#484848" }}
              >
                Back to lesson
              </Text>
            </TouchableOpacity>
          )}
        </View>
        {/* <View style={{ height: height * 0.04 }}>
          {!status ? (
            <TouchableOpacity onPress={send} style={styles.buttonDone}>
              <Text
                style={{ fontSize: 18, fontFamily: "Roboto", color: "#484848" }}
              >
                Done
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Home");
              }}
              style={[styles.buttonDone, { width: 154 }]}
            >
              <Text
                style={{ fontSize: 18, fontFamily: "Roboto", color: "#484848" }}
              >
                Back to lesson
              </Text>
            </TouchableOpacity>
          )}
        </View> */}
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
