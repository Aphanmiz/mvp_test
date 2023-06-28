import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Storage } from 'aws-amplify';

const Actoon = () => {
  const [file, setFile] = useState(null);
  useEffect(() => {
    const fetchFile = async () => {
      try {
        const fetchedFile = await Storage.get("comics_1.png", {
          level: "public"
        });
        console.log("File retrieved:", fetchedFile);
        setFile(fetchedFile);
      } catch (error) {
        console.error("An error occurred while retrieving the file:", error);
      }
    };

    fetchFile();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView centerContent={true} // To make the image centered in the scrollview
      >
     {file ? <Image source={{ uri: file }} style={styles.image} /> : null}
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

