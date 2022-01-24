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
  Alert,
  Modal,
} from "react-native";
import {
  MaterialCommunityIcons,
  Entypo,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";
import { authActionReport } from "../../action/authAction";
import { useRecoilState } from "recoil";
import { tokenState } from "../../recoil/recoil";
const { width, height } = Dimensions.get("screen");
export default function reportProblem({ navigation }) {
  const [token, setToken] = useRecoilState(tokenState);
  const [modalVisible, setModalVisible] = useState(false);
  const [state, setState] = useState({ title: "", description: "" });

  async function report() {
    if (state.title != "" && state.description != "") {
      const report = await authActionReport({
        state,
        token: token.accessToken,
      });
      if (report) {
        setState({ title: "", description: "" });
        setModalVisible(true);
      }
    } else {
      Alert.alert("Please complete the information !");
    }
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
            paddingLeft: 29,
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
          <Text style={styles.textTitle}>Report Problem</Text>
          <Text style={{ width: "10%" }}></Text>
        </View>
        <View style={{ alignSelf: "center" }}>
          <Text style={styles.textSuject}>Topic of problem.</Text>
          <TextInput
            onChangeText={(text) => {
              setState({ ...state, title: text });
            }}
            placeholder="What went wrong?"
            style={styles.inputDetail}
          />
          <Text style={[styles.textSuject, { marginTop: 22 }]}>
            Please describe the problem.
          </Text>
          <TextInput
            onChangeText={(text) => {
              setState({ ...state, description: text });
            }}
            multiline
            style={styles.inputdescription}
          />
          <TouchableOpacity onPress={report} style={styles.button}>
            <Text style={styles.textButton}>Submit</Text>
          </TouchableOpacity>
        </View>
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
            <Text style={styles.textButton}>Report success !</Text>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
                navigation.goBack("");
              }}
              style={styles.buttonModal}
            >
              <Text style={[styles.textButton, { fontFamily: "Roboto" }]}>
                Ok
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
  },
  textTitle: {
    fontSize: 18,
    fontFamily: "RobotoBold",
    color: "#484848",
    width: "60%",
    textAlign: "center",
    marginBottom: 10,
  },
  textSuject: {
    fontFamily: "Roboto",
    fontSize: 13,
    color: "#484848",
    marginTop: 12,
  },
  inputDetail: {
    width: width * 0.65,
    height: 45,
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    fontFamily: "RobotoLight",
    fontSize: 13,
    paddingHorizontal: 10,
    marginTop: 12,
    color: "#484848",
  },
  inputdescription: {
    width: width * 0.65,
    minHeight: 66,
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    fontFamily: "RobotoLight",
    fontSize: 13,
    padding: 10,
    marginTop: 12,
    textAlignVertical: "top",
    color: "#484848",
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
    marginTop: 24,
  },
  textButton: {
    fontSize: 14,
    fontFamily: "RobotoLight",
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
