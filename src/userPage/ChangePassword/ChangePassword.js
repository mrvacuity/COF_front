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
import {
  MaterialCommunityIcons,
  Entypo,
  FontAwesome,
  MaterialIcons,
  Feather,
  FontAwesome5,
} from "@expo/vector-icons";
import { authActionResetPassword } from "../../action/authAction";
import { useRecoilState, useRecoilValue } from "recoil";
import { tokenState } from "../../recoil/recoil";
const { width, height } = Dimensions.get("screen");
export default function ChangePassword({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [token, setToken] = useRecoilState(tokenState);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [state, setstate] = useState({
    password: "",
    newpassword: "",
  });
  const [check, setCheck] = useState("");
  async function resetPassword() {
    if (state.password != "" && state.newpassword != "") {
      if (state.newpassword == check) {
        const reset = await authActionResetPassword({
          state,
          token: token.accessToken,
        });
        if (reset) {
          setTimeout(() => {
            setModalVisible1(true);
          }, 2000);
          setTimeout(() => {
            setModalVisible1(false);
          }, 3000);
        } else {
          setModalVisible2(true);
        }
      } else {
        setModalVisible(true);
      }
    }
  }
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <View style={{ marginTop: Platform.OS === "ios" ? 0 : 30 }} />
      <View style={[styles.viewDetail]}>
        <Text style={[styles.textTitle, { alignSelf: "center" }]}>
          Change Password
        </Text>
        <View style={styles.viewPassword}>
          <MaterialIcons
            name="lock"
            size={24}
            color="#484848"
            style={{ position: "absolute", zIndex: 99, paddingLeft: 10 }}
          />
          <TextInput
            secureTextEntry
            placeholder="Current password"
            onChangeText={(text) => {
              setstate({ ...state, password: text });
            }}
            style={styles.inputPassword}
          />
        </View>
        <View style={styles.viewPassword}>
          <Image
            source={require("../../img/Vector.png")}
            style={styles.imgKey}
          />
          <TextInput
            secureTextEntry
            placeholder="New password"
            onChangeText={(text) => {
              setstate({ ...state, newpassword: text });
            }}
            style={styles.inputPassword}
          />
        </View>
        <View style={styles.viewPassword}>
          <Image
            source={require("../../img/Vector.png")}
            style={styles.imgKey}
          />
          <TextInput
            secureTextEntry
            placeholder="Re-type new password"
            onChangeText={(text) => {
              setCheck(text);
            }}
            style={styles.inputPassword}
          />
        </View>
        <TouchableOpacity
          onPress={resetPassword}
          style={[styles.button, { marginTop: 32 }]}
        >
          <Text style={styles.textButton}>Update Password</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack("");
          }}
          style={[
            styles.button,
            { marginVertical: 16, backgroundColor: "#F0EAE6" },
          ]}
        >
          <Text style={styles.textButton}>Cancel</Text>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 13,
            fontFamily: "RobotoBold",
            color: "#484848",
            alignSelf: "center",
          }}
        >
          Forgot password?
        </Text>
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
            <Text style={styles.textButton}>
              The current password does not match!
            </Text>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
              style={styles.buttonModal}
            >
              <Text style={[styles.textButton, { fontFamily: "Roboto" }]}>
                Back
              </Text>
            </TouchableOpacity>
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
          <View style={[styles.viewDetailModal, { justifyContent: "center" }]}>
            <Text style={styles.textButton}>
              Your password has been change.
            </Text>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible2(!modalVisible2);
        }}
      >
        <View style={styles.bgModal}>
          <View style={[styles.viewDetailModal]}>
            <Text style={styles.textButton}>The Password Is Incorrect !</Text>
            <TouchableOpacity
              onPress={() => {
                setModalVisible2(!modalVisible2);
              }}
              style={styles.buttonModal}
            >
              <Text style={[styles.textButton, { fontFamily: "Roboto" }]}>
                Back
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  inputPassword: {
    width: width * 0.65,
    height: 37,
    backgroundColor: "#F8F5F3",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingLeft: 40,
  },
  viewPassword: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 16,
  },
  imgKey: {
    width: 12,
    height: 22,
    position: "absolute",
    zIndex: 99,
    marginLeft: 15,
  },
  button: {
    width: width * 0.65,
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
    width: "80%",
    height: 119,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    alignSelf: "center",
    alignItems: "center",
    paddingVertical: 29,
  },
  buttonModal: {
    width: 91,
    height: 25,
    backgroundColor: "#EDE8E6",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 19,
  },
});
