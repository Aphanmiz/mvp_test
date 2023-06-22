import React from 'react';
import { View, Image, StyleSheet, ScrollView, Dimensions} from 'react-native';

const Actoon = () => {
  return (
    // <View style={styles.container}>
    <View style={styles.container}> 
        <ScrollView centerContent={true} // To make the image centered in the scrollview
    >
      <Image
        source={require('../../assets/images/img1@3x.png')} // Replace with the actual path to your image
        style={styles.image}
      />
      <Image
        source={require('../../assets/images/img2@3x.png')} // Replace with the actual path to your image
        style={styles.image}
      />
    </ScrollView>
    </View>
    /* </View> */
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'top',
    alignItems: 'center',
    marginTop: 30,
  },
  image: {
    resizeMode: "contain", 
    width: Dimensions.get('window').width, 
    height: Dimensions.get('window').height
  },
});

export default Actoon;
