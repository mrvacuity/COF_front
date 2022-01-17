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
} from "@expo/vector-icons";
const { width, height } = Dimensions.get("screen");
export default function HistoryResultEdit({ navigation }) {
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
              uri: "https://s3-alpha-sig.figma.com/img/7785/fe29/12c094f4edc7074dbc18945d97b2d09b?Expires=1642982400&Signature=aq7L207H~YTDhdc6RWcVRax-GiA68Kx5NzHWT5qvSG~xLb01gU8JVn1oQe9n2B22y8UnN~waazPcoV7YKGotxvP3SdemnFlK2OP6ljHNjrLw0nibRxamA9a3YV1BK87SXim3Omp5ui0AmJtjwSjzdwn0SOMzmZJq6i9jxCokgqgcXwwBBAt5XKgAj-HthwQHeru0IQwT5XBdFLL1SYhrNzA13Y00V~Pcnnyv5~bsCrbuspw6XNLtYl3ibphwdcik~ZVqcrXVvpZq~Jfqzisu1x6Id~H2UrBVOW-BUqZF9EVzOrxfopBm5wPn9Lyh39wwy-WpxR2ki9rzcNNaAS8vjg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
            }}
          />
          <View style={{ paddingHorizontal: 24 }}>
            <View style={styles.viewTopic}>
              <Text style={styles.textSuject}>Result</Text>
              <Text style={styles.textDate}>
                Date : 24/11/2021 Time : 21:21
              </Text>
            </View>
            <View style={styles.viewTopic}>
              <Text style={styles.textSujectLight}>Sour</Text>
              <Text style={styles.textSujectLight}>pH6.3</Text>
            </View>
            <View style={styles.viewTopic}>
              <Text style={styles.textSujectLight}>Sweetness</Text>
              <Text style={styles.textSujectLight}>20 brix</Text>
            </View>
            <View style={styles.viewTopic}>
              <Text style={styles.textSujectLight}>
                Total dissolved solids (TDS)
              </Text>
              <Text style={styles.textSujectLight}>40 ppm</Text>
            </View>
            <Text style={[styles.textSuject, { color: "#000", marginTop: 34 }]}>
              Description
            </Text>
            <TextInput
              placeholder="Enter your description"
              placeholderTextColor={"#484848"}
              multiline
              style={[styles.textSuject, styles.input]}
            />
            <TouchableOpacity style={styles.button}>
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
