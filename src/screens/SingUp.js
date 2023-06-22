import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { Auth } from 'aws-amplify';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);

  // Sign up
  const signUp = async () => {
    try {
      const { user } = await Auth.signUp({
        username: email,
        password
      });
      console.log('sign up success!', user);
      setIsConfirmationVisible(true);
    } catch (error) {
      console.log('error signing up:', error);
    }
  };

  // Confirm sign up
  const confirmSignUp = async () => {
    try {
      await Auth.confirmSignUp(email, confirmationCode);
      console.log('code confirmed successfully');
    } catch (error) {
      console.log('error confirming sign up', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        style={styles.input}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={signUp} color="#8222F8"/>
      {isConfirmationVisible && (
        <>
          <Text>Enter your confirmation code below:</Text>
          <TextInput
            placeholder="Confirmation Code"
            value={confirmationCode}
            onChangeText={text => setConfirmationCode(text)}
            style={styles.input}
          />
          <Button title="Confirm Sign Up" onPress={confirmSignUp} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 50,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
  },
});

export default SignUp;