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
} from "react-native";
import {
  MaterialCommunityIcons,
  Entypo,
  FontAwesome,
  AntDesign,
  MaterialIcons,
} from "@expo/vector-icons";
import { authActionCreateTest } from "../../action/authAction";
const { width, height } = Dimensions.get("screen");
export default function AddQuizTest({ navigation, route }) {
  const [state, setState] = useState({
    title: "",
    image_url: "",
    choice: [],
    answer: null,
    lesson_id: route.params.id,
  });
  async function Create() {
    if (state.title != "" && state.answer != null && state.choice.length > 0) {
      const create = await authActionCreateTest({
        state,
      });
      if (create) {
        navigation.goBack();
      }
    } else {
      Alert.alert("Please complete the information !");
    }
  }
  console.log(route.params.title);
  console.log(state);
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
          <Text style={styles.textTitle}>{route.params.title}</Text>
          <TouchableOpacity onPress={Create} style={{ width: "10%" }}>
            <AntDesign name={"checkcircleo"} size={24} color="#484848" />
          </TouchableOpacity>
        </View>
        <Text
          style={[
            styles.textTitle,
            { width: "100%", textAlign: "left", marginTop: 20 },
          ]}
        >
          {route.params.title}
        </Text>

        <TextInput
          onChangeText={(text) => setState({ ...state, title: text })}
          placeholder="Proposition"
          placeholderTextColor={"#484848"}
          multiline
          style={styles.inputProposition}
        />
        <View>
          <FlatList
            numColumns={1}
            style={{ marginBottom: 20 }}
            data={state.choice}
            renderItem={({ item, index }) => {
              console.log(item);
              const mainItem = item;
              const mainIndex = index;
              return (
                <View
                  style={{
                    flexDirection: "row",
                    backgroundColor: "#FFFFFF",
                    marginTop: 12,
                    alignItems: "center",
                    borderRadius: 5,
                  }}
                >
                  <TextInput
                    onChangeText={(text) =>
                      setState((val) => ({
                        ...val,
                        choice: val.choice.map((items, indexs) => {
                          if (index == indexs) {
                            return text;
                          } else {
                            return items;
                          }
                        }),
                      }))
                    }
                    placeholder="Answer"
                    placeholderTextColor={"#484848"}
                    style={styles.inputAnswer}
                  />
                  <TouchableOpacity
                    onPress={() => setState({ ...state, answer: item })}
                  >
                    <MaterialIcons
                      name={
                        item == state.answer
                          ? "radio-button-checked"
                          : "radio-button-unchecked"
                      }
                      size={24}
                      color="#484848"
                    />
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            setState((val) => ({
              ...val,
              choice: val.choice.concat(""),
            }));
          }}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <MaterialCommunityIcons
            name="plus-circle-outline"
            size={24}
            color="black"
          />
          <Text
            style={{ fontSize: 14, color: "#484848", fontFamily: "Roboto" }}
          >
            Add choice
          </Text>
        </TouchableOpacity>
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
    height: "90%",
    backgroundColor: "#f0e9e4",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 25,
    paddingHorizontal: 29,
  },
  textLight: { fontSize: 18, fontFamily: "RobotoLight", color: "#484848" },
  textTitle: {
    fontSize: 18,
    fontFamily: "RobotoBold",
    color: "#484848",
    width: "60%",
    textAlign: "center",
    marginBottom: 10,
  },
  inputProposition: {
    width: "100%",
    minHeight: 95,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Roboto",
    color: "#484848",
    textAlignVertical: "top",
    paddingHorizontal: 11,
    paddingVertical: 14,
    marginVertical: 20,
  },
  inputAnswer: {
    width: "90%",
    height: 50,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Roboto",
    color: "#484848",
    paddingHorizontal: 24,
  },
});
