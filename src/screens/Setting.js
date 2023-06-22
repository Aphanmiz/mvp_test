import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, Button, Linking, StyleSheet } from 'react-native';
// import CustomButton from '../components/CustomButton';
import { Auth } from 'aws-amplify';

const Setting = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      setName(user.attributes.name);
      setEmail(user.attributes.email);
      setPhone(user.attributes.phone_number);
      // You can fetch the avatar picture URL from your backend and set the 'avatar' state accordingly
    } catch (error) {
      console.log('Error fetching user data:', error);
    }
  };

  // const handleAvatarUpload = () => {
  //   // Handle the avatar upload logic here
  //   // You can use a file picker component or API call to handle the avatar upload and set the 'avatar' state
  // };

  const handleQALink = () => {
    Linking.openURL('https://www.aphanmiz.com');
  };

  const handleLogout = async () => {
    try {
      await Auth.signOut();
      // Perform any necessary logout actions (e.g., navigate to a login screen)
    } catch (error) {
      console.log('Error logging out:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hi!</Text>
      <View>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.input}
        />
      </View>
      <View>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          style={styles.input}
        />
      </View>
      <View>
        <Text style={styles.label}>Phone:</Text>
        <TextInput
          value={phone}
          onChangeText={(text) => setPhone(text)}
          keyboardType="phone-pad"
          style={styles.input}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
            title="Q&A"
            onPress={handleQALink} color="#8222F8"
          />
      </View>
      <View style={styles.buttonContainer}>
      <Button
            title="Logout"
            onPress={handleLogout} color="#8222F8"
          />
      </View>
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'top',
    margin:"10%",
    marginTop:"5%",

  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
    borderColor: '#C4C4C4',
  },
  buttonContainer: {
    marginBottom: 20,
    paddingTop: 5,
    paddingBottom: 5,
    // width: "60%",
    // alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000000',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000000',
  },
});