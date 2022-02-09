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
import { useRecoilState, useRecoilValue } from "recoil";
import { tokenState } from "../../recoil/recoil";
import { apiservice } from "../../service/api";
import { authActionScore } from "../../action/authAction";
const { width, height } = Dimensions.get("screen");
export default function Pretest({ navigation, route }) {
  const [choiceIndex, setChoiceIndex] = useState(-1);
  const [data, setData] = useState("");
  const [token, setToken] = useRecoilState(tokenState);
  const [quiz, setQuiz] = useState([]);
  const [check, setCheck] = useState();
  const [ans, setAns] = useState([]);

  const [state, setstate] = useState({
    lesson_id: route.params.id,
    score: "",
  });

  useEffect(() => {
    conditions(token);
  }, []);
  async function send() {
    if (ans.length == quiz.length) {
      setstate({
        ...state,
        score: (
          (ans.filter((e) => e.myAns == e.Answer).length / quiz.length) *
          100
        ).toFixed(),
      });
      if (state.score != "") {
        const send = await authActionScore({
          state,
          token: token.accessToken,
        });
        if (send) {
          navigation.navigate("Lesson", route.params);
        }
      }
    } else {
      Alert.alert("Please answer all of the following questions.");
    }
  }
  const getPreTest = async () => {
    const res = await apiservice({
      path: "/lesson/gettest/" + route.params.id,
      method: "get",
    });

    if (res.status == 200) {
      setQuiz(res.data.data);
    } else {
    }
  };
  const conditions = async () => {
    const res = await apiservice({
      path: "/lesson/checkcondition/" + route.params.id,
      method: "get",
      token: token.accessToken,
    });

    if (res.status == 200) {
      if (res.data == false) {
        getPreTest();
      } else {
        navigation.navigate("Lesson", route.params);
      }
    }
  };
  const choiceChangeHandler = (index, data) => {
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
            data={quiz}
            renderItem={({ item, index }) => {
              return (
                <View style={{ borderBottomWidth: 0.5, paddingVertical: 17 }}>
                  <Text style={[styles.textLight, { marginBottom: 11 }]}>
                    {item.title}
                  </Text>
                  {item.choice.map((data, indexs) => (
                    <TouchableOpacity
                      key={data}
                      style={styles.buttonSelect}
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
        <View style={{ height: height * 0.06 }}>
          <TouchableOpacity onPress={send} style={styles.buttonDone}>
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
