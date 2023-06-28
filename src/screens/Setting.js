import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, Button, Linking, StyleSheet, SafeAreaView, Pressable } from 'react-native';
// import CustomButton from '../components/CustomButton';
import { Auth } from 'aws-amplify';

const Setting = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birthdate, setBirthday] = useState('');
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
      setBirthday(user.attributes.birthdate);
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
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Hi!</Text>
      <View>
        <Text style={styles.label}>Name</Text>
        <TextInput
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.input}
        />
      </View>
      <View>
        <Text style={styles.label}>Email</Text>
        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          style={styles.input}
        />
      </View>
      <View>
        <Text style={styles.label}>Birthday</Text>
        <TextInput
          value={birthdate}
          onChangeText={(text) => setBirthday(text)}
          keyboardType="birthday"
          style={styles.input}
        />
      </View>
      <View>
        <Text style={styles.label}>Phone</Text>
        <TextInput
          value={phone}
          onChangeText={(text) => setPhone(text)}
          keyboardType="phone-pad"
          style={styles.input}
        />
      </View>
      <View style={styles.buttonView}>
          <Pressable
            style={styles.button}
            onPress={handleQALink}
          >
            <Text style={styles.textStyle}>Q&A</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={handleLogout}
          >
            <Text style={styles.textStyle}>Logout</Text>
          </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: "10%",
    marginTop: "18%",

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
  button: {
    margin:10,
    marginBottom: 20,
    padding:5,
    backgroundColor: '#8222F8',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 10,
    width: "45%",
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
  textStyle: {
    color: 'white',
    textAlign: 'center',
  },
});