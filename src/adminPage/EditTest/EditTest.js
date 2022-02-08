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
  MaterialIcons,
  Feather,
  AntDesign,
  FontAwesome5,
  Ionicons,
  EvilIcons,
} from "@expo/vector-icons";
const { width, height } = Dimensions.get("screen");
import { useRecoilState, useRecoilValue } from "recoil";
import { tokenState } from "../../recoil/recoil";
import { apiservice } from "../../service/api";
import { useIsFocused } from "@react-navigation/native";
export default function EditTest({ navigation }) {
  const [token, setToken] = useRecoilState(tokenState);
  const isfocused = useIsFocused();
  const [lesson, setLesson] = useState();
  useEffect(() => {
    if (isfocused) {
      getLesson();
    }
  }, [isfocused]);
  const getLesson = async () => {
    const res = await apiservice({
      path: "/lesson/getalllesson",
      method: "get",
    });

    if (res.status == 200) {
      setLesson(res.data);
    } else {
    }
  };
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <View style={{ marginTop: Platform.OS === "ios" ? 0 : 30 }} />
      <ScrollView
        style={{
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          minHeight: "100%",
          backgroundColor: "#f0e9e4",
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
              <Entypo name="chevron-thin-left" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.textTitle}>Test</Text>
            <Text style={{ width: "10%" }}></Text>
          </View>
          <FlatList
            numColumns={1}
            style={{ marginBottom: 20 }}
            data={lesson}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("ExamTest", item);
                  }}
                  style={styles.button}
                >
                  <Text style={styles.textSubject}>{item.title}</Text>
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
    paddingHorizontal: 25,
  },
  textTitle: {
    fontSize: 18,
    fontFamily: "RobotoBold",
    color: "#484848",
    width: "60%",
    textAlign: "center",
    marginBottom: 10,
  },
  button: {
    width: "100%",
    height: 65,
    borderWidth: 0.4,
    borderColor: "#484848",
    justifyContent: "center",
    paddingHorizontal: 22,
    borderRadius: 5,
    marginTop: 24,
  },
  textSubject: {
    fontSize: 18,
    fontFamily: "Roboto",
    color: "#484848",
  },
});
