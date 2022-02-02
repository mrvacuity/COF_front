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
  MaterialIcons,
} from "@expo/vector-icons";
import moment from "moment";
import { apiservice } from "../../service/api";
import { useRecoilValue } from "recoil";
import { tokenState } from "../../recoil/recoil";
const { width, height } = Dimensions.get("screen");
export default function HistoryResultEdit({ navigation, route }) {
  const [description, setdescription] = useState(route?.params?.description);
  const token = useRecoilValue(tokenState);

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
            <Text style={styles.textTitle}>History Result</Text>
            <Text style={{ width: "10%" }}></Text>
          </View>
          <Image
            style={{ width: "100%", height: 353, marginBottom: 10 }}
            source={{
              uri:
                "https://api-cof.wishesexistence.co/api/image/getimage/" +
                route?.params?.image_url?.replace(".png", ""),
            }}
          />
          <View style={{ paddingHorizontal: 24 }}>
            <View style={styles.viewTopic}>
              <Text style={styles.textSuject}>Result</Text>
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
            {/* <View style={styles.viewTopic}>
              <Text style={styles.textSujectLight}>Sweetness</Text>
              <Text style={styles.textSujectLight}>20 brix</Text>
            </View>
            <View style={styles.viewTopic}>
              <Text style={styles.textSujectLight}>
                Total dissolved solids (TDS)
              </Text>
              <Text style={styles.textSujectLight}>40 ppm</Text>
            </View> */}
            <Text style={[styles.textSuject, { color: "#000", marginTop: 34 }]}>
              Description
            </Text>
            <TextInput
              defaultValue={description}
              onChangeText={setdescription}
              placeholder="Enter your description"
              placeholderTextColor={"#484848"}
              multiline
              style={[styles.textSuject, styles.input]}
            />
            <TouchableOpacity
              onPress={async () => {
                const res = await apiservice({
                  path: "/lesson/updatehistory",
                  method: "put",
                  body: {
                    ...route.params,
                    description,
                  },
                  token: token.accessToken,
                });

                if (res.status == 200) {
                  Alert.alert("Update success");
                  navigation.goBack();
                }
              }}
              style={styles.button}
            >
              <Text style={[styles.textSujectLight, { fontSize: 14 }]}>
                Save
              </Text>
            </TouchableOpacity>
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
