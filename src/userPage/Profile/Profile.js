import { useIsFocused } from "@react-navigation/native";
import React, { useEffect } from "react";
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
import { useRecoilState, useRecoilValue } from "recoil";
import { tokenState } from "../../recoil/recoil";
import { apiservice } from "../../service/api";
import {
  MaterialCommunityIcons,
  Entypo,
  FontAwesome,
  MaterialIcons,
  Feather,
} from "@expo/vector-icons";
const { width, height } = Dimensions.get("screen");
export default function Profile({ navigation }) {
  const [token, setToken] = useRecoilState(tokenState);
  const focus = useIsFocused();

  const getProfile = async () => {
    const res = await apiservice({
      path: "/authen/user",
      method: "get",
      token: token.accessToken,
    });

    if (res.status == 200) {
      console.log(res.data);
    } else {
    }
  };

  useEffect(() => {
    getProfile();
  }, [focus]);

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <View style={{ marginTop: Platform.OS === "ios" ? 0 : 30 }} />
      <View style={[styles.viewDetail]}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 29,
          }}
        >
          <Text style={{ width: "10%" }}></Text>
          <Text style={styles.textTitle}>PROFILE</Text>
          <TouchableOpacity
            onPress={() => {
              setToken(null);
              navigation.navigate("Login");
            }}
          >
            <Feather name="log-out" size={24} color="#484848" />
          </TouchableOpacity>
        </View>
        <Image style={{}} />
      </View>
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
  textTitle: {
    fontSize: 18,
    fontFamily: "RobotoBold",
    color: "#484848",
    width: "40%",
    textAlign: "center",
    marginBottom: 10,
  },
});
