import React, { useState, useEffect } from "react";
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
  AntDesign,
  FontAwesome5,
  Ionicons,
  EvilIcons,
} from "@expo/vector-icons";

const { width, height } = Dimensions.get("screen");
import { useIsFocused } from "@react-navigation/native";
import { apiservice } from "../../service/api";
import { authActionDeleteComponent } from "../../action/authAction";
export default function LessonList({ navigation, route }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState(route.params.lesson);
  const [id, setid] = useState();

  const focus = useIsFocused();

  const getLesson = async () => {
    const res = await apiservice({
      path: "/lesson/getalllesson",
      method: "get",
    });

    let a = res.data.filter((item) => {
      return item.id == route.params.id;
    });
    setData(a[0].lesson);
  };
  async function Delete() {
    const del = await authActionDeleteComponent({
      id,
    });
    if (del) {
      setModalVisible(!modalVisible);
      getLesson();
    }
  }
  useEffect(() => {
    getLesson();
  }, [focus]);
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <View style={{ marginTop: Platform.OS === "ios" ? 0 : 30 }} />
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
            <Entypo name="chevron-thin-left" size={24} color="#484848" />
          </TouchableOpacity>
          <Text style={styles.textTitle}>{route.params.title} Species</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("NewLesson", route.params);
            }}
            style={{ width: "10%" }}
          >
            <AntDesign name={"pluscircleo"} size={24} color="#484848" />
          </TouchableOpacity>
        </View>
        <FlatList
          numColumns={1}
          style={{ marginBottom: 20 }}
          data={data}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.button}>
                <Text style={styles.textSubject}>{item.title}</Text>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("NewLesson", item);
                    }}
                    style={{ marginRight: 10 }}
                  >
                    <Feather name="edit" size={18} color="#484848" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setid(item.id);
                      setModalVisible(true);
                    }}
                  >
                    <AntDesign name="delete" size={18} color="#484848" />
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
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
              Are you sure to delete this lesson?
            </Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={Delete} style={styles.buttonModal}>
                <Text style={[styles.textButton, { fontFamily: "Roboto" }]}>
                  Yes
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
                style={[styles.buttonModal, { marginLeft: 40 }]}
              >
                <Text style={[styles.textButton, { fontFamily: "Roboto" }]}>
                  No
                </Text>
              </TouchableOpacity>
            </View>
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
    paddingHorizontal: 25,
  },
  textTitle: {
    fontSize: 18,
    fontFamily: "RobotoBold",
    color: "#484848",
    alignSelf: "center",
    textAlign: "center",
    marginBottom: 10,
  },
  button: {
    width: "100%",
    height: 65,
    borderWidth: 0.4,
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "#484848",
    paddingHorizontal: 22,
    borderRadius: 5,
    marginTop: 24,
    alignItems: "center",
  },
  textSubject: {
    fontSize: 18,
    fontFamily: "Roboto",
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
    width: 54,
    height: 25,
    backgroundColor: "#EDE8E6",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 19,
  },
});
