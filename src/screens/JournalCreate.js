import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, SafeAreaView, Pressable, Alert, Image, KeyboardAvoidingView } from 'react-native';
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
  const [selectedImages, setSelectedImages] = useState(null);

  const handleChoosePicture = async () => {
    try {
      const images = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        maxSelected: 9,
      }); // Use an image picker library like Expo ImagePicker
      if (!images.canceled) {
        // Upload the chosen image to AWS S3
        const selectedImages = images.assets.slice(0, 9).map((asset) => asset.uri);
        setSelectedImages(selectedImages);
        console.log('Picture choosing successfully');
        console.log(images)
        // console.log(selectedImages)
      }
    } catch (error) {
      console.log('Error choosing picture:', error);
    }
  };
  const uploadPicture = async (uri) => {
    console.log(uri)
    for (let i = 0; i < uri.length; i++) {
      const fileName = `journal_pics/${Date.now()}`; // Set a unique file name or key
      try {
        const response = await fetch(uri[i]);
        const blob = await response.blob();
        let fileExtension = "";
        // To solve the corrupted images issues using fetch & blob
        
        if (uri[i].startsWith("data:image/")){
          let startIndex = uri[i].indexOf("/") + 1; // Get index after "/"
          let endIndex = uri[i].indexOf(";"); // Get index before ";"
          fileExtension = uri[i].substring(startIndex, endIndex);
        } 
        
        if (uri[i].startsWith("file://")){
          fileExtension = uri[i].match(/\.(\w+)$/)?.[1];
        }
        console.log(fileExtension)
        await Storage.put(`${fileName}.${fileExtension}`, blob, {
          level: 'public',
          contentType: `image/${fileExtension}`,
        });
        console.log('Success: Image uploaded:', fileName);
      } catch (error) {
        console.log('Error uploading picture:', error);
      }
    }
  };

  const getMimeType = (extension) => {
    switch (extension.toLowerCase()) {
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg';
      case 'png':
        return 'image/png';
      // add more cases as needed
      default:
        return 'image/jpeg'; // default case if extension is not matched
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
      await uploadPicture(selectedImages);
      console.log('Journal entry submitted successfully');
      setDate(new Date().toISOString().split('T')[0]);
      setTitle('');
      setTags('');
      setMorningText('');
      setAfternoonText('');
      setNightText('');
      setSelectedImages(null);
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

  const ImageGallery = ({ images }) => {
    return (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {images.map((uri, index) => (
          <Image
            key={index}
            source={{ uri }}
            style={{ width: 100, height: 100, margin: 5 }}
          />
        ))}
      </View>
    );
  };
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>How is  today?</Text>
          <View style={styles.buttonView}>
            <Pressable
              style={styles.button}
              onPress={handleChoosePicture}>
              <Text style={styles.textStyle}>Upload Photos (Max 9) </Text>
            </Pressable>
          </View>
          {/* {selectedImage && (
            <View style={styles.selectedImageContainer}>
              <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
            </View>
          )} */}
          {selectedImages && 
          <View>
          <ImageGallery images={selectedImages} />
          </View>
          }
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
      </KeyboardAvoidingView>
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
