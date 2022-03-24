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
  Alert,
} from "react-native";
import {
  MaterialCommunityIcons,
  Entypo,
  FontAwesome,
  MaterialIcons,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
import moment from "moment";
import { apiservice } from "../../service/api";
import { useRecoilValue } from "recoil";
import { tokenState } from "../../recoil/recoil";
const { width, height } = Dimensions.get("screen");
export default function HistoryResultEdit({ navigation, route }) {
  const [description, setdescription] = useState(route?.params?.description);
  const token = useRecoilValue(tokenState);
  const [data, setdata] = useState(parseFloat(route?.params?.Sour)?.toFixed(2));
  const [edit, setedit] = useState(false);
  const [brand, setbrand] = useState(route?.params?.brand);
  const [source, setsource] = useState(route?.params?.source);
  // const [quantity, setquantity] = useState(parseFloat(route?.params?.Sour)?.toFixed(2));
  const [quantity, setquantity] = useState(route?.params?.quantity);
  const [temp, settemp] = useState(route?.params?.temp);
  const [timeh, settimeh] = useState(route?.params?.timeh);
  const [timem, settimem] = useState(route?.params?.timem);
  const [select, setSelect] = useState(route?.params?.species);
  const [species, setspecies] = useState(false);
  const [result, setresult] = useState();
  useEffect(() => {
    if (data > 0 && data < 1) {
      setresult(0);
    } else if (data >= 1 && data < 1.5) {
      setresult(1);
    } else if (data >= 1.5 && data < 2.5) {
      setresult(2);
    } else if (data >= 2.5 && data < 3.5) {
      setresult(3);
    } else if (data >= 3.5 && data < 4.5) {
      setresult(4);
    } else if (data >= 4.5 && data < 5.5) {
      setresult(5);
    } else if (data >= 5.5 && data < 6.5) {
      setresult(6);
    } else if (data >= 6.5 && data < 7.5) {
      setresult(7);
    } else if (data >= 7.5 && data < 8.5) {
      setresult(8);
    } else if (data >= 8.5 && data < 9.5) {
      setresult(9);
    } else if (data >= 9.5 && data < 10.5) {
      setresult(10);
    } else if (data >= 10.5 && data < 11.5) {
      setresult(11);
    } else if (data >= 11.5 && data < 12.5) {
      setresult(12);
    } else if (data >= 12.5 && data < 13.5) {
      setresult(13);
    } else if (data >= 13.5 && data < 14.5) {
      setresult(14);
    }
  }, []);
  const color = [
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
  ];
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <View style={{ marginTop: Platform.OS === "ios" ? 0 : 30 }} />
      <ScrollView>
        <View style={[styles.viewDetail]}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 29,
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
            <Text style={styles.textTitle}>Cof Memo</Text>
            <Text style={{ width: "10%" }}></Text>
          </View>
          <Image
            style={{ width: "100%", height: 353, marginBottom: 10 }}
            source={{
              uri:
                "http://165.22.251.6:5000/api/image/getimage/" +
                route?.params?.image_url?.replace(".png", ""),
            }}
          />
          <View style={{ paddingHorizontal: 24 }}>
            <View style={styles.viewTopic}>
              <Text style={styles.textSuject}>
                Result: <Text style={styles.textSujectLight}>Dark Roast</Text>
              </Text>
              <Text style={styles.textDate}>
                Date : {moment(route?.params?.createdAt).format("DD/MM/YYYY")}{" "}
                Time : {moment(route?.params?.createdAt).format("HH:mm")}
              </Text>
            </View>
            <View style={styles.viewTopic}>
              <Text style={styles.textSujectLight}>Sour</Text>
              <Text style={styles.textSujectLight}>
                pH{parseFloat(route?.params?.Sour)?.toFixed(2)}
              </Text>
            </View>
            <View
              style={{ width: "100%", flexDirection: "row", marginTop: 20 }}
            >
              {color.map((item, index) => {
                // console.log(data);
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
              })}
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 20,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.textSujectLight}>Brand : </Text>
                <TextInput
                  onChangeText={setbrand}
                  editable={!edit ? false : true}
                  defaultValue= {brand}
                  style={{
                    width: edit ? "82%" : "80%",
                    borderRadius: 5,
                    height: 29,
                    backgroundColor: edit ? "#FFFFFF" : "#f0e9e4",
                    paddingHorizontal: 10,
                    fontSize: 18,
                    fontFamily: "RobotoLight",
                    color: "#484848",
                  }}
                />
              </View>
              {!edit && (
                <TouchableOpacity
                  onPress={() => {
                    setedit(true);
                  }}
                >
                  <FontAwesome5 name="edit" size={14} color="#484848" />
                </TouchableOpacity>
              )}
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <Text style={styles.textSujectLight}>Coffee species : </Text>
              <View style={{}}>
                <TouchableOpacity
                  disabled={!edit ? true : false}
                  onPress={() => {
                    setspecies((val) => !val);
                  }}
                  style={{
                    width: edit ? width * 0.5 : width * 0.5,
                    borderRadius: 5,
                    height: 29,
                    backgroundColor: edit ? "#FFFFFF" : "#f0e9e4",
                    paddingHorizontal: 10,
                    justifyContent: "center",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottomLeftRadius: species ? 0 : 5,
                    borderBottomRightRadius: species ? 0 : 5,
                  }}
                >
                  <Text style={styles.textSujectLight}>{select}</Text>
                  {edit && (
                    <Ionicons
                      name="ios-caret-down-outline"
                      size={20}
                      color="#484848"
                    />
                  )}
                </TouchableOpacity>
                {species && (
                  <View
                    style={{
                      width: "66%",
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
                            <Text style={styles.textSujectLight}>{item}</Text>
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
              <Text style={styles.textSujectLight}>Source : </Text>
              <TextInput
                editable={!edit ? false : true}
                onChangeText={setsource}
                defaultValue= {source}
                style={{
                  width: edit ? "78%" : "78%",
                  borderRadius: 5,
                  height: 29,
                  backgroundColor: edit ? "#FFFFFF" : "#f0e9e4",
                  paddingHorizontal: 10,
                  fontSize: 18,
                  fontFamily: "RobotoLight",
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
              <Text style={styles.textSujectLight}>Quantity : </Text>
              <TextInput
                editable={!edit ? false : true}
                keyboardType="number-pad"
                defaultValue={quantity > 0 ? ((quantity)).toString() : "-"}
                onChangeText={setquantity}
                style={{
                  width: edit ? "75%" : "75%",
                  borderRadius: 5,
                  height: 29,
                  backgroundColor: edit ? "#FFFFFF" : "#f0e9e4",
                  paddingHorizontal: 10,
                  fontSize: 18,
                  fontFamily: "RobotoLight",
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
              <Text style={styles.textSujectLight}>Temperature : </Text>
              <TextInput
                editable={!edit ? false : true}
                keyboardType="number-pad"
                defaultValue= {temp > 0 ? (temp).toString() : "-"}
                onChangeText={settemp}
                style={{
                  width: edit ? "18%" : "18%",
                  borderRadius: 5,
                  height: 29,
                  backgroundColor: edit ? "#FFFFFF" : "#f0e9e4",
                  paddingHorizontal: 10,
                  fontSize: 18,
                  fontFamily: "RobotoLight",
                  color: "#484848",
                }}
              />
              <Text style={styles.textSujectLight}>°C</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <Text style={styles.textSujectLight}>Time :</Text>

              <TextInput
                editable={!edit ? false : true}
                keyboardType="numeric"
                onChangeText={settimeh}
                maxLength={3}
                defaultValue= {timem > 0 ? (timeh).toString() : "-"}
                style={{
                  width: edit ? "18%" : "18%",
                  borderRadius: 5,
                  height: 29,
                  backgroundColor: edit ? "#FFFFFF" : "#f0e9e4",
                  paddingHorizontal: 10,
                  fontSize: 18,
                  fontFamily: "RobotoLight",
                  color: "#484848",
                }}
              />
              <Text style={[styles.textSujectLight, { marginHorizontal: 5 }]}>
                :
              </Text>
              <TextInput
                editable={!edit ? false : true}
                keyboardType="numeric"
                onChangeText={settimem}
                maxLength={2}
                defaultValue={timem > 0 ? (timem).toString() : "-"}
                style={{
                  width: edit ? "15%" : "15%",
                  borderRadius: 5,
                  height: 29,
                  backgroundColor: edit ? "#FFFFFF" : "#f0e9e4",
                  paddingHorizontal: 10,
                  fontSize: 18,
                  fontFamily: "RobotoLight",
                  color: "#484848",
                }}
              />
              <Text style={styles.textSujectLight}>min</Text>
            </View>
            <Text
              style={[styles.textSujectLight, { color: "#000", marginTop: 34 }]}
            >
              Note :
            </Text>
            <TextInput
              editable={!edit ? false : true}
              defaultValue={
                description
              }
              onChangeText={setdescription}
              placeholder="Enter your description"
              placeholderTextColor={"#484848"}
              multiline
              style={[
                styles.textSujectLight,
                styles.input,
                { backgroundColor: edit ? "#FFFFFF" : "#f0e9e4" },
              ]}
            />
            {edit && (
              <TouchableOpacity
                onPress={async () => {
                  const res = await apiservice({
                    path: "/lesson/updatehistory",
                    method: "put",
                    body: {
                      ...route.params,
                      description,
                      brand,
                      species,
                      source,
                      quantity,
                      temp,
                      timeh,
                      timem
                    },
                    token: token.accessToken,
                  });

                  if (res.status == 200) {
                    Alert.alert("Update success");
                    setedit(false);
                    // navigation.goBack();
                  }
                }}
                style={styles.button}
              >
                <Text style={[styles.textSujectLight, { fontSize: 14 }]}>
                  Save
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
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
  input: {
    width: "100%",
    minHeight: 117,
    backgroundColor: "#FFFFFF",
    padding: 13,
    marginTop: 13,
    textAlignVertical: "top",
  },
  button: {
    width: "100%",
    height: 33,
    backgroundColor: "#E0DAD6",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
});
