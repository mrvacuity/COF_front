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
export default function ArticsDetail({ navigation }) {
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <View style={{ marginTop: Platform.OS === "ios" ? 0 : 30 }} />
      <ScrollView
        style={{
          backgroundColor: "#f0e9e4",
          height: "100%",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
      >
        <View style={[styles.viewDetail]}>
          <View style={styles.viewHeader}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack("");
              }}
              style={{ width: "20%" }}
            >
              <Entypo name="chevron-thin-left" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.textTitle}>Articles</Text>
            <View style={styles.viewHeader1}>
              <TouchableOpacity>
                <Ionicons
                  name="share-social-outline"
                  size={24}
                  color="#484848"
                />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginLeft: 8 }} onPress={() => {}}>
                <AntDesign name="hearto" size={24} color="#484848" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ marginTop: 24, paddingHorizontal: 35 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 12, fontFamily: "RobotoBold" }}>
                Author:
                <Text style={{ fontFamily: "Roboto", color: "#484848" }}>
                  Frank Rimes
                </Text>
              </Text>
              <Text style={styles.textRoboto}>Date:4/11/2564</Text>
            </View>
            <Text
              style={[styles.textRoboto, { fontSize: 14, marginVertical: 20 }]}
            >
              Dealing with imposter syndrome
            </Text>
            <Image
              style={{ width: "100%", height: 184 }}
              source={{
                uri: "https://s3-alpha-sig.figma.com/img/1eaa/f60a/29b4b470bd5e1022f81f8717c5653808?Expires=1642982400&Signature=LaZjOSjWqb1BYEexi665JAWinFNK2nUdAjsjpnUVEBIHnxXjUsN5w3UNVk2Kki9yJzpTUHc3YdaDam-6QvZfoXcfC4kpnQaNJ0mGivAn4k1Z1mhKzqbszaD23NBhYC1u6fuALDnOvqaZoqlQ3tUk~1AhPgj6ZHQTSGDCdNwjVBG6nSbqAWvTTKENy2oreK8xhhfxBWS4SCN7UNqp2zH777c0bFcjwTLf3sUhSsOddCd1kLoatGVDEawwtTVNgyqMvA1ARvG-Bdlv3jO7ccqLUKINZNBfyOcG54FZJY~~lzAOwS247ulVFy8MqDuDUiN-mREDeOdJON5bdIlpVPGu8g__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
              }}
            />
            <Text style={[styles.textLight, { marginVertical: 25 }]}>
              Our light roast is medium brown in color and is the most acidic of
              our offerings. There may be slight oil on a bean or two, but for
              the most part, the beans are completely free of oil. We roast it
              dark enough to remove some of the sourness that can come from an
            </Text>
            <Text style={styles.textComment}>Comment</Text>
            <View style={styles.viewInputComment}>
              <TextInput
                placeholder="Write a comment...."
                style={[
                  styles.textLight,
                  {
                    width: "90%",
                    height: 39,
                    paddingHorizontal: 10,
                  },
                ]}
              />
              <TouchableOpacity>
                <Feather name="send" size={18} color="#484848" />
              </TouchableOpacity>
            </View>
            <FlatList
              numColumns={1}
              style={{ marginBottom: 20 }}
              data={[{ n: 1 }, { n: 1 }]}
              renderItem={({ item, index }) => {
                return (
                  <View style={styles.viewComment}>
                    <View style={styles.viewDate}>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <MaterialCommunityIcons
                          name="face-outline"
                          size={20}
                          color="#484848"
                        />
                        <Text style={styles.textDate}>Frank Rimes</Text>
                      </View>
                      <Text style={styles.textDate}>12/05/21 12:00 pm</Text>
                    </View>
                    <Text
                      style={[styles.textLight, { fontSize: 12, marginTop: 6 }]}
                    >
                      Tanahair is the friendliest and most efficient
                    </Text>
                  </View>
                );
              }}
            />
          </View>
        </View>
      </ScrollView>
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
    minHeight: "100%",
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
  viewHeader: {
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  viewHeader1: {
    flexDirection: "row",
    alignItems: "center",
    width: "20%",
    marginTop: -5,
  },
  textRoboto: {
    fontSize: 12,
    fontFamily: "Roboto",
    color: "#484848",
  },
  textLight: {
    fontSize: 14,
    fontFamily: "RobotoLight",
    color: "#484848",
  },
  textDate: {
    fontSize: 10,
    fontFamily: "Roboto",
    color: "#484848",
  },
  viewComment: {
    width: "100%",
    borderWidth: 0.2,
    padding: 10,
    minHeight: 74,
    marginTop: 12,
    borderRadius: 5,
  },
  viewDate: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  viewInputComment: {
    width: "100%",
    height: 39,
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 13,
  },
  textComment: { fontSize: 16, fontFamily: "Roboto", color: "#484848" },
});
