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
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import * as Google from "expo-google-app-auth";
import { ResponseType } from "expo-auth-session";
import * as Facebook from "expo-facebook";
import CalendarPicker from "react-native-calendar-picker";
import * as ImagePicker from "expo-image-picker";
import { KeyboardAvoidingScrollView } from "react-native-keyboard-avoiding-scroll-view";
import moment from "moment";
import {
  MaterialCommunityIcons,
  Feather,
  FontAwesome,
  AntDesign,
} from "@expo/vector-icons";
import { apiservice } from "../../service/api";
import { Authen, pagestate, tokenState } from "../../recoil/recoil";
import { useRecoilState } from "recoil";
import { authActionForgetPassword } from "../../action/authAction";

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
  const [page, setPage] = useRecoilState(pagestate);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [openCalenda, setstate] = useState(false);
  const [selectDate, setSlectDate] = useState("dd/mm/year");
  const [image, setImage] = useState(null);
  const [auth, setAuth] = useState(useRecoilState(Authen));
  const [modalVisible, setModalVisible] = useState(false);
  const [warningLogin, setWarningLogin] = useState(false);
  const [warningotp, setWarningotp] = useState(false);
  const [warningnewpassword, setWarningnewpassword] = useState(false);
  const [otp, setotp] = useState("");
  const [mainotp, setMainOtp] = useState();
  const [newpassword, setnewpassword] = useState("");
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
  const [stateforget, setstateForget] = useState({
    email: "",
  });
  const [stateReset, setstateReset] = useState({
    email: "",
    newpassword: "",
  });
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

  //twitter
  const useProxy = Platform.select({ web: false, default: true });
  const discovery = {
    authorizationEndpoint: "https://twitter.com/i/oauth2/authorize",
    tokenEndpoint: "https://twitter.com/i/oauth2/token",
    revocationEndpoint: "https://twitter.com/i/oauth2/revoke",
  };
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: "CLIENT_ID",
      redirectUri: makeRedirectUri({
        scheme: "your.app",
        useProxy,
      }),
      usePKCE: true,
      scopes: ["tweet.read"],
    },
    discovery
  );
  useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;
    }
  }, [response]);

  //Facebook

  //Google

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

  async function forgetpassword() {
    const reset = await authActionForgetPassword({ state: stateforget });
    if (reset) {
      setMainOtp(reset.otp);
      setPage(5);
    }
  }
  async function reset() {
    if (stateReset.newpassword == newpassword) {
      const reset = await authActionForgetPassword({ state: stateReset });
      if (reset) {
        setPage(0);
      }
    } else {
      setWarningnewpassword(true);
    }
  }
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
        }, 500);
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
        setImage(null);
        setRegisBody({
          username: "",
          password: "",
          email: "",
          first_name: "",
          last_name: "",
          image_profile: "",
          birth_date: "",
        });
        setShowDate("");
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
        <TouchableOpacity
          onPress={async () => {
            const { type, accessToken, user } = await Google.logInAsync({
              iosClientId: `22120545476-br9pha6eghtgtsh1g9gf96jggrjk8rkk.apps.googleusercontent.com`,
              androidClientId: `924183329457-m15nmps64fbvp6gr945f0ci6mu6au2qf.apps.googleusercontent.com`,
              androidStandaloneAppClientId: `924183329457-m15nmps64fbvp6gr945f0ci6mu6au2qf.apps.googleusercontent.com`,
              iosStandaloneAppClientId: `22120545476-br9pha6eghtgtsh1g9gf96jggrjk8rkk.apps.googleusercontent.com`,
            });
            const response = await apiservice({
              method: "post",
              path: "/authen/google",
              body: {
                telephoneNo: null,
                image_Profile: user.photoUrl,
                fullname: user.name,
                email: user.email,
                password: user.id,
                gender: null,
                birthday: null,
                username: user.givenName,
                Type: "GOOGLE",
              },
            });
            if (response.status == 200) {
              setState(response.data);
              setAuth({
                auth: true,
              });
              setTimeout(() => {
                navigation.navigate("MyTabs");
              }, 300);
            }
          }}
          style={styles.buttonSocial}
        >
          <Image
            style={{ width: 20, height: 15 }}
            source={require("../../img/mail.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            await Facebook.initializeAsync({
              appId: "1564480960562304",
            });
            const {
              type,
              token,
              expirationDate,
              permissions,
              declinedPermissions,
            } = await Facebook.logInWithReadPermissionsAsync({
              permissions: ["public_profile"],
              behavior: "web",
            });
            if (type === "success") {
              // Get the user's name using Facebook's Graph API
              const profile = await fetch(
                `https://graph.facebook.com/me?fields=birthday,email,name,picture&access_token=${token}`
              );
              const public_profile = await profile.json();

              const response = await apiservice({
                method: "post",
                path: "/authen/facebook",
                body: {
                  telephoneNo: null,
                  image_Profile: public_profile.picture.data.url,
                  fullname: public_profile.name,
                  email: public_profile.email,
                  password: public_profile.id,
                  gender: null,
                  birthday: null,
                  username: public_profile.id,
                  Type: "FACEBOOK",
                },
              });
              if (response.status == 200) {
                setState(response.data);
                setAuth({
                  auth: true,
                });
                setTimeout(() => {
                  navigation.navigate("MyTabs");
                }, 300);
              }
            }
          }}
          style={[styles.buttonSocial, { marginHorizontal: 7 }]}
        >
          <Image
            style={{ width: 20, height: 20 }}
            source={require("../../img/facebook.png")}
          />
        </TouchableOpacity>
        {/* <TouchableOpacity
          disabled={!request}
          onPress={() => {
            promptAsync({ useProxy });
          }}
          style={styles.buttonSocial}
        >
          <Image
            style={{ width: 20, height: 16.24 }}
            source={require("../../img/twitter.png")}
          />
        </TouchableOpacity> */}
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
                      setLoginBody({ username: "", password: "" });
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
                    setLoginBody({ username: "", password: "" });
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
                <KeyboardAvoidingScrollView>
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
                            // "http://165.22.251.6:5000/api/image/getimage/" +
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
                    <LoginSocial />
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      setImage(null);
                      setRegisBody({
                        username: "",
                        password: "",
                        email: "",
                        first_name: "",
                        last_name: "",
                        image_profile: "",
                        birth_date: "",
                      });
                      setShowDate("");
                      setPage(1);
                    }}
                    style={{ marginTop: 12, alignSelf: "center" }}
                  >
                    <Text style={[styles.text14, { fontSize: 11 }]}>
                      Already have an account? Sign in
                    </Text>
                  </TouchableOpacity>
                </KeyboardAvoidingScrollView>
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
                <Input
                  onChangeText={(text) => {
                    setstateForget({ ...stateforget, email: text });
                    setstateReset({ ...stateReset, email: text });
                  }}
                  email
                  placeholder={"Enter Email Address"}
                />

                <TouchableOpacity
                  onPress={forgetpassword}
                  style={styles.buttonSuccess}
                >
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
            ) : page == 4 ? (
              <View style={{ alignItems: "center" }}>
                <Text style={[styles.textTitle, { marginBottom: 8 }]}>
                  New Password
                </Text>
                <View>
                  <Input
                    secureTextEntry
                    onChangeText={(text) => {
                      setstateReset({ ...stateReset, newpassword: text });
                    }}
                    feather={"lock"}
                    placeholder={"New Password"}
                  />
                  <Input
                    secureTextEntry
                    onChangeText={(text) => {
                      setnewpassword(text);
                    }}
                    feather={"lock"}
                    placeholder={"Confirm New Password"}
                  />
                  {warningnewpassword && (
                    <Text
                      style={[
                        styles.warningLogin,
                        {
                          alignSelf: "flex-start",
                        },
                      ]}
                    >
                      The password Mismatch.
                    </Text>
                  )}
                </View>
                <TouchableOpacity onPress={reset} style={styles.buttonSuccess}>
                  <Text style={styles.textButton}>Confirm</Text>
                </TouchableOpacity>
              </View>
            ) : (
              page == 5 && (
                <View style={{ alignItems: "center" }}>
                  <Text style={[styles.textTitle, { marginBottom: 8 }]}>
                    OTP
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
                    A message OTP password sent, please specify is displayed.
                    Check your email. You must have received an email with the
                    OTP. Specify the OTP in Password
                  </Text>
                  <View>
                    <Input
                      onChangeText={(text) => {
                        if (otp != "") {
                          setWarningotp(false);
                        }
                        setotp(text);
                      }}
                      feather={"lock"}
                      placeholder={"Enter OTP"}
                    />
                    {warningotp && (
                      <Text
                        style={[
                          styles.warningLogin,
                          {
                            alignSelf: "flex-start",
                          },
                        ]}
                      >
                        The OTP Authentication Code Mismatch.
                      </Text>
                    )}
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      if (mainotp == otp) {
                        setPage(4);
                      } else {
                        setWarningotp(true);
                      }
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
