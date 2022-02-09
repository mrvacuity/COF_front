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
import * as ImagePicker from "expo-image-picker";
import {
  authActionCreateLesson,
  authActionDeleteLesson,
  authActionEditLesson,
} from "../../action/authAction";
export default function EditLesson({ navigation }) {
  const [add, setAdd] = useState(false);
  const [image, setImage] = useState();
  const [token, setToken] = useRecoilState(tokenState);
  const isfocused = useIsFocused();
  const [lesson, setLesson] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [id, setid] = useState();
  const [idEdit, setidEdit] = useState();
  const [edit, setedit] = useState();
  const [state, setState] = useState({
    title: "",
    image_url: "",
  });

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
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,

      quality: 0.4,
      base64: true,
    });

    const res = await apiservice({
      path: "/image/create",
      method: "post",
      body: {
        name: result.uri.split("/").reverse()[0],
        base64: "data:image/png;base64," + result.base64,
      },
    });

    if (res.status == 200) {
      setImage(result.uri);
      setState({
        ...state,
        image_url: res.data.imageRefId.replace(".png", ""),
      });
    } else {
    }
  };
  async function Create() {
    if (state.title != "" && state.image_url != "") {
      const create = await authActionCreateLesson({
        state,
        token: token.accessToken,
      });
      if (create) {
        setModalVisible(!modalVisible);
        getLesson();
      }
    }
  }

  async function EditLesson() {
    if (state.title != "" && state.image_url != "") {
      const edit = await authActionEditLesson({
        state,
        token: token.accessToken,
        id: idEdit,
      });
      if (edit) {
        setModalVisible(!modalVisible);
        getLesson();
      }
    }
  }
  async function Delete() {
    const del = await authActionDeleteLesson({
      id,
    });
    if (del) {
      setModalVisible1(!modalVisible1);
      getLesson();
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
            <Entypo name="chevron-thin-left" size={24} color="#484848" />
          </TouchableOpacity>
          <Text style={styles.textTitle}>Lesson</Text>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}
            style={{ width: "10%" }}
          >
            <AntDesign
              name={add ? "checkcircleo" : "pluscircleo"}
              size={24}
              color="#484848"
            />
            {/* checkcircleo */}
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            numColumns={1}
            style={{}}
            data={lesson}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  disabled={add ? true : false}
                  onPress={() => {
                    navigation.navigate("LessonList", item);
                  }}
                  style={styles.button}
                >
                  <Text style={styles.textSubject}>{item.title}</Text>
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                      onPress={() => {
                        setidEdit(item.id);
                        setState({
                          ...state,
                          image_url: item.image_url,
                          title: item.title,
                        });
                        setImage(item.image_url);
                        setModalVisible(true);
                      }}
                      style={{ marginRight: 10 }}
                    >
                      <Feather name="edit" size={18} color="#484848" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setid(item.id);
                        setModalVisible1(true);
                      }}
                    >
                      <AntDesign name="delete" size={18} color="#484848" />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
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
            <TouchableOpacity
              onPress={pickImage}
              style={{
                width: "70%",
                height: 200,
                borderWidth: 0.3,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {state.image_url != "" ? (
                <Image
                  resizeMode="stretch"
                  style={{ width: "100%", height: 200 }}
                  source={{
                    uri:
                      "http://144.126.242.196:5000/api/image/getimage/" +
                      state.image_url,
                  }}
                />
              ) : (
                <AntDesign name="pluscircleo" size={24} color="#CCCCCC" />
              )}
            </TouchableOpacity>
            <View style={{ width: "70%", marginTop: 10 }}>
              <TextInput
                value={state.title}
                onChangeText={(text) => {
                  setState({ ...state, title: text });
                }}
                placeholder="Type name of new lesson ...."
                style={styles.textInput}
              />
            </View>
            <View style={{ flexDirection: "row" }}>
              {idEdit != undefined ? (
                <TouchableOpacity
                  onPress={EditLesson}
                  style={styles.buttonModal}
                >
                  <Text style={[styles.textButton, { fontFamily: "Roboto" }]}>
                    edit
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={Create} style={styles.buttonModal}>
                  <Text style={[styles.textButton, { fontFamily: "Roboto" }]}>
                    Save
                  </Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                onPress={() => {
                  setState({ ...state, title: "", image_url: "" });
                  setModalVisible(!modalVisible);
                }}
                style={[styles.buttonModal, { marginLeft: 40 }]}
              >
                <Text style={[styles.textButton, { fontFamily: "Roboto" }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible1}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible1(!modalVisible1);
        }}
      >
        <View style={styles.bgModal}>
          <View style={[styles.viewDetailModal]}>
            <Text style={styles.textButton}>
              Are you sure to delete this lesson?
            </Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={Delete} style={styles.buttonModal}>
                <Text style={[styles.textButton, { fontFamily: "Roboto" }]}>
                  Yes
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible1(!modalVisible1);
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
    alignSelf: "center",
    textAlign: "center",
    marginBottom: 10,
  },
  button: {
    width: "100%",
    height: 65,
    borderWidth: 0.4,
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "#484848",
    paddingHorizontal: 22,
    borderRadius: 5,
    marginTop: 24,
    alignItems: "center",
  },
  textSubject: {
    fontSize: 18,
    fontFamily: "Roboto",
    color: "#484848",
  },
  textInput: {
    fontSize: 14,
    fontFamily: "Roboto",
    color: "#484848",
    borderWidth: 0.3,
    width: "100%",
    height: 35,
    marginTop: 5,
    paddingHorizontal: 5,
  },
  bgModal: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000000bb",
    justifyContent: "center",
  },
  viewDetailModal: {
    width: "80%",

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
  textButton: {
    fontSize: 14,
  },
});
