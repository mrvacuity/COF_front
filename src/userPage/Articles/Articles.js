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
  AntDesign,
  FontAwesome5,
  Ionicons,
  EvilIcons,
} from "@expo/vector-icons";
const { width, height } = Dimensions.get("screen");
export default function Articles({ navigation }) {
  const [page, setPage] = useState(1);
  const [fillter, setFillter] = useState(false);
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <View style={{ marginTop: Platform.OS === "ios" ? 0 : 30 }} />

      <View style={[styles.viewDetail]}>
        <View style={styles.viewHeader}>
          <Text style={{ width: "10%" }}></Text>
          <Text style={styles.textTitle}>Articles</Text>

          <TouchableOpacity
            style={{ width: "10%", alignItems: "flex-end" }}
            onPress={() => {}}
          >
            <AntDesign name="hearto" size={24} color="#484848" />
          </TouchableOpacity>
        </View>
        <View style={styles.viewPage}>
          <TouchableOpacity
            onPress={() => {
              setPage(1);
            }}
            style={[
              styles.buttonPage,
              { borderBottomWidth: page == 1 ? 3 : 1 },
            ]}
          >
            <Text style={styles.textPage}>Articles</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setPage(2);
            }}
            style={[
              styles.buttonPage,
              { borderBottomWidth: page == 2 ? 3 : 1 },
            ]}
          >
            <Text style={styles.textPage}>My post</Text>
          </TouchableOpacity>
        </View>
        {page == 1 && (
          <View style={{ paddingHorizontal: 25 }}>
            <View style={styles.viewPopular}>
              <Text style={styles.textsubject}>Popular Article</Text>
              <Text style={styles.textDate}>Today, March 21</Text>
            </View>
            <Image
              style={styles.imgPopular}
              source={{
                uri: "https://s3-alpha-sig.figma.com/img/6c18/191a/0bdbaaa9d1ec5011be58b8790bfe8d62?Expires=1642982400&Signature=adahFArPqxpmjyu73XuNI76iOF7wbhSWqH1DLMZvATS6yZJFYhE-XrfkTFQaRumXQkwwlMa1tgzwnlszpoHcVNZK7evdzPxTu2wWfqHXvs1xuN0LqV2QsmTsyC-u8c5qK2pLepNzb-kMkovP71HLW5F7qo1dmtvSYweJnlQleL5QMC2J6Qc-8y56N61xrEgOEjGtpY-VYxoczQ63~uziZd-gcAJuMuse8PLkueu1bDUfiJ4r5g02QTwQd1v6XLr94WDTYwKz8ajmW0-P5L86mqTDCC5qdfpSM4dWjhsWlcJVLs40K6saCzezGq3uP~GSjbf9kkJf-FMjEzX52HaVtw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
              }}
            />
            <Text style={styles.textsubjectPopular}>
              Dealing with imposter syndrome
            </Text>
            <View style={{ flexDirection: "row", marginTop: 8 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialCommunityIcons
                  name="face-outline"
                  size={20}
                  color="#484848"
                />
                <Text style={styles.textPopular}> Alan Moore</Text>
              </View>
              <View style={styles.viewComment}>
                <Image
                  style={{ width: 18, height: 18 }}
                  source={require("../../img/chat.png")}
                />
                <Text style={styles.textPopular}> 5 comments</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 34,
              }}
            >
              <Text style={styles.textsubject}>Articles</Text>
              <View style={{ width: "55%" }}>
                <View style={styles.viewArticles}>
                  <TextInput placeholder="Search" style={styles.search} />
                  <TouchableOpacity>
                    <MaterialCommunityIcons
                      name="magnify"
                      size={24}
                      color="#484848"
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      setFillter((val) => !val);
                    }}
                  >
                    <MaterialIcons
                      name="format-align-right"
                      size={24}
                      color="#484848"
                    />
                  </TouchableOpacity>
                </View>
                {fillter && (
                  <View style={styles.viewFillter}>
                    <TouchableOpacity style={styles.buttonFillter}>
                      <Text style={styles.textFillter}>Most like</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonFillter}>
                      <Text style={styles.textFillter}>Latest post</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonFillter}>
                      <Text style={styles.textFillter}>Oldest post</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
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
                    <View
                      style={{
                        flexDirection: "row",
                        width: "65%",
                      }}
                    >
                      <View style={{ width: "100%" }}>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text style={styles.textDetail}>● Coffee</Text>
                          <View
                            style={{
                              justifyContent: "center",
                              flexDirection: "row",
                            }}
                          >
                            <Text
                              style={[styles.textPopular, { fontSize: 10 }]}
                            >
                              120
                            </Text>
                            <EvilIcons name="like" size={18} color="black" />
                          </View>
                        </View>
                        <Text
                          numberOfLines={2}
                          style={[styles.textDetail, { fontSize: 16 }]}
                        >
                          About the new art deco for designers and artists
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            marginTop: 8,
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <MaterialCommunityIcons
                              name="face-outline"
                              size={20}
                              color="#484848"
                            />
                            <Text style={styles.textPopular}> Frank Rimes</Text>
                          </View>
                          <View
                            style={[styles.viewComment, { marginLeft: 10 }]}
                          >
                            <Image
                              style={{ width: 18, height: 18 }}
                              source={require("../../img/chat.png")}
                            />
                            <Text style={styles.textPopular}> 5 comments</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        )}
      </View>
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
  textPage: {
    fontSize: 12,
    fontFamily: "Roboto",
    color: "#484848",
  },
  buttonPage: {
    width: "50%",
    alignItems: "center",
    borderColor: "#484848",
    paddingBottom: 10,
  },
  viewPage: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  textPopular: {
    fontSize: 12,
    fontFamily: "Roboto",
    color: "#484848",
  },
  viewPopular: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  textsubject: {
    fontSize: 18,
    fontFamily: "RobotoBold",
    color: "#484848",
  },
  textDate: {
    fontSize: 10,
    fontFamily: "RobotoBold",
    color: "rgba(154, 154, 154, 0.75)",
  },
  imgPopular: {
    width: "100%",
    height: 128,
    borderRadius: 15,
    marginTop: 12,
  },
  viewComment: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 40,
  },
  textsubjectPopular: {
    fontSize: 16,
    fontFamily: "Roboto",
    color: "#484848",
    marginTop: 8,
  },
  viewArticles: {
    width: "100%",
    height: 28,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
  },
  search: {
    width: "70%",
    height: 28,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    fontSize: 12,
    fontFamily: "Roboto",
    color: "#484848",
  },
  textDetail: {
    fontSize: 12,
    fontFamily: "RobotoBold",
    color: "#484848",
  },
  buttonFillter: {
    width: 91,
    height: 28,
    paddingHorizontal: 10,
    justifyContent: "center",
    borderBottomWidth: 0.2,
  },
  viewFillter: {
    width: 91,
    backgroundColor: "#FFFFFF",
    zIndex: 99,
    marginTop: 28,
    position: "absolute",
    alignSelf: "flex-end",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textFillter: {
    fontSize: 12,
    fontFamily: "RobotoLight",
  },
  buttonDetail: {
    width: "100%",
    flexDirection: "row",
    marginTop: 12,
    alignItems: "center",
  },
  viewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 29,
    alignItems: "center",
  },
});
