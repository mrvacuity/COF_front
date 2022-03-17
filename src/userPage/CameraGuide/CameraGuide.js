// React Native App Intro Slider using AppIntroSlider
// https://aboutreact.com/react-native-app-intro-slider/
// Simple Intro Slider

// import React in our code
import React, {useState} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons';
//import AppIntroSlider to use it
import AppIntroSlider from 'react-native-app-intro-slider';

export default function CameraGuide({ navigation }) {
  const onDone = () => {
    navigation.goBack("");
  };
  const onSkip = () => {
    navigation.goBack("");
  };
  const RenderItem = ({item}) => {
    return (
      <View style={styles.container}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#F4EFEC',
          alignItems: 'center',
          justifyContent: 'space-around',
          borderRadius:30,
        }}>
        <Image
          style={styles.introImageStyle}
          source={item.image} />
      </View>
      </View>
    );
  };

  const RenderSkipButton = () => {
    return (
      <View style = {{
        marginLeft:'20%',
        marginTop:'15%',
      }}>
        <Text>Skip</Text>
      </View>
    );
  };

  const RenderNextButton = () => {
    return (
      <View style = {{
        marginRight:'5%',
        marginTop:'25%',
      }}>
        <Text>Next</Text>
      </View>
    );
  };

  const RenderDoneButton = () => {
    return (
      <View style = {{
        marginRight:'5%',
        marginTop:'25%',
      }}>
        <Text>Done</Text>
      </View>
    );
  };

  const RenderPrvevButton = () => {
    return (
      <View >
        <Text>Back</Text>
      </View>
    );
  };
  return (
        <AppIntroSlider
          data={slides}
          renderItem={RenderItem}
          onDone={onDone}
          showSkipButton={true}
          onSkip={onSkip}
          renderSkipButton={RenderSkipButton}
          renderDoneButton={RenderDoneButton}
          renderNextButton={RenderNextButton}
        />
  );
};

const slides = [
  {
    key: 's1',
    image: require('../../img/CameraGuide1.png'),
  },
  {
    key: 's2',
    image: require('../../img/CameraGuide2.png'),
  }
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 12,
  },
  titleStyle: {
    padding: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  paragraphStyle: {
    padding: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  introImageStyle: {
    borderRadius:10,
    marginBottom:'10%',
    width: '80%',
    height: '80%',
  },
  introTextStyle: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    paddingVertical: 30,
  },
  introTitleStyle: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: 'bold',
  },
});
