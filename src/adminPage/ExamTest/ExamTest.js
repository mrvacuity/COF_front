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
import {
  MaterialCommunityIcons,
  Entypo,
  FontAwesome,
  AntDesign,
} from "@expo/vector-icons";
import { useRecoilState, useRecoilValue } from "recoil";
import { tokenState } from "../../recoil/recoil";
import { apiservice } from "../../service/api";
import { useIsFocused } from "@react-navigation/native";
const { width, height } = Dimensions.get("screen");
export default function ExamTest({ navigation, route }) {
  const [token, setToken] = useRecoilState(tokenState);
  const isfocused = useIsFocused();
  const [data, setData] = useState();

  useEffect(() => {
    if (isfocused) {
      getTest();
    }
  }, [isfocused]);

  const getTest = async () => {
    const res = await apiservice({
      path: "/lesson/gettest/" + route.params.id,
      method: "get",
    });

    if (res.status == 200) {
      setData(res.data.data);
    } else {
    }
  };
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
            <Text style={styles.textTitle}>{route.params.title}</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("AddQuizTest", route.params);
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
            {route.params.title}
          </Text>
          <FlatList
            numColumns={1}
            style={{}}
            data={data}
            renderItem={({ item, index }) => {
              return (
                <View style={{ borderBottomWidth: 0.5, paddingVertical: 17 }}>
                  <Text style={[styles.textLight, { marginBottom: 11 }]}>
                    {item.title}
                  </Text>

                  {item.choice.map((data, index) => (
                    <View
                      key={data}
                      style={[
                        styles.buttonSelect,
                        {
                          backgroundColor:
                            data == item.answer && "rgba(174, 195, 160, 0.19)",
                        },
                      ]}
                    >
                      <MaterialCommunityIcons
                        name={
                          data == item.answer
                            ? "checkbox-blank-circle"
                            : "checkbox-blank-circle-outline"
                        }
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
    width: "60%",
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
