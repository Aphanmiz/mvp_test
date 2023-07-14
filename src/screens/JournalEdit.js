import React, { useState , useEffect} from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Pressable, Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {  Storage, DataStore } from 'aws-amplify';
import { Journal } from '../models';

const JournalEdit = ({selectedDate}) => {
  console.log(selectedDate)
  const [date, setDate] = useState(selectedDate);
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [morningText, setMorningText] = useState('');
  const [afternoonText, setAfternoonText] = useState('');
  const [nightText, setNightText] = useState('');
  const [journal, setJournal] = useState(null);

  useEffect(() => {
    fetchJournalEntry(selectedDate);
  }, [selectedDate]);

  const fetchJournalEntry = async (selectedDate) => {
    try {
      const journalEntries = await DataStore.query(Journal, (c) => c.date.eq(selectedDate));
      if (journalEntries.length > 0) {
        const journalEntry = journalEntries[0];
        setDate(journalEntry.date);
        setTitle(journalEntry.title);
        setTags(journalEntry.tags);
        setMorningText(journalEntry.morningText);
        setAfternoonText(journalEntry.afternoonText);
        setNightText(journalEntry.nightText);
        setJournal(journalEntry);
      }
      // no entry doesn't work
      console.log(journalEntries)
      if (journalEntries.length < 0)  {
        Alert.alert(
          "You didn't write anything !", // Alert title
          "Do you want to add some?", // Alert message
          [
            { text: "OK" } // Button
          ]
        );
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


  const handleUpdate = async () => {
    // Handle submission logic here
    // You can save the journal entry or perform any other action
    if (journal){
      try{
        await DataStore.save(
          Journal.copyOf(journal, updated => {
            updated.title = title;
            updated.tags = tags;
            updated.morningText = morningText;
            updated.afternoonText = afternoonText;
            updated.nightText = nightText;
          })
        );

        console.log('Update success');
        Alert.alert(
          "👏 Awesome !", // Alert title
          "Memory updated", // Alert message
          [
            { text: "OK" } // Button
          ]
        );
      } catch (error) {
        console.error('Error updating journal entry', error);
        Alert.alert(
          "😢 Oh no !", // Alert title
          "Something went wrong, please try again", // Alert message
          [
            { text: "OK" } // Button
          ]
        );
      }
    } else {
      console.log('No journal entry to update');
      Alert.alert(
        "💡 You didn't make any changes!", // Alert title
        "", // Alert message
        [
          { text: "OK" } // Button
        ]
      );
    }
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
    margin: "10%",
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
