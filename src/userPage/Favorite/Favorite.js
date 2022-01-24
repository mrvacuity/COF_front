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
export default function Favorite({ navigation }) {
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
            <Entypo name="chevron-thin-left" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.textTitle}>Like</Text>
          <Text style={{ width: "10%" }}></Text>
        </View>
        <FlatList
          numColumns={1}
          style={{}}
          data={[{ n: 1 }]}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("ArticlesDetail");
                }}
                style={styles.buttonDetail}
              >
                <View style={{ width: "35%" }}>
                  <Image
                    style={{ width: 103, height: 103, borderRadius: 15 }}
                    source={{
                      uri: "https://s3-alpha-sig.figma.com/img/0b78/bc4e/d3fe54cf10398ded53d27d28d8f232a9?Expires=1642982400&Signature=Esc91X7XNwTELGtsMgkaRMIT3O210~TVLe4StAWpXNDcsxgk34PbDAGIWg~4k07DrziTKwf3jHvhXiinXYDNBmCF6rcBYN6FeAabZLLV~tY5aioSDe2XnVKexa~-U3kMGfujDLGmOqwUYNTmccNvWLXVc72~RFjedtluAMyycpD6q2B0EBKFGyerwt6rYP4D1ek~cYWSY1knenDoIAoPOJc~yBPflvSnExKjtaImWxro0i6tMBjE~oOHxbdQ4Qjla32EHOhDCEDL4jVYqVbD6cU7CnYL4kylDnjUk0slgIVNiJnsdVeqvdeTDPEFUqtAo5C4rYm5IFYOaFQ3ats8bw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
                    }}
                  />
                </View>
                <View style={styles.viewtextDetail}>
                  <View style={{ width: "100%", paddingVertical: 10 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={[
                          styles.textDetail,
                          { fontFamily: "RobotoBold" },
                        ]}
                      >
                        ● Coffee
                      </Text>
                      <Text style={styles.textDate}>4/11/2564</Text>
                    </View>
                    <Text
                      numberOfLines={3}
                      style={[styles.textDetail, { fontSize: 16 }]}
                    >
                      About the new art deco for designers and artists
                    </Text>
                  </View>
                </View>
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
    paddingHorizontal: 12,
  },
  textTitle: {
    fontSize: 18,
    fontFamily: "RobotoBold",
    color: "#484848",
    width: "60%",
    textAlign: "center",
    marginBottom: 10,
  },
  buttonDetail: {
    width: "100%",
    flexDirection: "row",
    marginTop: 12,
    borderWidth: 0.2,
    minHeight: 123,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderColor: "#484848",
  },
  textPopular: {
    fontSize: 12,
    fontFamily: "Roboto",
    color: "#484848",
  },
  textDetail: {
    fontSize: 12,
    fontFamily: "RobotoLight",
    color: "#484848",
  },
  textDate: {
    fontSize: 12,
    fontFamily: "Roboto",
    color: "#484848",
  },
  viewtextDetail: {
    flexDirection: "row",
    width: "65%",
  },
});
