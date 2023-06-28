import React, { useState , useEffect} from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Pressable, Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {  Storage, DataStore } from 'aws-amplify';
import { Journal } from '../models';

const JournalEdit = () => {
  const [date, setDate] = useState(new Date().toDateString());
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [morningText, setMorningText] = useState('');
  const [afternoonText, setAfternoonText] = useState('');
  const [nightText, setNightText] = useState('');
  useEffect(() => {
    fetchJournalEntry();
  }, []);

  const fetchJournalEntry = async () => {
    try {
      const journalEntries = await DataStore.query(Journal);
      if (journalEntries.length > 0) {
        const latestEntry = journalEntries[journalEntries.length - 1];
        setDate(latestEntry.date);
        setTitle(latestEntry.title);
        setTags(latestEntry.tags);
        setMorningText(latestEntry.morningText);
        setAfternoonText(latestEntry.afternoonText);
        setNightText(latestEntry.nightText);
      }
    } catch (error) {
      console.error('Error fetching journal entry', error);
    }
  };
  
  const handleChoosePicture = async () => {
    try {
      const image = await ImagePicker.launchImageLibraryAsync(); // Use an image picker library like Expo ImagePicker
      if (!image.cancelled) {
        // Upload the chosen image to AWS S3
        await uploadPicture(image.uri);
        console.log('Picture uploaded successfully');
      }
    } catch (error) {
      console.log('Error choosing picture:', error);
    }
  };
  const uploadPicture = async (uri) => {
    const fileName = `journal_pics/${Date.now()}.jpg`; // Set a unique file name or key
    try {
      await Storage.put(fileName, uri, {
        level: 'public',
        contentType: 'image/jpeg',
      });
    } catch (error) {
      console.log('Error uploading picture:', error);
    }
  }; 
  


  const handleUpdate = () => {
    // Handle submission logic here
    // You can save the journal entry or perform any other action
    console.log('Journal entry edited');
    Alert.alert(
      "👏 Awesome !", // Alert title
      "Memory updated", // Alert message
      [
        { text: "OK" } // Button
      ]
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Remember that day?</Text>
        <View style={styles.buttonView}>
            <Pressable
              style={styles.button}
              onPress={handleChoosePicture}>
              <Text style={styles.textStyle}>Upload Photos</Text>
            </Pressable>
          </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Date:</Text>
          <TextInput
            style={styles.input}
            value={date}
            onChangeText={setDate}
            editable={false}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Title:</Text>
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
              onPress={handleUpdate}>
              <Text style={styles.textStyle}>Update Memory</Text>
            </Pressable>
          </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    margin: "5%",
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
    margin:10,
    marginBottom: 20,
    padding:5,
    backgroundColor: '#8222F8',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 10,
    width: "100%",
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
  },
});

export default JournalEdit;
