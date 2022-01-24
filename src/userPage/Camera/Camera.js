import React, { useEffect, useState, useRef } from "react";
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
import * as ImagePicker from "expo-image-picker";
import moment from "moment";
import {
  MaterialCommunityIcons,
  Entypo,
  FontAwesome,
  MaterialIcons,
  Feather,
  FontAwesome5,
  SimpleLineIcons,
} from "@expo/vector-icons";
const { width, height } = Dimensions.get("screen");
import { Camera } from "expo-camera";

export default function Camara({ navigation }) {
  const cameraRef = useRef();
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [isPreview, setIsPreview] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [result, setResult] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [page, setPage] = useState(1);
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,

      quality: 0.4,
      base64: true,
    });

    // const res = await apiservice({
    //   path: "/image/create",
    //   method: "post",
    //   body: {
    //     name: result.uri.split("/").reverse()[0],
    //     base64: "data:image/png;base64," + result.base64,
    //   },
    // });

    // if (res.status == 200) {
    //   setState({
    //     ...state,
    //     image_profile: res.data.imageRefId.replace(".png", ""),
    //   });
    // } else {
    // }
  };
  const onCameraReady = () => {
    setIsCameraReady(true);
  };
  const onSnap = async () => {
    // if (cameraRef.current) {
    const options = { quality: 0.7, base64: true };
    const data = await cameraRef.current.takePictureAsync(options);
    const source = data.base64;

    if (source) {
      await cameraRef.current.pausePreview();
      setIsPreview(true);
      setPage(2);

      // let base64Img = `data:image/jpg;base64,${source}`;
      // let apiUrl =
      //   "https://api.cloudinary.com/v1_1/<your-cloud-name>/image/upload";
      // let data = {
      //   file: base64Img,
      //   upload_preset: "<your-upload-preset>",
      // };
      // }
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
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
            paddingHorizontal: 29,
          }}
        >
          {page == 3 ? (
            <TouchableOpacity
              onPress={() => {
                setPage(1);
              }}
            >
              <SimpleLineIcons name="reload" size={20} color="#484848" />
            </TouchableOpacity>
          ) : (
            <Text style={{ width: "10%" }}></Text>
          )}

          <Text style={styles.textTitle}>Camera</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("HistoryResult");
            }}
          >
            <MaterialCommunityIcons
              name="clock-time-four-outline"
              size={26}
              color="#484848"
            />
          </TouchableOpacity>
        </View>
        <Camera
          style={styles.camera}
          type={type}
          onCameraReady={onCameraReady}
          ref={cameraRef}
        ></Camera>
        {page == 1 ? (
          <View style={styles.viewCapture}>
            <Text style={{ width: "15%" }}></Text>
            <TouchableOpacity
              activeOpacity={0.7}
              disabled={!isCameraReady}
              onPress={onSnap}
              style={styles.capture}
            >
              <Image
                style={{ width: 50, height: 50 }}
                source={require("../../img/camera.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={pickImage} style={{ marginRight: 30 }}>
              <Feather name="image" size={30} color="#484848" />
            </TouchableOpacity>
          </View>
        ) : page == 2 ? (
          <View style={{ alignSelf: "center", marginTop: 25 }}>
            <TouchableOpacity
              onPress={() => {
                setPage(3);
              }}
              style={styles.button}
            >
              <Text style={styles.textButton}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setPage(1);
              }}
              style={[styles.button, { backgroundColor: "#F0EAE6" }]}
            >
              <Text style={styles.textButton}>Re-take</Text>
            </TouchableOpacity>
          </View>
        ) : (
          page == 3 && (
            <View style={{ paddingHorizontal: 24 }}>
              <View style={styles.viewTopic}>
                <Text style={styles.textSuject}>Result</Text>
                <Text style={styles.textDate}>
                  Date : 24/11/2021 Time : 21:21
                </Text>
              </View>
              <View style={styles.viewTopic}>
                <Text style={styles.textSujectLight}>Sour</Text>
                <Text style={styles.textSujectLight}>pH6.3</Text>
              </View>
              <View style={styles.viewTopic}>
                <Text style={styles.textSujectLight}>Sweetness</Text>
                <Text style={styles.textSujectLight}>20 brix</Text>
              </View>
              <View style={styles.viewTopic}>
                <Text style={styles.textSujectLight}>
                  Total dissolved solids (TDS)
                </Text>
                <Text style={styles.textSujectLight}>40 ppm</Text>
              </View>
            </View>
          )
        )}
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
    width: "60%",
    textAlign: "center",
    marginBottom: 10,
  },
  camera: {
    width: "100%",
    height: 353,
    marginTop: 10,
  },
  capture: {
    backgroundColor: "#E0DAD6",
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: width * 0.65,
    height: 33,
    backgroundColor: "#E0DAD6",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    borderWidth: 0.3,
    borderColor: "#484848",
  },
  textButton: { fontSize: 14, fontFamily: "RobotoLight", color: "#484848" },
  viewCapture: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 70,
    alignItems: "center",
  },
  viewTopic: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  textSuject: {
    fontSize: 18,
    fontFamily: "Roboto",
    color: "#484848",
  },
  textSujectLight: {
    fontSize: 18,
    fontFamily: "RobotoLight",
    color: "#484848",
  },
  textDate: {
    fontSize: 10,
    fontFamily: "Roboto",
    color: "#888888",
  },
});
