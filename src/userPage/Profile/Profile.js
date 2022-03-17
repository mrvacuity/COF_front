import { useIsFocused } from "@react-navigation/native";
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
} from "react-native";
import { useRecoilState, useRecoilValue } from "recoil";
import { tokenState } from "../../recoil/recoil";
import { apiservice } from "../../service/api";
import CalendarPicker from "react-native-calendar-picker";
import * as ImagePicker from "expo-image-picker";
import moment from "moment";
import {
  MaterialCommunityIcons,
  Entypo,
  FontAwesome,
  MaterialIcons,
  Feather,
  AntDesign,
  FontAwesome5,
} from "@expo/vector-icons";
import { authActionEditProfile } from "../../action/authAction";
const { width, height } = Dimensions.get("screen");
export default function Profile({ navigation }) {
  const [token, setToken] = useRecoilState(tokenState);
  const [userData, setUserData] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const focus = useIsFocused();
  const [changeProfile, setChangeProfile] = useState(false);
  const [day, setday] = useState(moment().format("LLLL"));
  const [showDate, setShowDate] = useState("");
  const [textLength, setTextLength] = useState("");
  const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [state, setState] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    image_profile: "",
    birth_date: "",
    about_me: "",
  });

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
  async function editProfile() {
    const edit = await authActionEditProfile({
      state,
      token: token.accessToken,
    });
    if (edit) {
      setChangeProfile(false);
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
      setState({
        ...state,
        image_profile: res.data.imageRefId.replace(".png", ""),
      });
    } else {
    }
  };
  const getProfile = async () => {
    const res = await apiservice({
      path: "/authen/user",
      method: "get",
      token: token.accessToken,
    });

    if (res.status == 200) {
      setUserData(res.data.result);
      setState({
        username: res.data.result.username,
        email: res.data.result.email,
        first_name: res.data.result.first_name,
        last_name: res.data.result.last_name,
        image_profile: res.data.result.image_profile,
        birth_date: res.data.result.birth_date,
        about_me: res.data.result.about_me,
      });
    } else {
    }
  };

  useEffect(() => {
    getProfile();
  }, [focus]);
  if (userData == undefined) {
    return <View></View>;
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
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 29,
            }}
          >
            <Text style={{ width: "10%" }}></Text>
            <Text style={styles.textTitle}>PROFILE</Text>
            {changeProfile ? (
              <Text style={{ width: "10%" }}></Text>
            ) : (
              <TouchableOpacity
                style={{ width: "10%", alignItems: "flex-end" }}
                onPress={() => {
                  setToken("");
                  navigation.navigate("Login");
                }}
              >
                <Feather name="log-out" size={24} color="#484848" />
              </TouchableOpacity>
            )}
          </View>
          <View style={{ alignSelf: "center", marginVertical: 32 }}>
            <TouchableOpacity
              disabled={changeProfile ? false : true}
              onPress={pickImage}
            >
              <Image
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 80,
                  backgroundColor: "#cccc",
                }}
                source={{
                  uri:
                    "http://165.22.251.6:5000/api/image/getimage/" +
                    state.image_profile,
                }}
              />
            </TouchableOpacity>
            {changeProfile ? (
              <Text style={styles.textSubject}>Change Profile Picture</Text>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setChangeProfile(true);
                }}
                style={{ alignSelf: "flex-end", marginTop: -10 }}
              >
                <FontAwesome5 name="edit" size={14} color="#484848" />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.viewProfile}>
            <Text style={styles.textSubject}>Name</Text>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                editable={changeProfile ? true : false}
                onChangeText={(text) => {
                  setState((val) => ({ ...val, first_name: text }));
                }}
                defaultValue={userData.first_name}
                style={[styles.textDetail, { width: width * 0.25 }]}
              />
              <TextInput
                editable={changeProfile ? true : false}
                onChangeText={(text) => {
                  setState((val) => ({ ...val, last_name: text }));
                }}
                defaultValue={userData.last_name}
                style={[styles.textDetail, { width: width * 0.25 }]}
              />
            </View>
          </View>
          <View style={styles.viewProfile}>
            <Text style={styles.textSubject}>Username</Text>
            <TextInput
              onChangeText={(text) => {
                setState((val) => ({ ...val, username: text }));
              }}
              editable={changeProfile ? true : false}
              defaultValue={userData.username}
              style={styles.textDetail}
            />
          </View>
          <View style={styles.viewProfile}>
            <Text style={styles.textSubject}>Email</Text>
            <TextInput
              editable={changeProfile ? true : false}
              defaultValue={userData.email}
              style={styles.textDetail}
            />
          </View>
          <View style={styles.viewProfile}>
            <Text style={styles.textSubject}>Bio</Text>
            <TextInput
              maxLength={400}
              defaultValue={state.about_me}
              onChangeText={(text) => {
                setState((val) => ({ ...val, about_me: text }));

                setTextLength(text.length);
              }}
              editable={changeProfile ? true : false}
              multiline
              style={[styles.textDetail, { paddingRight: 50 }]}
            />
            <Text
              style={[
                {
                  position: "absolute",
                  fontFamily: "RobotoLight",
                  fontSize: 12,
                  color: "#484848",
                  alignSelf: "flex-end",
                  right: 0,
                  paddingRight: 20,
                },
              ]}
            >
              {textLength + "/400"}
            </Text>
          </View>
          <View style={styles.viewProfile}>
            <Text style={styles.textSubject}>DOB</Text>
            <Text style={styles.textDetail}>
              {moment(state.birth_date).format("DD MMMM YYYY")}
            </Text>
            <TouchableOpacity
              disabled={changeProfile ? false : true}
              onPress={() => {
                setModalVisible(true);
              }}
              style={styles.calendar}
            >
              <Feather name="calendar" size={14} color="#484848" />
            </TouchableOpacity>
          </View>
          {changeProfile ? (
            <TouchableOpacity
              onPress={editProfile}
              style={[styles.button, { marginVertical: 31 }]}
            >
              <Text style={styles.textButton}>Save</Text>
            </TouchableOpacity>
          ) : (
            <View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("ChangePassword");
                }}
                style={[styles.button, { marginTop: 31 }]}
              >
                <Text style={styles.textButton}>Change Password</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("ReportProblem");
                }}
                style={[styles.button, { marginVertical: 12 }]}
              >
                <Text style={styles.textButton}>Report Problem</Text>
              </TouchableOpacity>
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
                  setShowDate(day);
                  setState({ ...state, birth_date: day });
                  setModalVisible(!modalVisible);
                }}
              />
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
  textSubject: {
    fontSize: 14,
    fontFamily: "Roboto",
    color: "#484848",
  },
  textDetail: {
    fontFamily: "RobotoLight",
    fontSize: 12,
    color: "#484848",
    borderBottomColor: "#484848",
    borderBottomWidth: 0.5,
    width: width * 0.5,
    paddingHorizontal: 5,
  },
  viewProfile: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 17,
    marginTop: 12,
  },
  button: {
    width: "90%",
    height: 33,
    backgroundColor: "#E0DAD6",
    borderWidth: 0.5,
    borderColor: "#484848",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  textButton: {
    fontFamily: "RobotoLight",
    fontSize: 14,
    color: "#484848",
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
  calendar: {
    height: 37,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    marginRight: 20,
    marginTop: -10,
    right: 0,
  },
});
