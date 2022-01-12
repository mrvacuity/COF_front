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
import { Video, AVPlaybackStatus } from "expo-av";
const { width, height } = Dimensions.get("screen");
export default function VideoPage({ navigation }) {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
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
          <Text style={styles.textTitle}>Video</Text>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="clock-time-four-outline"
              size={26}
              color="#484848"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.viewPage}>
          <Text style={{ fontSize: 18, fontFamily: "RobotoBold" }}>
            Name of video
          </Text>
          <Video
            ref={video}
            style={styles.video}
            source={{
              uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
            }}
            onLoadStart={() => {
              video.current.playAsync();
            }}
            useNativeControls
            resizeMode="contain"
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />
        </View>
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
    paddingRight: 29,
  },
  viewPage: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    height: "100%",
    borderTopRightRadius: 50,
    paddingHorizontal: 16,
    paddingVertical: 19,
    marginTop: 10,
  },
  video: { width: "100%", height: 200, borderRadius: 20 },
});
