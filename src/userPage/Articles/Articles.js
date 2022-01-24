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
import { getFeed } from "../../action/authAction";
import { useRecoilState } from "recoil";
import { tokenState } from "../../recoil/recoil";
import { apiservice } from "../../service/api";
import moment from "moment";
const { width, height } = Dimensions.get("screen");
export default function Articles({ navigation }) {
  const [token, setToken] = useRecoilState(tokenState);
  const [page, setPage] = useState(1);
  const [fillter, setFillter] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [myData, setMyData] = useState([]);
  useEffect(() => {
    getFeed(token);
    getMyFeed(token);
  }, [token]);

  const getFeed = async () => {
    const res = await apiservice({
      path: "/lesson/getallfeed",
      method: "get",
      token: token.accessToken,
    });

    if (res.status == 200) {
      setData(res.data);
    }
  };
  const getMyFeed = async () => {
    const res = await apiservice({
      path: "/lesson/getallfeed?myfeed=true",
      method: "get",
      token: token.accessToken,
    });

    if (res.status == 200) {
      console.log(res.data);
      setMyData(res.data);
    }
    if (res.status == 500) {
      Alert.alert("API ERROR");
    }
  };
  if (data[0] == null) {
    return null;
  }
  if (myData == null) {
    return null;
  }
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
          <View style={styles.viewHeader}>
            <Text style={{ width: "10%" }}></Text>
            <Text style={styles.textTitle}>
              {page == 1 ? "Articles" : "Timeline Post"}
            </Text>

            <TouchableOpacity
              style={{ width: "10%", alignItems: "flex-end" }}
              onPress={() => {
                navigation.navigate("Favorite");
              }}
            >
              <AntDesign name="hearto" size={24} color="#484848" />
            </TouchableOpacity>
          </View>
          <View style={styles.viewPage}>
            <TouchableOpacity
              onPress={() => {
                getFeed(token);
                setPage(1);
              }}
              style={[
                styles.buttonPage,
                { borderBottomWidth: page == 1 ? 3 : 1 },
              ]}
            >
              <Text style={styles.textPage}>Articles</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                getMyFeed(token);
                setPage(2);
              }}
              style={[
                styles.buttonPage,
                { borderBottomWidth: page == 2 ? 3 : 1 },
              ]}
            >
              <Text style={styles.textPage}>My post</Text>
            </TouchableOpacity>
          </View>
          {page == 1 && (
            <View style={{ paddingHorizontal: 25 }}>
              <View style={styles.viewPopular}>
                <Text style={styles.textsubject}>Popular Article</Text>
                <Text style={styles.textDate}>
                  Today, {moment(new Date()).format("MMMM DD")}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("ArticlesDetail", data[0]);
                }}
              >
                <Image
                  style={styles.imgPopular}
                  source={{
                    uri:
                      "https://api-cof.wishesexistence.co/api/image/getimage/" +
                        data[0] !=
                        null && data[0].image_url,
                  }}
                />
              </TouchableOpacity>
              <Text style={styles.textsubjectPopular}>{data[0].title}</Text>
              <View style={{ flexDirection: "row", marginTop: 8 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <MaterialCommunityIcons
                    name="face-outline"
                    size={20}
                    color="#484848"
                  />
                  <Text style={styles.textPopular}>
                    {" "}
                    {data[0].user_model.first_name +
                      " " +
                      data[0].user_model.last_name}
                  </Text>
                </View>
                <View style={styles.viewComment}>
                  <Image
                    style={{ width: 18, height: 18 }}
                    source={require("../../img/chat.png")}
                  />
                  <Text style={styles.textPopular}>
                    {" "}
                    {data[0].comment_model.length} comments
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 34,
                }}
              >
                <Text style={styles.textsubject}>Articles</Text>
                <View style={{ width: "55%" }}>
                  <View style={styles.viewArticles}>
                    <TextInput placeholder="Search" style={styles.search} />
                    <TouchableOpacity>
                      <MaterialCommunityIcons
                        name="magnify"
                        size={24}
                        color="#484848"
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        setFillter((val) => !val);
                      }}
                    >
                      <MaterialIcons
                        name="format-align-right"
                        size={24}
                        color="#484848"
                      />
                    </TouchableOpacity>
                  </View>
                  {fillter && (
                    <View style={styles.viewFillter}>
                      <TouchableOpacity style={styles.buttonFillter}>
                        <Text style={styles.textFillter}>Most like</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.buttonFillter}>
                        <Text style={styles.textFillter}>Latest post</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.buttonFillter}>
                        <Text style={styles.textFillter}>Oldest post</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
              <FlatList
                numColumns={1}
                style={{ marginBottom: 40 }}
                data={data}
                renderItem={({ item, index }) => {
                  return (
                    <View>
                      {index != 0 && (
                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate("ArticlesDetail", item);
                          }}
                          style={styles.buttonDetail}
                        >
                          <View style={{ width: "35%" }}>
                            <Image
                              style={{
                                width: 103,
                                height: 103,
                                borderRadius: 15,
                                backgroundColor: "#cccccc",
                              }}
                              source={{
                                uri:
                                  "https://api-cof.wishesexistence.co/api/image/getimage/" +
                                  item.image_url,
                              }}
                            />
                          </View>
                          <View
                            style={{
                              flexDirection: "row",
                              width: "65%",
                            }}
                          >
                            <View style={{ width: "100%" }}>
                              <View
                                style={{
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Text style={styles.textDetail}>● Coffee</Text>
                                <View
                                  style={{
                                    justifyContent: "center",
                                    flexDirection: "row",
                                  }}
                                >
                                  <Text
                                    style={[
                                      styles.textPopular,
                                      { fontSize: 10 },
                                    ]}
                                  >
                                    {item.like_models.length}
                                  </Text>
                                  <EvilIcons
                                    name="like"
                                    size={18}
                                    color="black"
                                  />
                                </View>
                              </View>
                              <Text
                                numberOfLines={2}
                                style={[styles.textDetail, { fontSize: 16 }]}
                              >
                                {item.title}
                              </Text>
                              <View
                                style={{
                                  flexDirection: "row",
                                  marginTop: 8,
                                }}
                              >
                                <View
                                  style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                  }}
                                >
                                  <MaterialCommunityIcons
                                    name="face-outline"
                                    size={20}
                                    color="#484848"
                                  />
                                  <Text
                                    numberOfLines={1}
                                    style={[styles.textPopular, { width: 90 }]}
                                  >
                                    {" "}
                                    {item.user_model.first_name +
                                      " " +
                                      item.user_model.last_name}
                                  </Text>
                                </View>
                                <View
                                  style={[
                                    styles.viewComment,
                                    {
                                      marginLeft: 10,
                                    },
                                  ]}
                                >
                                  <Image
                                    style={{ width: 18, height: 18 }}
                                    source={require("../../img/chat.png")}
                                  />
                                  <Text style={styles.textPopular}>
                                    {" "}
                                    {item.comment_model.length} comments
                                  </Text>
                                </View>
                              </View>
                            </View>
                          </View>
                        </TouchableOpacity>
                      )}
                    </View>
                  );
                }}
              />
            </View>
          )}
          {page == 2 && (
            <View style={{ minHeight: height * 0.8 }}>
              <View
                style={{
                  paddingHorizontal: 12,
                  minHeight: height * 0.5,
                }}
              >
                <View>
                  <FlatList
                    numColumns={1}
                    data={myData}
                    renderItem={({ item, index }) => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate("ArticlesDetail", item);
                          }}
                          style={styles.buttonDetail1}
                        >
                          <View style={{ width: "35%" }}>
                            <Image
                              style={{
                                width: 103,
                                height: 103,
                                borderRadius: 15,
                                backgroundColor: "#CCCCCC",
                              }}
                              source={{
                                uri:
                                  "https://api-cof.wishesexistence.co/api/image/getimage/" +
                                  item.image_url,
                              }}
                            />
                          </View>
                          <View style={styles.viewtextDetail}>
                            <View
                              style={{ width: "100%", paddingVertical: 10 }}
                            >
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
                                <Text style={styles.textDate1}>
                                  {moment(new Date(item.createdAt)).format(
                                    "DD/MM/YYYY"
                                  )}
                                </Text>
                              </View>
                              <Text
                                numberOfLines={2}
                                style={[
                                  styles.textDetail,
                                  { fontSize: 16, fontFamily: "RobotoLight" },
                                ]}
                              >
                                {item.title}
                              </Text>
                              <View
                                style={{
                                  flexDirection: "row",
                                  alignSelf: "flex-end",
                                  marginTop: 20,
                                }}
                              >
                                <TouchableOpacity
                                  onPress={() => {
                                    navigation.navigate("Post", item);
                                  }}
                                  style={{ marginRight: 10 }}
                                >
                                  <Feather
                                    name="edit"
                                    size={16}
                                    color="#484848"
                                  />
                                </TouchableOpacity>
                                <TouchableOpacity
                                  onPress={() => {
                                    setModalVisible(true);
                                  }}
                                >
                                  <Image
                                    style={{ width: 15, height: 16 }}
                                    source={require("../../img/delete.png")}
                                  />
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        </TouchableOpacity>
                      );
                    }}
                  />
                </View>
              </View>
              <View
                style={{
                  height: height * 0.13,
                  marginTop: 20,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Post");
                  }}
                  style={{
                    // position: "absolute",
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    alignSelf: "flex-end",
                    marginRight: 10,
                    backgroundColor: "#E0DAD6",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 99,
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.22,
                    shadowRadius: 2.22,

                    elevation: 3,
                  }}
                >
                  <Feather name="edit-3" size={24} color="#484848" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.bgModal}>
            <View style={[styles.viewDetailModal]}>
              <Text style={styles.textButton}>
                Are you sure to delete your articles?
              </Text>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                  style={styles.buttonModal}
                >
                  <Text style={[styles.textButton, { fontFamily: "Roboto" }]}>
                    Yes
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                  style={[styles.buttonModal, { marginLeft: 40 }]}
                >
                  <Text style={[styles.textButton, { fontFamily: "Roboto" }]}>
                    No
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
  textTitle: {
    fontSize: 18,
    fontFamily: "RobotoBold",
    color: "#484848",
    width: "40%",
    textAlign: "center",
    marginBottom: 10,
  },
  textPage: {
    fontSize: 12,
    fontFamily: "Roboto",
    color: "#484848",
  },
  buttonPage: {
    width: "50%",
    alignItems: "center",
    borderColor: "#484848",
    paddingBottom: 10,
  },
  viewPage: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  textPopular: {
    fontSize: 12,
    fontFamily: "Roboto",
    color: "#484848",
  },
  viewPopular: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  textsubject: {
    fontSize: 18,
    fontFamily: "RobotoBold",
    color: "#484848",
  },
  textDate: {
    fontSize: 10,
    fontFamily: "RobotoBold",
    color: "rgba(154, 154, 154, 0.75)",
  },
  imgPopular: {
    width: "100%",
    height: 128,
    borderRadius: 15,
    marginTop: 12,
    backgroundColor: "#CCCCCC",
  },
  viewComment: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 40,
  },
  textsubjectPopular: {
    fontSize: 16,
    fontFamily: "Roboto",
    color: "#484848",
    marginTop: 8,
  },
  viewArticles: {
    width: "100%",
    height: 28,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
  },
  search: {
    width: "70%",
    height: 28,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    fontSize: 12,
    fontFamily: "Roboto",
    color: "#484848",
  },
  textDetail: {
    fontSize: 12,
    fontFamily: "RobotoBold",
    color: "#484848",
  },
  buttonFillter: {
    width: 91,
    height: 28,
    paddingHorizontal: 10,
    justifyContent: "center",
    borderBottomWidth: 0.2,
  },
  viewFillter: {
    width: 91,
    backgroundColor: "#FFFFFF",
    zIndex: 99,
    marginTop: 28,
    position: "absolute",
    alignSelf: "flex-end",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textFillter: {
    fontSize: 12,
    fontFamily: "RobotoLight",
  },
  buttonDetail: {
    width: "100%",
    flexDirection: "row",
    marginTop: 12,
    alignItems: "center",
  },
  buttonDetail1: {
    borderWidth: 0.2,
    minHeight: 123,
    paddingTop: 10,
    paddingHorizontal: 18,
    borderColor: "#484848",
    width: "100%",
    flexDirection: "row",
    marginTop: 12,
  },
  viewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 29,
    alignItems: "center",
  },
  viewtextDetail: {
    flexDirection: "row",
    width: "65%",
  },
  textDate1: {
    fontSize: 12,
    fontFamily: "Roboto",
    color: "#484848",
  },
  bgModal: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000000bb",
    justifyContent: "center",
  },
  viewDetailModal: {
    width: "80%",
    height: 119,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    alignSelf: "center",
    alignItems: "center",
    paddingVertical: 29,
  },
  buttonModal: {
    width: 54,
    height: 25,
    backgroundColor: "#EDE8E6",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 19,
  },
});
