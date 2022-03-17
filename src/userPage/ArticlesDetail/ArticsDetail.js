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
  Modal,
  Alert,
  Share,
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
import moment from "moment";
import { authActionComment } from "../../action/authAction";
import { useRecoilState } from "recoil";
import { tokenState } from "../../recoil/recoil";
import { apiservice } from "../../service/api";
import { useIsFocused } from "@react-navigation/native";
const { width, height } = Dimensions.get("screen");
export default function ArticsDetail({ navigation, route }) {
  // const data = route.params;
  const [data, setdata] = useState(route.params);
  const [like, setLike] = useState(false);
  const [token, setToken] = useRecoilState(tokenState);
  const [id, setid] = useState();

  const focus = useIsFocused();
  const [state, setState] = useState({
    comment: "",
    feed_id: data.id,
    uid: "",
  });
  const getProfile = async () => {
    const res = await apiservice({
      path: "/authen/user",
      method: "get",
      token: token.accessToken,
    });

    if (res.status == 200) {
      let l = data.like_models.filter((i) => {
        return i.uid == res.data.result.id;
      });
      if (l[0] != undefined) {
        setLike(true);
      }
      setState({ ...state, uid: res.data.result.id });
    } else {
    }
  };
  const getFeed = async () => {
    const res = await apiservice({
      path: "/lesson/getallfeed",
      method: "get",
      token: token.accessToken,
    });

    let a = res.data.filter((item) => {
      return item.id == data.id;
    });

    setdata(a[0]);
    // if (res.status == 200) {
    //   setData(res.data);
    // }
  };
  const getLike = async () => {
    const res = await apiservice({
      path: "/lesson/alllike",
      token: token.accessToken,
    });
    if (res.status == 200) {
      // if (res.data.data == 1) {
      //   setLike(true);
      // }
    }
  };
  async function comment() {
    if (state.comment != "") {
      const comment = await authActionComment({
        state,
        token: token.accessToken,
      });
      if (comment) {
        getFeed();
        setState({ comment: "" });
      }
    }
  }
  if (data == null) {
    return null;
  }
  useEffect(() => {
    if (focus) {
      getFeed();
      getLike();
      getProfile();
    }
  }, [focus]);

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <View style={{ marginTop: Platform.OS === "ios" ? 0 : 30 }} />
      <ScrollView
        style={{
          backgroundColor: "#f0e9e4",
          height: "100%",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
      >
        <View style={[styles.viewDetail]}>
          <View style={styles.viewHeader}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack("");
              }}
              style={{ width: "20%" }}
            >
              <Entypo name="chevron-thin-left" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.textTitle}>Articles</Text>
            <View style={styles.viewHeader1}>
              <TouchableOpacity
                onPress={() => {
                  Share.share({
                    message: "",
                  });
                }}
              >
                <Ionicons
                  name="share-social-outline"
                  size={24}
                  color="#484848"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  const res = await apiservice({
                    path: "/lesson/like?feed_id=" + data.id,
                    token: token.accessToken,
                  });

                  if (res.status == 200) {
                    if (res.data.data != 1) {
                      setLike(true);
                    } else {
                      setLike(false);
                    }
                  }
                }}
                style={{ marginLeft: 8 }}
              >
                <AntDesign
                  name={like ? "heart" : "hearto"}
                  size={24}
                  color="#484848"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ marginTop: 24, paddingHorizontal: 35 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 12, fontFamily: "RobotoBold" }}>
                Author:
                <Text style={{ fontFamily: "Roboto", color: "#484848" }}>
                  {data.user_model.first_name + " " + data.user_model.last_name}
                </Text>
              </Text>
              <Text style={styles.textRoboto}>
                Date:{moment(new Date(data.createdAt)).format("DD/MM/YYYY")}
              </Text>
            </View>
            <Text
              style={[styles.textRoboto, { fontSize: 14, marginVertical: 20 }]}
            >
              {data.title}
            </Text>
            <Image
              style={{ width: "100%", height: 184, backgroundColor: "#CCCCCC" }}
              source={{
                uri:
                  "http://165.22.251.6:5000/api/image/getimage/" +
                  data?.image_url,
              }}
            />
            <Text style={[styles.textLight, { marginVertical: 25 }]}>
              {data?.description}
            </Text>
            <Text style={styles.textComment}>Comment</Text>
            <View style={styles.viewInputComment}>
              <TextInput
                onChangeText={(text) => setState({ ...state, comment: text })}
                placeholder="Write a comment...."
                value={state.comment}
                style={[
                  styles.textLight,
                  {
                    width: "90%",
                    height: 39,
                    paddingHorizontal: 10,
                  },
                ]}
              />
              <TouchableOpacity onPress={comment}>
                <Feather name="send" size={18} color="#484848" />
              </TouchableOpacity>
            </View>
            <FlatList
              numColumns={1}
              style={{ marginBottom: 20 }}
              data={data.comment_model.sort((a, b) => {
                return b.id - a.id;
              })}
              renderItem={({ item, index }) => {
                return (
                  <View style={styles.viewComment}>
                    <View style={styles.viewDate}>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <MaterialCommunityIcons
                          name="face-outline"
                          size={20}
                          color="#484848"
                        />
                        <Text style={styles.textDate}>
                          {" " +
                            item.comment_models.first_name +
                            " " +
                            item.comment_models.last_name}
                        </Text>
                      </View>
                      <Text style={styles.textDate}>
                        {moment(new Date(item.createdAt)).format(
                          "DD/MM/YYYY hh:ss"
                        )}
                      </Text>
                    </View>
                    <Text
                      style={[styles.textLight, { fontSize: 12, marginTop: 6 }]}
                    >
                      {item.comment}
                    </Text>
                  </View>
                );
              }}
            />
          </View>
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
    minHeight: "100%",
    backgroundColor: "#f0e9e4",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 25,
  },
  textTitle: {
    fontSize: 18,
    fontFamily: "RobotoBold",
    color: "#484848",
    width: "60%",
    textAlign: "center",
    marginBottom: 10,
  },
  viewHeader: {
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  viewHeader1: {
    flexDirection: "row",
    alignItems: "center",
    width: "20%",
    marginTop: -5,
  },
  textRoboto: {
    fontSize: 12,
    fontFamily: "Roboto",
    color: "#484848",
  },
  textLight: {
    fontSize: 14,
    fontFamily: "RobotoLight",
    color: "#484848",
  },
  textDate: {
    fontSize: 10,
    fontFamily: "Roboto",
    color: "#484848",
  },
  viewComment: {
    width: "100%",
    borderWidth: 0.2,
    padding: 10,
    minHeight: 74,
    marginTop: 12,
    borderRadius: 5,
  },
  viewDate: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  viewInputComment: {
    width: "100%",
    height: 39,
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 13,
  },
  textComment: { fontSize: 16, fontFamily: "Roboto", color: "#484848" },
});
