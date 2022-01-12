import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import Routes from "./src/routes/index";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { RecoilRoot } from "recoil";
export default function App() {
  const [fontsLoaded, setFont] = useState(false);
  useEffect(() => {
    loadFonts();
    SplashScreen.hideAsync();
  }, []);

  async function loadFonts() {
    await Font.loadAsync({
      Roboto: require("./assets/font/Roboto-Regular.ttf"),
      RobotoBold: require("./assets/font/Roboto-Bold.ttf"),
      RobotoLight: require("./assets/font/Roboto-Light.ttf"),
    });
    setFont(true);
  }
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <RecoilRoot>
        <View style={styles.container}>
          <Routes />
        </View>
      </RecoilRoot>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
