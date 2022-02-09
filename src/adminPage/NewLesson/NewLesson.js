import React, { useState } from "react";
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
import { KeyboardAvoidingScrollView } from "react-native-keyboard-avoiding-scroll-view";
const { width, height } = Dimensions.get("screen");
import { useRecoilState, useRecoilValue } from "recoil";
import { tokenState } from "../../recoil/recoil";
import { apiservice } from "../../service/api";
import * as ImagePicker from "expo-image-picker";
import {
  authActionCreateComponent,
  authActionEditComponent,
} from "../../action/authAction";
export default function NewLesson({ navigation, route }) {
  const [token, setToken] = useRecoilState(tokenState);

  const [image, setImage] = useState();
  const [state, setState] = useState({
    video_url: route.params.lesson == undefined ? route.params.video_url : "",
    video_name: route.params.lesson == undefined ? route.params.video_name : "",
    description:
      route.params.lesson == undefined ? route.params.description : "",
    image_url: {
      img: route.params.lesson == undefined ? route.params.image_url.img : "",
      width: "",
      height:
        route.params.lesson == undefined ? route.params.image_url.height : "",
    },
    title: route.params.lesson == undefined ? route.params.title : "",
    lesson_id:
      route.params.lesson != undefined
        ? route.params.id
        : route.params.lesson_id,
  });

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
        image_url: {
          ...state.image_url,
          img: res.data.imageRefId.replace(".png", ""),
          width: result.width,
          height: result.height,
        },
      });
    } else {
    }
  };
  async function Create() {
    if (state.title != "" && state.description != "") {
      const create = await authActionCreateComponent({
        state,
        token: token.accessToken,
      });
      const res = await apiservice({
        path: "/lesson/getalllesson",
        method: "get",
      });

      let a = res.data.filter((item) => {
        return item.id == route.params;
      });

      if (create) {
        navigation.goBack();
      }
    }
  }
  async function EditLesson() {
    if (state.title != "" && state.description != "") {
      const edit = await authActionEditComponent({
        state,
        token: token.accessToken,
        id: route.params.id,
      });
      if (edit) {
        navigation.goBack();
      }
    }
  }
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <View style={{ marginTop: Platform.OS === "ios" ? 0 : 30 }} />
      <ScrollView>
        <View style={[styles.viewDetail]}>
          <KeyboardAvoidingScrollView>
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
              <Text style={styles.textTitle}>
                {route.params.lesson == undefined
                  ? route.params.title
                  : "Name of new lesson"}
              </Text>
              <Text style={{ width: "10%" }}></Text>
            </View>
            <TextInput
              value={state.title}
              onChangeText={(text) => {
                setState({ ...state, title: text });
              }}
              placeholder="Enter topic"
              placeholderTextColor={"#484848"}
              style={styles.inputTopic}
            />
            <TouchableOpacity onPress={pickImage} style={styles.buttonAdd}>
              {state.image_url.img != "" ? (
                <Image
                  resizeMode="stretch"
                  style={{
                    width: "100%",
                    minHeight: 165,
                    height:
                      state.image_url.height != "" &&
                      state.image_url.height != undefined &&
                      state.image_url.height / 1.5,
                  }}
                  source={{
                    uri:
                      "http://144.126.242.196:5000/api/image/getimage/" +
                      state.image_url.img,
                  }}
                />
              ) : (
                <Text style={styles.text}>+ Add Photo</Text>
              )}
            </TouchableOpacity>
            <TextInput
              value={state.description}
              onChangeText={(text) => {
                setState({ ...state, description: text });
              }}
              multiline
              placeholder="Enter lesson"
              placeholderTextColor={"#484848"}
              style={styles.inputArticle}
            />
            <Text
              style={{
                fontSize: 14,
                fontFamily: "RobotoLight",
                color: "#484848",
                marginTop: 20,
              }}
            >
              Video name:
            </Text>
            <TextInput
              value={state.video_name}
              onChangeText={(text) => {
                setState({ ...state, video_name: text });
              }}
              placeholderTextColor={"#484848"}
              style={styles.inputTopic}
            />
            <Text
              style={{
                fontSize: 14,
                fontFamily: "RobotoLight",
                color: "#484848",
                marginTop: 20,
              }}
            >
              URL of video:
            </Text>
            <TextInput
              value={state.video_url}
              onChangeText={(text) => {
                setState({ ...state, video_url: text });
              }}
              placeholderTextColor={"#484848"}
              style={styles.inputTopic}
            />
            {route.params.lesson == undefined ? (
              <TouchableOpacity onPress={EditLesson} style={styles.buttonPost}>
                <Text style={styles.text}>Edit</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={Create} style={styles.buttonPost}>
                <Text style={styles.text}>Save</Text>
              </TouchableOpacity>
            )}
          </KeyboardAvoidingScrollView>
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
  inputTopic: {
    width: "100%",
    height: 37,
    backgroundColor: "#FFFFFF",
    fontSize: 18,
    fontFamily: "Roboto",
    color: "#484848",
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonAdd: {
    width: "100%",
    minHeight: 165,
    maxHeight: 600,

    backgroundColor: "#FFFFFF",
    marginTop: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  inputArticle: {
    width: "100%",
    minHeight: 300,
    backgroundColor: "#FFFFFF",
    fontSize: 14,
    fontFamily: "RobotoLight",
    color: "#484848",
    paddingHorizontal: 18,
    paddingVertical: 21,
    borderRadius: 5,
    textAlignVertical: "top",
    marginTop: 22,
  },
  buttonPost: {
    width: 89,
    height: 41,
    backgroundColor: "#EDE8E6",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    marginVertical: 32,
    alignSelf: "flex-end",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  text: {
    fontSize: 18,
    fontFamily: "Roboto",
    color: "#484848",
  },
});
