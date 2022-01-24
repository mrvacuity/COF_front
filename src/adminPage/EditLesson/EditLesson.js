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
export default function EditLesson({ navigation }) {
  const [add, setAdd] = useState(false);

  const [state, setState] = useState({ title: [{ subject: "Plant" }] });
  async function addLesson() {
    setState((val) => ({
      ...val,
      title: val.title.concat({
        subject: "",
      }),
    }));
    setAdd(true);
  }
  async function save() {
    setAdd(false);
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
          <Text style={styles.textTitle}>Lesson</Text>
          <TouchableOpacity
            onPress={add ? save : addLesson}
            style={{ width: "10%" }}
          >
            <AntDesign
              name={add ? "checkcircleo" : "pluscircleo"}
              size={24}
              color="#484848"
            />
            {/* checkcircleo */}
          </TouchableOpacity>
        </View>
        <FlatList
          numColumns={1}
          style={{ marginBottom: 20 }}
          data={state.title}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                disabled={add ? true : false}
                onPress={() => {
                  navigation.navigate("LessonList");
                }}
                style={styles.button}
              >
                <TextInput
                  placeholder="Type name of new lesson ...."
                  editable={add ? true : false}
                  style={styles.textSubject}
                >
                  {item.subject}
                </TextInput>
                {add && <MaterialIcons name="menu" size={24} color="#484848" />}
              </TouchableOpacity>
            );
          }}
        />
      </View>
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
});
