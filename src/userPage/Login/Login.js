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
import * as Google from "expo-google-app-auth";
import * as Facebook from "expo-facebook";
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
import { Authen, tokenState } from "../../recoil/recoil";
import { useRecoilState } from "recoil";

function Input({
  feather,
  email,
  placeholder,
  defaultValue,
  onChangeText,
  secureTextEntry,
  borderColor,
  borderWidth,
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
          borderColor: borderColor,
          borderWidth: borderWidth,
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
  const [auth, setAuth] = useState(useRecoilState(Authen));
  const [modalVisible, setModalVisible] = useState(false);
  const [warningLogin, setWarningLogin] = useState(false);
  const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [day, setday] = useState(moment().format("LLLL"));
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
  async function logInFacebook() {
    try {
      await Facebook.initializeAsync({
        appId: "<APP_ID>",
      });
      const { type, token, expirationDate, permissions, declinedPermissions } =
        await Facebook.logInWithReadPermissionsAsync({
          permissions: ["public_profile"],
        });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        );
        Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }
  const signInAsync = async () => {
    try {
      const { type, user } = await Google.logInAsync({
        iosClientId: `664664474549-oulrrhiifll6blfgrq6n766a06ik9jsu.apps.googleusercontent.com`,
        androidClientId: `664664474549-oulrrhiifll6blfgrq6n766a06ik9jsu.apps.googleusercontent.com`,
      });

      if (type === "success") {
        // Then you can use the Google REST API
        console.log(" success, navigating to profile");
        // navigation.navigate("Profile", { user });
      }
    } catch (error) {
      console.log(" error with login", error);
    }
  };
  const [loginBody, setLoginBody] = useState({
    username: "",
    password: "",
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
      setRegisBody({
        ...regisBody,
        image_profile: res.data.imageRefId.replace(".png", ""),
      });
    } else {
    }
  };
  const login = async () => {
    if (loginBody.username.length > 0 && loginBody.password.length > 0) {
      const res = await apiservice({
        path: "/authen/login",
        method: "post",
        body: loginBody,
      });
      if (res.status == 200) {
        setState(res.data);
        setAuth({
          auth: true,
        });
        setTimeout(() => {
          navigation.navigate("MyTabs");
        }, 300);
      } else {
        setWarningLogin(true);
      }
    } else {
      setWarningLogin(true);
    }
  };
  const emailValid =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  function errors({ value, type }) {
    if (type == "email") {
      return emailValid.test(value);
    }
  }
  async function register() {
    if (
      regisBody.birth_date != "" &&
      regisBody.email != "" &&
      regisBody.first_name != "" &&
      regisBody.last_name != "" &&
      regisBody.password != "" &&
      regisBody.username != ""
    ) {
      const res = await apiservice({
        path: "/authen/register",
        method: "post",
        body: regisBody,
      });

      if (res.status == 200) {
        Alert.alert("Register success!");
        setPage(1);
      } else {
        Alert.alert("the email or username has already been taken.");
      }
    } else {
      Alert.alert("Please fill out the information correctly and completely.");
    }
  }
  function LoginSocial() {
    return (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={signInAsync} style={styles.buttonSocial}>
          <Image
            style={{ width: 20, height: 15 }}
            source={require("../../img/mail.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={logInFacebook}
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
                  borderWidth={warningLogin ? 1 : 0}
                  borderColor={warningLogin && "#F57676"}
                  defaultValue={loginBody.username}
                  onChangeText={(text) => {
                    if (loginBody.username != "") {
                      setWarningLogin(false);
                    }
                    setLoginBody((val) => ({ ...val, username: text }));
                  }}
                  feather={"user"}
                  placeholder={"Email / Username"}
                />
                <View>
                  <Input
                    borderWidth={warningLogin ? 1 : 0}
                    borderColor={warningLogin && "#F57676"}
                    secureTextEntry={true}
                    defaultValue={loginBody.password}
                    onChangeText={(text) => {
                      if (loginBody.password != "") {
                        setWarningLogin(false);
                      }
                      setLoginBody((val) => ({ ...val, password: text }));
                    }}
                    feather={"lock"}
                    placeholder={"Password"}
                  />
                  {warningLogin && (
                    <Text style={styles.warningLogin}>
                      Wrong Username / Password
                    </Text>
                  )}
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
                  {image != null ? (
                    <Image
                      style={{
                        width: 90,
                        height: 90,
                        borderRadius: 100,
                        alignSelf: "center",
                        backgroundColor: "#CCCCCC",
                      }}
                      source={{
                        uri:
                          // "https://api-cof.wishesexistence.co/api/image/getimage/" +
                          image,
                      }}
                    />
                  ) : (
                    <Feather name="user-plus" size={30} color="#484848" />
                  )}
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
                        {moment(selectDate).format("DD-MM-YYYY")}
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
                {regisBody.email.length > 0 &&
                  !errors({ value: regisBody.email, type: "email" }) && (
                    <Text style={styles.warningLogin}>
                      invalid email format.
                    </Text>
                  )}
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
              maxDate={moment(new Date()).format("LLLL")}
              selectedDayColor="#F8831C"
              selectedDayTextColor="#FFFFFF"
              onDateChange={(day) => {
                // setday(day);
                setSlectDate(day);
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
  warningLogin: {
    fontSize: 10,
    fontFamily: "Roboto",
    color: "#F57676",
    marginTop: 4,
  },
});
