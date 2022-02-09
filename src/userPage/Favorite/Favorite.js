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
  Feather,
  AntDesign,
  FontAwesome5,
  Ionicons,
  EvilIcons,
} from "@expo/vector-icons";
import { apiservice } from "../../service/api";
import { useRecoilValue } from "recoil";
import { tokenState } from "../../recoil/recoil";
import { useIsFocused } from "@react-navigation/native";
import moment from "moment";
const { width, height } = Dimensions.get("screen");
export default function Favorite({ navigation }) {
  const token = useRecoilValue(tokenState);
  const focus = useIsFocused();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (focus) {
      name();
    }
  }, [focus]);

  async function name() {
    const res = await apiservice({
      path: "/lesson/alllike",
      token: token.accessToken,
    });

    if (res.status == 200) {
      setData(res.data.data);
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
          <Text style={styles.textTitle}>Like</Text>
          <Text style={{ width: "10%" }}></Text>
        </View>
        <FlatList
          numColumns={1}
          style={{ marginBottom: 20 }}
          data={data}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("ArticlesDetail", {
                    ...item,
                    ...item.info,
                    comment_model: item.comment_models,
                  });
                }}
                style={styles.buttonDetail}
              >
                <View style={{ width: "35%" }}>
                  <Image
                    style={{
                      width: 103,
                      height: 103,
                      borderRadius: 15,
                      backgroundColor: "#ccc",
                    }}
                    source={{
                      uri:
                        "http://144.126.242.196:5000/api/image/getimage/" +
                        item?.info?.image_url,
                    }}
                  />
                </View>
                <View style={styles.viewtextDetail}>
                  <View style={{ width: "100%", paddingVertical: 10 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={[
                          styles.textDetail,
                          { fontFamily: "RobotoBold" },
                        ]}
                      >
                        ● Coffee
                      </Text>
                      <Text style={styles.textDate}>
                        {moment(item.createdAt).format("DD/MM/YYYY")}
                      </Text>
                    </View>
                    <Text
                      numberOfLines={3}
                      style={[styles.textDetail, { fontSize: 16 }]}
                    >
                      {item?.info?.title}
                    </Text>
                  </View>
                </View>
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
    paddingHorizontal: 12,
  },
  textTitle: {
    fontSize: 18,
    fontFamily: "RobotoBold",
    color: "#484848",
    width: "60%",
    textAlign: "center",
    marginBottom: 10,
  },
  buttonDetail: {
    width: "100%",
    flexDirection: "row",
    marginTop: 12,
    borderWidth: 0.2,
    minHeight: 123,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderColor: "#484848",
  },
  textPopular: {
    fontSize: 12,
    fontFamily: "Roboto",
    color: "#484848",
  },
  textDetail: {
    fontSize: 12,
    fontFamily: "RobotoLight",
    color: "#484848",
  },
  textDate: {
    fontSize: 12,
    fontFamily: "Roboto",
    color: "#484848",
  },
  viewtextDetail: {
    flexDirection: "row",
    width: "65%",
  },
});
