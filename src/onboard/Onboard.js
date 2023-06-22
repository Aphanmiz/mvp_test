import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

const slides = [
  {
    key: '1',
    title: 'Welcome to Our App',
    text: 'This app does A, B, and C.',
    image: require('../../assets/images/aphanmiz-logo.png'),
    backgroundColor: '#fff',
  },
  {
    key: '2',
    title: 'How to Use the App',
    text: 'Here is how you can use our app to do X, Y, and Z.',
    image: require('../../assets/images/aphanmiz-logo.png'),
    backgroundColor: '#fff',
  },
  {
    key: '3',
    title: 'Tips to Get Started',
    text: 'These tips will help you get the most out of our app.',
    image: require('../../assets/images/aphanmiz-logo.png'),
    backgroundColor: '#fff',
  },
];

const Onboard = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Text style={styles.title}>{item.title}</Text>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );

  const onDone = () => {
    // User finished the introduction. Navigate to your main screen here.
    navigation.replace('Home');
  };

  return <AppIntroSlider renderItem={renderItem} data={slides} onDone={onDone} />;
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    marginTop: 100,
  },
  title: {
    fontSize: 22,
    color: '#333',
    textAlign: 'center',
    marginHorizontal: 20,
  },
  text: {
    color: '#333',
    textAlign: 'center',
    marginHorizontal: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 15,
  },
});

export default Onboard;
