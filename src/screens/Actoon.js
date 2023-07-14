import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Storage } from 'aws-amplify';

const Actoon = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fileList = ['comics_1.png', 'comics_2.png'];

    const fetchFiles = async () => {
      try {
        const fetchedFiles = await Promise.all(
          fileList.map(file =>
            Storage.get(file, { level: 'public' })
          )
        );
        console.log("File retrieved:", fetchedFiles);
        setFiles(fetchedFiles);
      } catch (error) {
        console.error("An error occurred while retrieving the file:", error);
      }
    };

    fetchFiles();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView centerContent={true}>
      {files.map((file, index) => (
          <Image key={index} source={{ uri: file }} style={styles.image} />
        ))}
      </ScrollView>
    </View>
    /* </View> */
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  image: {
    resizeMode: "cover",
    width: '100%',
    height: Dimensions.get('window').height,
    marginVertical: 0,
  },
});

export default Actoon;

