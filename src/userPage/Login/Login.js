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
  Picker,
  Platform,
  ScrollView,
  FlatList,
  Alert,
  Modal,
} from "react-native";
const { width, height } = Dimensions.get("screen");
import RNPickerSelect from "react-native-picker-select";
import DateTimePicker from "@react-native-community/datetimepicker";
import CalendarPicker from "react-native-calendar-picker";
import * as ImagePicker from "expo-image-picker";
import moment from "moment";
import {
  MaterialCommunityIcons,
  Feather,
  FontAwesome,
  AntDesign,
} from "@expo/vector-icons";
import { apiservice } from "../../service/api";
import { tokenState } from "../../recoil/recoil";
import { useRecoilState } from "recoil";

function Input({
  feather,
  email,
  placeholder,
  defaultValue,
  onChangeText,
  secureTextEntry,
}) {
  return (
    <View style={{ justifyContent: "center", marginTop: 24 }}>
      {email ? (
        <MaterialCommunityIcons
          name="email-outline"
          size={24}
          color="#484848"
          style={{ position: "absolute", marginLeft: 19 }}
        />
      ) : (
        <Feather
          name={feather}
          size={24}
          color="#484848"
          style={{ position: "absolute", marginLeft: 19 }}
        />
      )}

      <TextInput
        secureTextEntry={secureTextEntry ? true : false}
        defaultValue={defaultValue}
        onChangeText={onChangeText}
        placeholderTextColor={"#484848"}
        placeholder={placeholder}
        autoCapitalize={false}
        style={{
          width: width * 0.6,
          borderRadius: 5,
          height: 37,
          backgroundColor: "rgba(196, 196, 196, 0.14)",
          paddingLeft: width * 0.12,
          paddingRight: 10,
          fontSize: 13,
          fontFamily: "Roboto",
          color: "#484848",
        }}
      />
    </View>
  );
}

