import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, SafeAreaView, Pressable, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Storage, DataStore } from 'aws-amplify';
import { Journal } from '../models';


const JournalCreate = () => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [morningText, setMorningText] = useState('');
  const [afternoonText, setAfternoonText] = useState('');
  const [nightText, setNightText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const handleChoosePicture = async () => {
    try {
      const image = await ImagePicker.launchImageLibraryAsync(); // Use an image picker library like Expo ImagePicker
      if (!image.canceled) {
        // Upload the chosen image to AWS S3
        setSelectedImage(image.assets[0].uri);
        console.log('Picture choosing successfully');
      }
    } catch (error) {
      console.log('Error choosing picture:', error);
    }
  };
  const uploadPicture = async (uri) => {
    const fileName = `journal_pics/${Date.now()}.jpeg`; // Set a unique file name or key
    try {
      await Storage.put(fileName, uri, {
        level: 'public',
        contentType: 'image/jpeg',
      });
    } catch (error) {
      console.log('Error uploading picture:', error);
    }
  };

  const handleSubmit = async () => {
    const journalEntry = {
      date: date,
      title: title,
      tags: tags,
      morningText: morningText,
      afternoonText: afternoonText,
      nightText: nightText,
    };
    try {
      await DataStore.save(
        new Journal(journalEntry)
      );
      await uploadPicture(selectedImage);
      console.log('Journal entry submitted successfully');
      setDate(new Date().toISOString().split('T')[0]);
      setTitle('');
      setTags('');
      setMorningText('');
      setAfternoonText('');
      setNightText('');
      setSelectedImage(null);
      Alert.alert(
        "🎉 You did it !", // Alert title
        "Memory added", // Alert message
        [
          { text: "OK" } // Button
        ]
      );
    } catch (error) {
      console.error('Error submitting journal entry', error);
    }
  };


  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>How is  today?</Text>
          <View style={styles.buttonView}>
            <Pressable
              style={styles.button}
              onPress={handleChoosePicture}>
              <Text style={styles.textStyle}>Upload Photos</Text>
            </Pressable>
          </View>
          {selectedImage && (
            <View style={styles.selectedImageContainer}>
              <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
            </View>
          )}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Date *:</Text>
            <TextInput
              style={styles.input}
              value={date}
              onChangeText={setDate}
              editable={true}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Title * :</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Tags:</Text>
            <TextInput
              style={styles.input}
              value={tags}
              onChangeText={setTags}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Morning:</Text>
            <TextInput
              style={styles.multilineInput}
              value={morningText}
              onChangeText={setMorningText}
              multiline={true}
              numberOfLines={3}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Afternoon:</Text>
            <TextInput
              style={styles.multilineInput}
              value={afternoonText}
              onChangeText={setAfternoonText}
              multiline={true}
              numberOfLines={3}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Night:</Text>
            <TextInput
              style={styles.multilineInput}
              value={nightText}
              onChangeText={setNightText}
              multiline={true}
              numberOfLines={3}
            />
          </View>
          <View style={styles.buttonView}>
            <Pressable
              style={styles.button}
              onPress={handleSubmit}>
              <Text style={styles.textStyle}>Add Memory</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: "10%",
    marginTop: "5%",
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000000',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000000',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#C4C4C4',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  multilineInput: {
    height: 100,
    borderWidth: 1,
    borderColor: '#C4C4C4',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingTop: 8,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 10,
    backgroundColor: '#8222F8',
    width: '100%',
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedImage: {
    width: 200,
    height: 200,
  }
});

export default JournalCreate;
