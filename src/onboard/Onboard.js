import React from 'react';
import {View, StyleSheet, StatusBar, Image} from 'react-native';

import Onboarding from 'react-native-onboarding-swiper';

const Onboard = ({navigation}) => {
  return(
    <Onboarding
    onSkip={() => navigation.replace('Home')}
    onDone={() => navigation.replace('Home')}
    pages={[
      {
        // need to add style to the image
      image: <Image source={require('../../assets/aphanmiz-logo.png')}/>,
      backgroundColor: '#8222F8',
      title: 'Welcome',
      subtitle: '1st Slide',
      },
      {
        image: <Image source={require('../../assets/aphanmiz-logo.png')} />,
        backgroundColor: '#8222F8',
        title: "Let's Get Started!",
        subtitle: '2nd Slide',
      }
      ]}
    />
  );
};


export default Onboard;
