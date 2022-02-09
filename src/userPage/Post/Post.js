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
import { useRecoilState } from "recoil";
import { tokenState } from "../../recoil/recoil";
import {
  authActionCreateFeed,
  authActionEditFeed,
} from "../../action/authAction";
import * as ImagePicker from "expo-image-picker";
import { apiservice } from "../../service/api";
const { width, height } = Dimensions.get("screen");
export default function Post({ navigation, route }) {
  const [token, setToken] = useRecoilState(tokenState);

  const data = route.params;
  const [id, setId] = useState(route.params);
  const [image, setImage] = useState(null);
  const [state, setState] = useState({
    image_url: route.params != undefined ? data.image_url : "",
    title: route.params != undefined ? data.title : "",
    description: route.params != undefined ? data.description : "",
    id: route.params != undefined && data.id,
  });
  const [body, setbody] = useState({
    image_url: "",
    title: "",
    description: "",
  });

  async function post() {
    if (body.title != "" && body.image_url != "") {
      delete body.id;

      const post = await authActionCreateFeed({
        state: body,
        token: token.accessToken,
      });

      if (post) {
        setbody({
          image_url: "",
          title: "",
          description: "",
        });
        navigation.navigate("Articles");
      }
      if (!comment) {
        Alert.alert("Error");
      }
    }
  }

  async function postEdit() {
    if (state.title != "" && state.image_url != "") {
      const edit = await authActionEditFeed({
        state,
        token: token.accessToken,
      });
      if (edit) {
        setState({
          image_url: "",
          title: "",
          description: "",
        });
        navigation.navigate("Articles");
      }
      if (!comment) {
        Alert.alert("Error");
      }
    }
  }

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
      setbody({
        ...state,
        image_url: res.data.imageRefId.replace(".png", ""),
      });
    } else {
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <View style={{ marginTop: Platform.OS === "ios" ? 0 : 30 }} />
      <ScrollView>
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
            <Text style={styles.textTitle}>New Post</Text>
            <Text style={{ width: "10%" }}></Text>
          </View>
          <TextInput
            value={state.title}
            onChangeText={(text) => {
              setState({ ...state, title: text });
              setbody({ ...state, title: text });
            }}
            placeholder="Enter your topic"
            placeholderTextColor={"#484848"}
            style={styles.inputTopic}
          />
          <TouchableOpacity onPress={pickImage} style={styles.buttonAdd}>
            {image == null && data == null ? (
              <Text style={styles.text}>+ Add Photo</Text>
            ) : (
              <Image
                style={{
                  width: "100%",
                  height: 165,

                  backgroundColor: "#cccc",
                }}
                source={{
                  uri:
                    data != null && image == null
                      ? "http://144.126.242.196:5000/api/image/getimage/" +
                        data.image_url
                      : image,
                }}
              />
            )}

            {/* <Image style={{ width: "100%", height: 165 }} source={{ uri: "" }} /> */}
          </TouchableOpacity>
          <TextInput
            value={state.description}
            onChangeText={(text) => {
              setState({ ...state, description: text });
              setbody({ ...state, description: text });
            }}
            multiline
            placeholder="Enter your article"
            placeholderTextColor={"#484848"}
            style={styles.inputArticle}
          />
          {route.params == undefined ? (
            <TouchableOpacity onPress={post} style={styles.buttonPost}>
              <Text style={styles.text}>Post</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={postEdit} style={styles.buttonPost}>
              <Text style={styles.text}>Edit</Text>
            </TouchableOpacity>
          )}
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
    height: 165,
    backgroundColor: "#FFFFFF",
    marginTop: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  inputArticle: {
    width: "100%",
    minHeight: 300,
    backgroundColor: "#FFFFFF",
    fontSize: 18,
    fontFamily: "Roboto",
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
    marginVertical: 12,
    alignSelf: "center",
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