export default function Login({ navigation }) {
  const [page, setPage] = useState(0);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [openCalenda, setstate] = useState(false);
  const [selectDate, setSlectDate] = useState("dd/mm/year");
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const week = [
    "อาทิตย์",
    "จันทร์",
    "อังคาร",
    "พุธ",
    "พฤหัสบดี",
    "ศุกร์",
    "เสาร์",
  ];

  const months = [
    "ม.ค.",
    "ก.พ.",
    "ม.ค.",
    "เม.ย.",
    "พ.ค.",
    "มิ.ย.",
    "ก.ค.",
    "ส.ค.",
    "ก.ย.",
    "ต.ค.",
    "พ.ย",
    "ธ.ค.",
  ];
  const [day, setday] = useState(moment().add(543, "year").format("LLLL"));
  const [showDate, setShowDate] = useState("");
  const [regisBody, setRegisBody] = useState({
    username: "",
    password: "",
    email: "",
    first_name: "",
    last_name: "",
    image_profile: "",
    birth_date: "",
  });
  const [token, setState] = useRecoilState(tokenState);
  const [loginBody, setLoginBody] = useState({
    username: "",
    password: "",
  });
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  const login = async () => {
    const res = await apiservice({
      path: "/authen/login",
      method: "post",
      body: loginBody,
    });
    if (res.status == 200) {
      setState(res.data);
      navigation.navigate("MyTabs");
    } else {
      Alert.alert(res.data.message);
    }
  };

  async function register() {
    const res = await apiservice({
      path: "/authen/register",
      method: "post",
      body: regisBody,
    });

    if (res.status == 200) {
      Alert.alert("Register success!");
      setPage(1);
    } else {
      Alert.alert(res.data.message);
    }
  }

  async function register() {
    const res = await apiservice({
      path: "/authen/register",
      method: "post",
      body: regisBody,
    });

    if (res.status == 200) {
      Alert.alert("Register success!");
      setPage(1);
    } else {
      Alert.alert(res.data.message);
    }
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    setSlectDate(currentDate);
    setRegisBody((val) => ({ ...val, birth_date: currentDate }));
  };

  const showMode = (currentMode) => {
    setShow((val) => !val);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const placeholder = {
    label: "dd",
    value: null,
    color: "#CCCCCC",
  };

  function LoginSocial() {
    return (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity style={styles.buttonSocial}>
          <Image
            style={{ width: 20, height: 15 }}
            source={require("../../img/mail.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonSocial, { marginHorizontal: 7 }]}
        >
          <Image
            style={{ width: 20, height: 20 }}
            source={require("../../img/facebook.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonSocial}>
          <Image
            style={{ width: 20, height: 16.24 }}
            source={require("../../img/twitter.png")}
          />
        </TouchableOpacity>
      </View>
    );
  }
  console.log(regisBody);
  return (
    <View style={styles.container}>
      <View style={{ marginTop: Platform.OS === "ios" ? 0 : 30 }} />
      <SafeAreaView />
      <View style={[styles.viewDetail]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.ViewLogo}>
            <Image
              style={{
                width: page == 0 ? 169 : 101,
                height: page == 0 ? 169 : 101,
              }}
              source={require("../../img/logo.png")}
            />
            <Text style={styles.text14}>Cof-Learn</Text>
          </View>
          <View style={styles.viewLogin}>
            {page == 0 ? (
              <View>
                <Text
                  style={[styles.text14, { fontSize: 24, alignSelf: "center" }]}
                >
                  Hello!
                </Text>
                <Text
                  style={[
                    styles.text14,
                    {
                      fontFamily: "RobotoLight",
                      textAlign: "center",
                      marginTop: 12,
                    },
                  ]}
                >
                  {
                    "Welcome to Cof-Learn \nA platform where you can learn about coffee and share your experiences with friends."
                  }
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 32,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setPage(1);
                    }}
                    style={styles.buttonSign}
                  >
                    <Text style={[styles.text14, { fontFamily: "RobotoBold" }]}>
                      Sign In
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setPage(2);
                    }}
                    style={styles.buttonSign}
                  >
                    <Text style={[styles.text14, { fontFamily: "RobotoBold" }]}>
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text
                  style={[
                    styles.text14,
                    { marginTop: 24, alignSelf: "center" },
                  ]}
                >
                  Or via social media
                </Text>
                <View style={{ alignSelf: "center", marginTop: 12 }}>
                  <LoginSocial />
                </View>
              </View>
            ) : page == 1 ? (
              <View style={{ alignItems: "center" }}>
                <Text style={styles.textTitle}>SIGN IN</Text>
                <Input
                  defaultValue={loginBody.username}
                  onChangeText={(text) => {
                    setLoginBody((val) => ({ ...val, username: text }));
                  }}
                  feather={"user"}
                  placeholder={"Email / Username"}
                />
                <View>
                  <Input
                    secureTextEntry={true}
                    defaultValue={loginBody.password}
                    onChangeText={(text) => {
                      setLoginBody((val) => ({ ...val, password: text }));
                    }}
                    feather={"lock"}
                    placeholder={"Password"}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      setPage(3);
                    }}
                    style={{ marginTop: 4, alignSelf: "flex-end" }}
                  >
                    <Text
                      style={{
                        fontSize: 10,
                        fontFamily: "Roboto",
                        color: "#D1D1D1",
                      }}
                    >
                      Forgot Password
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={login} style={styles.buttonSuccess}>
                  <Text style={styles.textButton}>Login</Text>
                </TouchableOpacity>
                <LoginSocial />
                <TouchableOpacity
                  onPress={() => {
                    setPage(2);
                  }}
                  style={{ marginTop: 12 }}
                >
                  <Text style={[styles.text14, { fontSize: 11 }]}>
                    Don't have an account? Create New Account
                  </Text>
                </TouchableOpacity>
              </View>
            ) : page == 2 ? (
              <View style={{ flex: 1 }}>
                <Text style={[styles.textTitle, { alignSelf: "center" }]}>
                  SIGN UP
                </Text>
                <TouchableOpacity
                  onPress={pickImage}
                  style={{
                    width: 90,
                    height: 90,
                    borderRadius: 45,
                    backgroundColor: "rgba(196, 196, 196, 0.14)",
                    justifyContent: "center",
                    alignItems: "center",
                    alignSelf: "center",
                    marginTop: 33,
                  }}
                >
                  <Feather name="user-plus" size={30} color="#484848" />
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    marginTop: 24,
                  }}
                >
                  <View style={{ width: "46%" }}>
                    <TextInput
                      defaultValue={regisBody.first_name}
                      onChangeText={(text) => {
                        setRegisBody((val) => ({ ...val, first_name: text }));
                      }}
                      placeholderTextColor={"#484848"}
                      placeholder={"First Name"}
                      style={[styles.inputName, { paddingVertical: 5 }]}
                    />
                  </View>
                  <View style={{ width: "46%" }}>
                    <TextInput
                      defaultValue={regisBody.last_name}
                      onChangeText={(text) => {
                        setRegisBody((val) => ({ ...val, last_name: text }));
                      }}
                      placeholderTextColor={"#484848"}
                      placeholder={"Last Name"}
                      style={[styles.inputName, { paddingVertical: 5 }]}
                    />
                  </View>
                </View>
                <Input
                  defaultValue={regisBody.username}
                  onChangeText={(text) => {
                    setRegisBody((val) => ({ ...val, username: text }));
                  }}
                  feather={"user"}
                  placeholder={"Username"}
                />
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 24,
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      width: width * 0.5,
                      borderRadius: 5,
                      height: 37,
                      backgroundColor: "rgba(196, 196, 196, 0.14)",
                      paddingHorizontal: 25,
                      justifyContent: "center",
                      alignItems: "flex-start",
                    }}
                  >
                    {showDate == "" ? (
                      <Text
                        style={{
                          fontSize: 13,
                          fontFamily: "Roboto",
                          color: "#484848",
                        }}
                      >
                        dd/mm/year
                      </Text>
                    ) : (
                      <Text
                        style={{
                          fontSize: 13,
                          fontFamily: "Roboto",
                          color: "#484848",
                        }}
                      >
                        {moment(showDate).format("DD-MM-YYYY")}
                      </Text>
                    )}
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(true);
                    }}
                    style={{
                      height: 37,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Feather name="calendar" size={24} color="#484848" />
                  </TouchableOpacity>
                </View>

                <Input
                  defaultValue={regisBody.email}
                  onChangeText={(text) => {
                    setRegisBody((val) => ({ ...val, email: text }));
                  }}
                  email
                  placeholder={"Email"}
                />
                <Input
                  secureTextEntry={true}
                  defaultValue={regisBody.password}
                  onChangeText={(text) => {
                    setRegisBody((val) => ({ ...val, password: text }));
                  }}
                  feather={"lock"}
                  placeholder={"Password"}
                />
                <TouchableOpacity
                  onPress={register}
                  style={styles.buttonSuccess}
                >
                  <Text style={styles.textButton}>Create account</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: "row", alignSelf: "center" }}>
                  <TouchableOpacity style={styles.buttonSocial}>
                    <Image
                      style={{ width: 20, height: 15 }}
                      source={require("../../img/mail.png")}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.buttonSocial, { marginHorizontal: 7 }]}
                  >
                    <Image
                      style={{ width: 20, height: 20 }}
                      source={require("../../img/facebook.png")}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.buttonSocial}>
                    <Image
                      style={{ width: 20, height: 16.24 }}
                      source={require("../../img/twitter.png")}
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setPage(1);
                  }}
                  style={{ marginTop: 12, alignSelf: "center" }}
                >
                  <Text style={[styles.text14, { fontSize: 11 }]}>
                    Already have an account? Sign in
                  </Text>
                </TouchableOpacity>
              </View>
            ) : page == 3 ? (
              <View style={{ alignItems: "center" }}>
                <Text style={styles.textTitle}>Forgot Password</Text>
                <Text style={[styles.text14, { marginTop: 32 }]}>
                  Enter the email address associated with your account.
                </Text>
                <Text
                  style={[
                    styles.text14,
                    {
                      fontSize: 10,
                      marginTop: 8,
                      fontFamily: "RobotoLight",
                      alignSelf: "flex-start",
                    },
                  ]}
                >
                  We will email you a link to reset you password
                </Text>
                <Input email placeholder={"Enter Email Address"} />

                <TouchableOpacity style={styles.buttonSuccess}>
                  <Text style={styles.textButton}>Send</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setPage(1);
                  }}
                  style={{ marginTop: 12 }}
                >
                  <Text style={[styles.text14, { fontSize: 11 }]}>Back</Text>
                </TouchableOpacity>
              </View>
            ) : (
              page == 4 && (
                <View style={{ alignItems: "center" }}>
                  <Text style={[styles.textTitle, { marginBottom: 8 }]}>
                    New Password
                  </Text>
                  <Input feather={"lock"} placeholder={"New Password"} />
                  <Input
                    feather={"lock"}
                    placeholder={"Confirm New Password"}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      setPage(1);
                    }}
                    style={styles.buttonSuccess}
                  >
                    <Text style={styles.textButton}>Confirm</Text>
                  </TouchableOpacity>
                </View>
              )
            )}
          </View>
        </ScrollView>
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
            <CalendarPicker
              weekdays={week}
              months={months}
              initialDate={day}
              nextTitle={<AntDesign name="right" size={24} />}
              previousTitle={<AntDesign name="left" size={24} />}
              maxDate={moment(new Date()).add(543, "year").format("LLLL")}
              selectedDayColor="#F8831C"
              selectedDayTextColor="#FFFFFF"
              onDateChange={(day) => {
                console.log(day);
                // setday(day);
                setShowDate(day);
                setRegisBody({ ...regisBody, birth_date: day });
                setModalVisible(!modalVisible);
              }}
            />
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
    alignItems: "center",
  },
  viewLogin: {
    width: width * 0.8,
    backgroundColor: "#FFF",
    borderRadius: 50,
    paddingVertical: 32,
    paddingHorizontal: 28,
    marginBottom: 40,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  textTitle: {
    fontSize: 18,
    fontFamily: "RobotoBold",
    color: "#484848",
  },
  buttonSuccess: {
    width: 122,
    height: 34,
    borderRadius: 5,
    backgroundColor: "rgba(196, 196, 196, 0.14)",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 16,
    alignSelf: "center",
  },
  ViewLogo: {
    height: height * 0.3,
    alignItems: "center",
    justifyContent: "center",
  },
  textButton: {
    fontSize: 14,
    fontFamily: "RobotoBold",
    color: "#484848",
  },
  text14: {
    fontSize: 14,
    fontFamily: "Roboto",
    color: "#484848",
  },
  buttonSocial: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(196, 196, 196, 0.14)",
    borderRadius: 5,
  },
  inputName: {
    width: "100%",
    borderRadius: 5,
    backgroundColor: "rgba(196, 196, 196, 0.14)",
    paddingHorizontal: 10,
    fontSize: 13,
    fontFamily: "Roboto",
    color: "#484848",
  },
  viewDate: {
    backgroundColor: "rgba(196, 196, 196, 0.14)",
    width: 75,
    height: 37,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  select: {
    width: 90,
    height: 37,
    fontSize: 13,
    color: "#484848",
  },
  buttonSign: {
    width: width * 0.3,
    height: 34,
    backgroundColor: "rgba(196, 196, 196, 0.14)",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  bgModal: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000000bb",
    justifyContent: "center",
  },
  viewDetailModal: {
    width: "100%",
    height: 380,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    alignSelf: "center",
    paddingHorizontal: width * 0.05,
    paddingVertical: 50,
  },
});