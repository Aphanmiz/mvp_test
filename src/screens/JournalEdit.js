import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView} from 'react-native';

const JournalEdit = () => {
  const [date, setDate] = useState(new Date().toDateString());
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [morningText, setMorningText] = useState('');
  const [afternoonText, setAfternoonText] = useState('');
  const [nightText, setNightText] = useState('');

  const handleAddEntry = () => {
    // Handle submission logic here
    // You can save the journal entry or perform any other action
    console.log('Journal entry submitted');
  };

  return (
    <ScrollView> 
    <View style={styles.container}>
      <Text style={styles.title}>Remember that day?</Text>
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
      <Button title="Edit Entry" onPress={handleAddEntry} color="#8222F8" />
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin:"10%",
    marginTop:"5%",
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
  }
});

export default JournalEdit;
