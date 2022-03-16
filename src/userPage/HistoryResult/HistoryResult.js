import React, { useEffect, useState } from "react";
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
import { apiservice } from "../../service/api";
import { useRecoilValue } from "recoil";
import { tokenState } from "../../recoil/recoil";
import moment from "moment";
import { useIsFocused } from "@react-navigation/native";
const { width, height } = Dimensions.get("screen");
export default function HistoryResult({ navigation }) {
  const token = useRecoilValue(tokenState);
  const [data, setData] = useState([]);
  const focus = useIsFocused();

  useEffect(() => {
    name();
  }, [focus]);

  async function name() {
    const res = await apiservice({
      path: "/lesson/getallhistory",
      method: "get",
      token: token.accessToken,
    });

    if (res.status == 200) {
      setData(res.data);
    }
  }

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <View style={{ marginTop: Platform.OS === "ios" ? 0 : 30 }} />
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
          <Text style={styles.textTitle}>History Result</Text>
          <Text style={{ width: "10%" }}></Text>
        </View>
        <FlatList
          numColumns={1}
          style={{}}
          data={data.sort((a, b) => b.id - a.id)}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setTimeout(() => {
                    navigation.navigate("HistoryResultEdit", item);
                  }, 500);
                }}
                style={styles.list}
              >
                <Text style={styles.textSubject}>
                  pH{parseFloat(item?.Sour)?.toFixed(2)}
                </Text>
                <Text style={styles.textDate}>
                  Date : {moment(item?.createdAt).format("DD/MM/YYYY")} Time :{" "}
                  {moment(item?.createdAt).format("HH:mm")}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
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
  textTitle: {
    fontSize: 18,
    fontFamily: "RobotoBold",
    color: "#484848",
    width: "60%",
    textAlign: "center",
    marginBottom: 10,
  },
  list: {
    width: "100%",
    height: 58,
    backgroundColor: "rgba(255, 255, 255, 0.39)",
    paddingHorizontal: 16,
    justifyContent: "center",
    marginTop: 12,
  },
  textSubject: {
    fontSize: 15,
    fontFamily: "Roboto",
    color: "#484848",
  },
  textDate: {
    fontSize: 10,
    fontFamily: "Roboto",
    color: "#888888",
  },
});
