import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  Alert,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  ScrollView,
  FlatList,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import {
  MaterialCommunityIcons,
  Feather,
  Ionicons,
  SimpleLineIcons,
  Entypo,
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
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [result, setResult] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [results, serResults] = useState(0);
  const [DefaultsImage, setDefaultsImage] = useState("");
  const token = useRecoilValue(tokenState);

  const [page, setPage] = useState(1);
  const [species, setspecies] = useState(false);
  const [data, setdata] = useState();
  const [select, setSelect] = useState("-");
  const [resultPh, setresultPh] = useState();
  const [description, setdescription] = useState("-");
  const [state, setState] = useState({
    brand: "-",
    source:"-",
    quantity: 0,
    temp: 0,
    timeh: 0,
    timem: 0,
  });

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

    const base64upload = await apiservice({
      path: "/image/create",
      method: "post",
      body: {
        name: "ANALYSIS" + result.uri.split("/").reverse()[0],
        base64: "data:image/png;base64," + result.base64,
      },
    });

    setDefaultsImage(base64upload.data.imageRefId);
    setPage(2);
  };

  const onCameraReady = () => {
    setIsCameraReady(true);
  };
  const onSnap = async () => {
    // if (cameraRef.current) {
    const options = { quality: 0.7, base64: true };
    const result = await cameraRef.current.takePictureAsync(options);

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
        name: "ANALYSIS" + result.uri.split("/").reverse()[0],
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
      <SafeAreaView>
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

            <View style={[styles.viewAboutpHModal,]}>

              <TouchableOpacity
                onPress={() => {
                  setModalVisible1(false);
                }}
                style={{ position: "absolute", right: 10, top: 10 }}
              >
                <Ionicons name="close-outline" size={24} color="#000000" />
              </TouchableOpacity>

              <View style={{
                  alignItems: 'flex-start',
                  justifyContent:'center',
                  width:'80%',
                  height:'100%',
                  // backgroundColor:'red',
                }}
                >

                  <Image
                      style={{
                        marginLeft:'25%',
                        // marginTop:'10%',
                        width:'50%',
                        height: '15%'
                      }}
                      source={require('../../img/roast.png')} />
                      <Text>{'\n'}</Text>
                  <View style={{ flexDirection: 'row',flexWrap: 'wrap' }}>
                    <Text style={{ fontFamily: "RobotoBold", fontSize:16,textAlign: 'justify',}}>The average pH value </Text>
                    <Text style={{fontSize:16,textAlign: 'justify',}}>is around </Text>
                    <Text style={{ fontFamily: "RobotoBold", fontSize:16, textAlign: 'justify',}}>4.85</Text>
                    <Text style ={{fontSize:16,textAlign: 'justify',}}>to </Text>
                    <Text style={{ fontFamily: "RobotoBold", fontSize:16, textAlign: 'justify',}}>5.10</Text>
                  </View>
                  <Text style={{  fontSize:16}}>{'      '}The longer the beans are roasted, the darker they become. The darker they become, the less acid they contain.</Text>
                  <Text>{'\n'}</Text>
                  <View style = {{flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style = {{ fontFamily: "RobotoBold", fontSize:16, textAlign: 'justify',}}>{'      • '}Shorter roasting times</Text>
                    <Text style = {{fontSize:16,}}>{'          '}produce light roast coffee beans, which are the most acidic.</Text>
                  </View>
                  <View style = {{flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style = {{ fontFamily: "RobotoBold", fontSize:16, textAlign: 'justify',}}>{'      • '}Medium roast times</Text>
                    <Text style ={{fontSize:16,}}>{'          '}yield medium roasts with a light brown color and medium levels of acidity.</Text>
                  </View>
                  <View style = {{flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style = {{ fontFamily: "RobotoBold", fontSize:16, textAlign: 'justify',}}>{'      • '}Longer roasting times</Text>
                    <Text style ={{fontSize:16,}}>{'          '}processes produce dark beans, which contain the lowest levels of acid.</Text>
                  </View>
                  <Text>{'\n'}</Text>
                  <View style={{ flexDirection: 'row', flexWrap:'wrap', }}>
                    <Text style={{ fontFamily: "RobotoBold", fontSize:16,}}>Hints</Text>
                    <Text style={{fontSize:16}}>{'          '}You can make coffee less acidic by simply adding milk. The calcium in milk neutralizes some of the acids in the coffee. </Text>
                  </View>
                  {/* <Text>{'\n'}</Text>
                  <Text style={{fontSize:16}}>pH 4.80 - 4.89 = Very sour</Text>
                  <Text style={{fontSize:16}}>pH 4.90 - 5.09 = Sour</Text>
                  <Text style={{fontSize:16}}>pH 5.10 - 5.30 = Not too sour</Text> */}
                </View>
            </View>

          </View>


        </Modal>
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
            <TouchableWithoutFeedback
              onPress={Keyboard.dismiss}
              accessible={false}
            >
              <View style={[styles.viewDetailModal]}>
                <Text style={styles.text}>
                  Take notes on the roasting process.
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 14,
                  }}
                >
                  <Text style={styles.text}>Brand : </Text>
                  <TextInput
                  onChangeText={(text) => {
                    setState({ ...state, brand: text});
                  }}
                    style={{
                      width: "60%",
                      borderRadius: 5,
                      height: 29,
                      backgroundColor: "#F1F1F1",
                      paddingHorizontal: 10,
                      fontSize: 14,
                      fontFamily: "Roboto",
                      color: "#484848",
                    }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 20,
                  }}
                >
                  <Text style={styles.text}>Coffee species : </Text>
                  <View style={{}}>
                    <TouchableOpacity
                      onPress={() => {
                        Keyboard.dismiss;
                        setspecies((val) => !val);
                      }}
                      style={{
                        width: width * 0.36,
                        borderRadius: 5,
                        height: 29,
                        backgroundColor: "#F1F1F1",
                        paddingHorizontal: 10,
                        justifyContent: "center",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderBottomLeftRadius: species ? 0 : 5,
                        borderBottomRightRadius: species ? 0 : 5,
                      }}
                    >
                      <Text style={styles.text}>
                        {select == null ? "Please select" : select}
                      </Text>

                      <Ionicons
                        name="ios-caret-down-outline"
                        size={20}
                        color="#484848"
                      />
                    </TouchableOpacity>
                    {species && (
                      <View
                        style={{
                          width: width * 0.36,
                          backgroundColor: "#FFFFFF",
                          position: "absolute",
                          marginTop: 29,

                          borderWidth: 1,
                          borderColor: "#eee",
                          zIndex: 99,
                        }}
                      >
                        <FlatList
                          numColumns={1}
                          style={{}}
                          data={["Arabica", "Robusta", "Excelsa", "Liberica"]}
                          renderItem={({ item, index }) => {
                            return (
                              <TouchableOpacity
                                onPress={() => {
                                  setSelect(item);
                                  setspecies(false);
                                }}
                                style={{
                                  height: 29,
                                  borderTopWidth: 1,
                                  paddingHorizontal: 10,
                                  borderColor: "#eee",
                                  justifyContent: "center",
                                }}
                              >
                                <Text style={styles.text}>{item}</Text>
                              </TouchableOpacity>
                            );
                          }}
                        />
                      </View>
                    )}
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 20,
                    zIndex: -1,
                  }}
                >
                  <Text style={styles.text}>Source : </Text>
                  <TextInput
                  onChangeText={(text) => {
                    setState({ ...state, source: text});
                  }}
                    style={{
                      width: "58%",
                      borderRadius: 5,
                      height: 29,
                      backgroundColor: "#F1F1F1",
                      paddingHorizontal: 10,
                      fontSize: 14,
                      fontFamily: "Roboto",
                      color: "#484848",
                    }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 20,
                    zIndex: -1,
                  }}
                >
                  <Text style={styles.text}>Quantity : </Text>
                  <TextInput
                  keyboardType="number-pad"
                  onChangeText={(value) => {
                    setState({ ...state, quantity: value});
                  }}
                    style={{
                      width: "43%",
                      borderRadius: 5,
                      height: 29,
                      backgroundColor: "#F1F1F1",
                      paddingHorizontal: 10,
                      fontSize: 14,
                      fontFamily: "Roboto",
                      color: "#484848",
                      marginRight: 10,
                    }}
                  />
                  <Text style={styles.text}>gram</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 20,
                    zIndex: -1,
                    width: "72%",
                  }}
                >
                  <Text style={styles.text}>Temperature : </Text>
                  <TextInput
                    maxLength={3}
                    keyboardType="number-pad"
                    onChangeText={(value) => {
                      setState({ ...state, temp: value});
                    }}
                    style={{
                      width: "20%",
                      borderRadius: 5,
                      height: 29,
                      backgroundColor: "#F1F1F1",
                      paddingHorizontal: 10,
                      fontSize: 14,
                      fontFamily: "Roboto",
                      color: "#484848",
                    }}
                  />
                  <Text style={styles.text}>°C</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 20,
                    width: "73%",
                  }}
                >
                  <Text style={styles.text}>Time : </Text>
                  <TextInput
                    keyboardType="numeric"
                    maxLength={3}
                    onChangeText={(value) => {
                      setState({ ...state, timeh: value});
                    }}
                    style={{
                      width: "20%",
                      borderRadius: 5,
                      height: 29,
                      backgroundColor: "#F1F1F1",
                      paddingHorizontal: 10,
                      fontSize: 14,
                      fontFamily: "Roboto",
                      color: "#484848",
                      textAlign: "center",
                    }}
                  />
                  <Text style={[styles.text, { marginHorizontal: 5 }]}>:</Text>
                  <TextInput
                    keyboardType="numeric"
                    onChangeText={(value) => {
                      setState({ ...state, timem: value});
                    }}
                    maxLength={2}
                    style={{
                      width: "20%",
                      borderRadius: 5,
                      height: 29,
                      backgroundColor: "#F1F1F1",
                      paddingHorizontal: 10,
                      fontSize: 14,
                      fontFamily: "Roboto",
                      textAlign: "center",
                      color: "#484848",
                    }}
                  />
                </View>
                <Text
                  style={[
                    styles.text,
                    {
                      color: "#000",
                      marginTop: 20,
                      alignSelf: "flex-start",
                      marginLeft: 40,
                    },
                  ]}
                >
                  Note :
                </Text>

                <TextInput
                  placeholderTextColor={"#484848"}
                  onChangeText = {setdescription}
                  multiline
                  style={[
                    styles.text,
                    styles.input,
                    { backgroundColor: "#F1F1F1" },
                  ]}
                />
                <View style={{ flexDirection: "row", marginTop: 20 }}>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(false);
                    }}
                    style={{
                      width: width * 0.28,
                      height: 25,
                      backgroundColor: "#EDE8E6",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.text}>Back</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={async () => {
                      if ( !isNaN(state.quantity) && !isNaN(state.temp) && !isNaN(state.timeh) && !isNaN(state.timem) ){
                      const res1 = await apiservice({
                        path: "/lesson/createhistory",
                        method: "post",
                        body: {
                          Sour: results,
                          image_url: DefaultsImage,
                          brand: state.brand,
                          source:state.source,
                          species: select,
                          quantity: state.quantity,
                          temp: state.temp,
                          timeh: state.timeh,
                          timem: state.timem,
                          description: description
                        },
                        token: token.accessToken,
                      });
                      if (res1.status == 200) {
                        setPage(1);
                        setModalVisible(false);
                      }
                    } else if ( isNaN(state.quantity) ){
                      Alert.alert("Quantity should be number such as 2, 2.5, 5!!")
                    } else {
                      Alert.alert("Temp, Time sholud be integer such as 2, 10, 20!!")
                    }
                    }}
                    style={{
                      width: width * 0.28,
                      height: 25,
                      backgroundColor: "#EDE8E6",
                      justifyContent: "center",
                      alignItems: "center",
                      marginLeft: 10,
                    }}
                  >
                    <Text style={styles.text}>Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
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
              <TouchableOpacity
                onPress={() => {
                  // setModalVisible(true);
                  navigation.navigate("CameraGuide");
                }}
              >
                <Ionicons name="alert-circle-outline" size={24} color="#000000" />
              </TouchableOpacity>

            )}

            <Text style={styles.textTitle}>Coffee Analysis</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("HistoryResult");
              }}>
              <Feather name="save" size={20} color="#z484848" />
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
                  "http://165.22.251.6:5000/api/image/getimage/" +
                  DefaultsImage.replace(".png", ""),
              }}
            />
          )}
          {page == 1 ? (
            <View>
              <View style={styles.viewCapture}>
                <Text style={{ width: "15%" }}></Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  disabled={!isCameraReady}
                  onPress={onSnap}
                  style={styles.capture}
                >
                  <Image
                    style={{ width: 40, height: 40 }}
                    source={require("../../img/camera.png")}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={pickImage}
                  style={{ marginRight: 30 }}
                >
                  <Feather name="image" size={30} color="#484848" />
                </TouchableOpacity>
              </View>

              {/* <View
                style={{
                  width: width * 0.8,
                  backgroundColor: "#E0DAD6",
                  alignSelf: "center",
                  marginTop: 40,
                  borderRadius: 5,
                  paddingHorizontal: 20,
                  paddingVertical: 20,
                }}
              > */}
              <View style={{
                alignItems: 'center',
                justifyContent: "center",
                width: '80%',
                height: '20%',
                borderRadius: 10,
                backgroundColor: "#E0DAD6",
                marginLeft: '10%',
              }}
              // E0DAD6
              >
                <View style={{
                  alignItems: 'center',
                }}
                >
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontFamily: "RobotoBold" }}>Hints</Text>
                    <Text style={{}}>: For best results, please utilize a </Text>
                  </View>
                  <Text style={{ fontFamily: "RobotoBold", }}>white background</Text>
                </View>


                {/* <TouchableOpacity
              onPress={() => {
                setModalVisible1(true);

              }}
              style={{
                width: 160,
                height: 67,

                position: "absolute",
                bottom: 0,
                alignSelf: "center",
              }}
            >
              <View
                style={{
                  width: 60,
                  height: 18,
                  backgroundColor: "#FFF",
                  borderTopRightRadius: 20,
                  borderTopLeftRadius: 20,
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                }}
              >
                <Entypo name="chevron-small-up" size={24} color="#000000" />
              </View>
              <View
                style={{
                  width: 160,
                  height: 49,
                  backgroundColor: "#FFF",
                  borderTopRightRadius: 20,
                  borderTopLeftRadius: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={styles.textSujectLight}>About pH Value</Text>
              </View>
            </TouchableOpacity> */}
              </View>
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
                    setdata(res.data["Prediction (pH)"]);

                    setResult(false);
                    // const res1 = await apiservice({
                    //   path: "/lesson/createhistory",
                    //   method: "post",
                    //   body: {
                    //     Sour: res.data["Prediction (pH)"],
                    //     Sweet: 0,
                    //     image_url: DefaultsImage,
                    //     total: 0,
                    //   },
                    //   token: token.accessToken,
                    // });

                    // if (res1.status == 200) {
                    setTimeout(() => {
                      if (data > 0 && data < 1) {
                        setresultPh(0);
                      } else if (data >= 1 && data < 1.5) {
                        setresultPh(1);
                      } else if (data >= 1.5 && data < 2.5) {
                        setresultPh(2);
                      } else if (data >= 2.5 && data < 3.5) {
                        setresultPh(3);
                      } else if (data >= 3.5 && data < 4.5) {
                        setresultPh(4);
                      } else if (data >= 4.5 && data < 5.5) {
                        setresultPh(5);
                      } else if (data >= 5.5 && data < 6.5) {
                        setresultPh(6);
                      } else if (data >= 6.5 && data < 7.5) {
                        setresultPh(7);
                      } else if (data >= 7.5 && data < 8.5) {
                        setresultPh(8);
                      } else if (data >= 8.5 && data < 9.5) {
                        setresultPh(9);
                      } else if (data >= 9.5 && data < 10.5) {
                        setresultPh(10);
                      } else if (data >= 10.5 && data < 11.5) {
                        setresultPh(11);
                      } else if (data >= 11.5 && data < 12.5) {
                        setresultPh(12);
                      } else if (data >= 12.5 && data < 13.5) {
                        setresultPh(13);
                      } else if (data >= 13.5 && data < 14.5) {
                        setresultPh(14);
                      }
                    }, 500);

                    setPage(3);
                    // }
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
              <ScrollView>
                <Image
                  style={[
                    styles.camera,
                    {
                      width: width * 0.94,
                      backgroundColor: "#000",
                      height: 353,
                    },
                  ]}
                  source={{
                    uri:
                      "http://165.22.251.6:5000/api/image/getimage/" +
                      DefaultsImage.replace(".png", ""),
                  }}
                />
                <View style={{ paddingHorizontal: 24 }}>
                  <View style={styles.viewTopic}>
                    <Text style={styles.textSuject}>
                      Result:
                      <Text style={styles.textSujectLight}>
                        {data >= 0 && data <= 4.49
                          ? "-"
                          : data >= 4.5 && data <= 4.89
                            ? "Light Roast"
                            : data >= 4.9 && data <= 5.09
                              ? "Medium Roast"
                              : data >= 5.1 && data <= 6
                                ? "Dark Roast"
                                : data >= 6.01 && data <= 14 && "-"}
                      </Text>
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        setModalVisible(true);
                      }}
                    >
                      <Feather name="edit-3" size={20} color="#484848" />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.viewTopic}>
                    <Text style={styles.textSujectLight}>Sour</Text>
                    <Text style={styles.textSujectLight}>
                      pH{results.toFixed(2)}
                    </Text>
                  </View>
                  <FlatList
                    horizontal
                    scrollEnabled={false}
                    style={{ marginTop: 20 }}
                    data={[
                      "#771714",
                      "#982c2b",
                      "#bf3333",
                      "#dc4a33",
                      "#ec9e3f",
                      "#f6cd47",
                      "#f2ea52",
                      "#a2c654",
                      "#4f9969",
                      "#3e6998",
                      "#2c3487",
                      "#8e3c64",
                      "#863289",
                      "#74317b",
                      "#5c2765",
                    ]}
                    renderItem={({ item, index }) => {
                      return (
                        <View style={{ alignItems: "center" }}>
                          <Text
                            style={
                              index == data
                                ? [styles.textSuject, { fontSize: 11 }]
                                : [styles.textSujectLight, { fontSize: 11 }]
                            }
                          >
                            {index}
                          </Text>
                          <View
                            style={{
                              borderWidth: index == Math.floor(data) ? 3 : 0,
                              borderColor: "#484848",
                              backgroundColor: item,
                              width: width * 0.055,
                              height: width * 0.055,
                            }}
                          />
                        </View>
                      );
                    }}
                  />
                  <Text style={[styles.textSuject, { marginVertical: 10 }]}>
                    Taste
                  </Text>
                  <Text style={styles.textSujectLight}>
                    {data >= 0 && data <= 4.49
                      ? "Unidentified because coffee beans usually have the pH value only between 4.5 - 6.0"
                      : data >= 4.5 && data <= 4.89
                        ? "The fruit acids in the coffee give it a sour flavor, with a hint of sweetness on the tip of the tongue."
                        : data >= 4.9 && data <= 5.09
                          ? "There isn't much sour flavor. The aroma will lean toward caramel and a hint of nutty, almonds. Coffee will increase the weight of the body."
                          : data >= 5.1 && data <= 6
                            ? "It tastes slightly sweet and bitter. There is no residual sourness. The perfume of coffee combined with the intense smell of coffee Suitable for creating strong-flavored iced coffee."
                            : data >= 6.01 &&
                            data <= 14 &&
                            "Unidentified because coffee beans usually have the pH value only between 4.5 - 6.0 "}
                  </Text>
                  <Text style={[styles.textSuject, { marginVertical: 10 }]}>
                    Recommend Menu
                  </Text>
                  <Text
                    style={[
                      styles.textSujectLight,
                      { marginVertical: 5,
                        marginBottom: Platform.OS == 'android' ? height * 0.15 : 50,},
                    ]}
                  >
                    {data >= 0 && data <= 4.49
                      ? "-"
                      : data >= 4.5 && data <= 4.89
                        ? "• Hot Coffee"
                        : data >= 4.9 && data <= 5.09
                          ? "• Cappuccino\n• Mocha\n• Latte"
                          : data >= 5.1 && data <= 6
                            ? "• Iced espresso\n• Coffee shake"
                            : data >= 6.01 && data <= 14 && "-"}
                  </Text>
                </View>


              </ScrollView>
            )
          )}
          {page == 3 && (
            <TouchableOpacity
              onPress={() => {
                setModalVisible1(true);
              }}
              style={{
                width: 160,
                height: 67,
                marginBottom: Platform.OS == 'android' ? height * 0.1 : 20,
                // marginTop: Platform.OS == 'android' ? height *  : 20,
                position: "absolute",
                bottom: 0,
                alignSelf: "center",
              }}
            >
              <View
                style={{
                  width: 60,
                  height: 18,
                  backgroundColor: "#FFF",
                  borderTopRightRadius: 20,
                  borderTopLeftRadius: 20,
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                }}
              >
                <Entypo name="chevron-small-up" size={24} color="#000000" />
              </View>
              <View
                style={{
                  width: 160,
                  height: 49,
                  backgroundColor: "#FFF",
                  borderTopRightRadius: 20,
                  borderTopLeftRadius: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={styles.textSujectLight}>About pH Value</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
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
    marginTop: 20,
    marginBottom: 20,
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
  text: {
    fontSize: 14,
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
  viewAboutpHModal: {
    width: "85%",
    height:"100%",
    marginTop:"25%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    alignSelf: "center",
    alignItems: "center",
    paddingVertical: 29,
  },
  input: {
    width: "75%",
    minHeight: 117,
    backgroundColor: "#FFFFFF",
    padding: 13,
    marginTop: 13,
    textAlignVertical: "top",
  },
});
