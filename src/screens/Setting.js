import React, { useState, useEffect } from 'react';
// import UserContext from '../context/UserContext'; 
import { View, Text, TextInput, Alert, Linking, StyleSheet, SafeAreaView, Pressable, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { Auth } from 'aws-amplify';

const Setting = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birthdate, setBirthday]= useState(new Date());
  // const [avatar, setAvatar] = useState('');
  const [isEditing, setIsEditing] = useState(false);

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

  const handleUpdate = async () => {
    if (isEditing) {
      try {
        const user = await Auth.currentAuthenticatedUser();
        await Auth.updateUserAttributes(user, {
          'name': name,
          'email': email,
          'phone_number': phone,
          'birthdate': birthdate,
          // 'picture': avatar,  // Uncomment and edit this line if you have a mechanism for handling avatar updates
        });
        fetchUserData();
        console.log('User setting changed successfully');
        Alert.alert(
          "👌 Update done", // Alert title
          "", // Alert message
          [
            { text: "Ok" } // Button
          ]
        );
        setIsEditing(false);
        console.log('new birthdate:');
      } catch (error) {
        console.log('Error updating user attributes:', error);
        Alert.alert(
          "❗️ Update failed", // Alert title
          "", // Alert message
          [
            { text: "Ok" } // Button
          ]
        );
      }
    }else{
      Alert.alert(
        "Nothing changed", // Alert title
        "", // Alert message
        [
          { text: "Ok" } // Button
        ]
      );
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    Alert.alert(
      "⚠️ Want to edit your info?", // Alert title
      "Click on input to edit", // Alert message
      [
        { text: "Ok" } // Button
      ]
    );
  }

  return (
    
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <SafeAreaView style={styles.container}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>Hi!</Text>
        <Pressable
          onPress={handleEdit}
        >
          <Ionicons name="create-outline" size={30} color="#8222F8" />
        </Pressable>
      </View>
      <View>
        <Text style={styles.label}>Name</Text>
        <TextInput
          value={name}
          editable={isEditing}
          onChangeText={(text) => setName(text)}
          style={styles.input}
        />
      </View>
      <View>
        <Text style={styles.label}>Email</Text>
        <TextInput
          value={email}
          editable={isEditing}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          style={styles.input}
        />
      </View>
      <View>
        <Text style={styles.label}>Birthday</Text>
        <TextInput
          value={birthdate}
          editable={isEditing}
          onChangeText={(text) => setBirthday(text)}
          keyboardType="birthday"
          style={styles.input}
        />
      </View>
      <View>
        <Text style={styles.label}>Phone</Text>
        <TextInput
          value={phone}
          editable={isEditing}
          onChangeText={(text) => setPhone(text)}
          keyboardType="phone-pad"
          style={styles.input}
        />
      </View>
      <View style={styles.buttonView}>
      
        <Pressable
          onPress={handleUpdate}
          style={styles.button}
        >
          <Text style={styles.textStyle}>Update</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={handleLogout}
        >
          <Text style={styles.textStyle}>Logout</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={handleQALink}
        >
          <Text style={styles.textStyle}>Q&A</Text>
        </Pressable>
      </View>
      </SafeAreaView>
      </TouchableWithoutFeedback>
    
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: "10%",
    marginTop: "18%",

  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'top',
    marginBottom: 20,
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
    margin: 10,
    marginBottom: 20,
    padding: 5,
    backgroundColor: '#8222F8',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 10,
    width: "30%",
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
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