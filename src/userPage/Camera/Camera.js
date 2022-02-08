import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import {
  MaterialCommunityIcons,
  Feather,
  SimpleLineIcons,
} from "@expo/vector-icons";
const { width, height } = Dimensions.get("screen");
import { Camera } from "expo-camera";
import axios from "axios";
import { apiservice } from "../../service/api";
import { useRecoilValue } from "recoil";
import { tokenState } from "../../recoil/recoil";
import moment from "moment";

export default function Camara({ navigation }) {
  const cameraRef = useRef();
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [isPreview, setIsPreview] = useState(false);
  const [imageTODO, setimageTODO] = useState({});

  const [isCameraReady, setIsCameraReady] = useState(false);
  const [result, setResult] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [results, serResults] = useState(0);
  const [DefaultsImage, setDefaultsImage] = useState("");
  const token = useRecoilValue(tokenState);

  console.log(DefaultsImage);

  const [page, setPage] = useState(1);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.4,
      base64: true,
    });

    let localUri = result.uri;
    let filename = localUri.split("/").pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    // let formData = new FormData();
    setimageTODO({ uri: localUri, name: filename, type });
    // formData.append("file", { uri: localUri, name: filename, type });

    const base64upload = await apiservice({
      path: "/image/create",
      method: "post",
      body: {
        name: result.uri.split("/").reverse()[0],
        base64: "data:image/png;base64," + result.base64,
      },
    });

    setDefaultsImage(base64upload.data.imageRefId);
    setPage(2);
    // const res = await axios.post(
    //   "https://getprediction-eb7wj7y6sa-as.a.run.app",
    //   formData,
    //   {
    //     headers: { "Content-Type": "multipart/form-data" },
    //   }
    // );

    // if (res.status == 200) {
    //   serResults(res.data["Prediction (pH)"]);
    //   setPage(2);
    //   setResult(false);
    // } else {
    //   setResult(false);
    // }

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
    const result = await cameraRef.current.takePictureAsync(options);

    console.log(result.uri);
    // const source = data.base64;

    let localUri = result.uri;
    let filename = localUri.split("/").pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    setimageTODO({ uri: localUri, name: filename, type });

    const base64upload = await apiservice({
      path: "/image/create",
      method: "post",
      body: {
        name: result.uri.split("/").reverse()[0],
        base64: "data:image/png;base64," + result.base64,
      },
    });

    setDefaultsImage(base64upload.data.imageRefId);
    setPage(2);
    // if (source) {
    //   await cameraRef.current.pausePreview();
    //   setIsPreview(true);
    //   setPage(2);
    // }
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
      <Modal transparent={true} visible={result}>
        <View
          style={{
            flex: 1,
            backgroundColor: "#00000080",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size={"large"} />
        </View>
      </Modal>
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
        {page == 1 && (
          <Camera
            style={styles.camera}
            type={type}
            onCameraReady={onCameraReady}
            ref={cameraRef}
          ></Camera>
        )}
        {page == 2 && (
          <Image
            style={[
              styles.camera,
              { width: width * 0.9, backgroundColor: "#000" },
            ]}
            source={{
              uri:
                "https://api-cof.wishesexistence.co/api/image/getimage/" +
                DefaultsImage.replace(".png", ""),
            }}
          />
        )}
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
              onPress={async () => {
                setResult(true);
                let formData = new FormData();
                formData.append("file", imageTODO);

                const res = await axios.post(
                  "https://getprediction-eb7wj7y6sa-as.a.run.app",
                  formData,
                  {
                    headers: { "Content-Type": "multipart/form-data" },
                  }
                );

                if (res.status == 200) {
                  serResults(res.data["Prediction (pH)"]);

                  setResult(false);
                  const res1 = await apiservice({
                    path: "/lesson/createhistory",
                    method: "post",
                    body: {
                      Sour: res.data["Prediction (pH)"],
                      Sweet: 0,
                      image_url: DefaultsImage,
                      total: 0,
                    },
                    token: token.accessToken,
                  });

                  if (res1.status == 200) {
                    setPage(3);
                  }
                } else {
                  setResult(false);
                }
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
                  Date : {moment().format("DD/MM/YYYYY")} Time :{" "}
                  {moment().format("HH:mm")}
                </Text>
              </View>
              <View style={styles.viewTopic}>
                <Text style={styles.textSujectLight}>Sour</Text>
                <Text style={styles.textSujectLight}>
                  pH{results.toFixed(2)}
                </Text>
              </View>
              {/* <View style={styles.viewTopic}>
                <Text style={styles.textSujectLight}>Sweetness</Text>
                <Text style={styles.textSujectLight}>20 brix</Text>
              </View> */}
              {/* <View style={styles.viewTopic}>
                <Text style={styles.textSujectLight}>
                  Total dissolved solids (TDS)
                </Text>
                <Text style={styles.textSujectLight}>40 ppm</Text>
              </View> */}
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
