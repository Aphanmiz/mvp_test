import { StyleSheet, View } from "react-native";
import Navigator from "./src/navigation";
import '@azure/core-asynciterator-polyfill'

import { Amplify } from 'aws-amplify';
import awsconfig from './src/aws-exports';
//some bug from @aws-amplify/ui-react-native
import { withAuthenticator, AmplifyTheme} from "aws-amplify-react-native";

Amplify.configure({
  ...awsconfig,
  // DataStore: {  
  //   authModeStrategyType: 'MULTI_AUTH'
  // }
});

const App = () => {

  return (
    <View style={styles.container}>
      <Navigator />
    </View>
  )
}

const MyTheme = {
  ...AmplifyTheme,
  button: {
    ...AmplifyTheme.button,
    backgroundColor: '#8222F8',
  },
  buttonDisabled: {
    ...AmplifyTheme.buttonDisabled,
    backgroundColor: '#8222F8',
  },
  sectionFooterLink: {
    ...AmplifyTheme.sectionFooterLink,
    color: '#8222F8'
  },
  sectionFooterLinkDisabled: {
    ...AmplifyTheme.sectionFooterLink,
    color: '#8222F8'
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "whitesmoke",
    justifyContent: "center",
  },
});

export default withAuthenticator(App, {
  usernameAttributes: 'email',
  signUpConfig: {
    header: 'Create a new Aphanmiz account',
    hideAllDefaults: true,
    defaultCountryCode: '1',
    signUpFields: [
      {
        label: 'My User Name',
        key: 'name',
        required: true,
        displayOrder: 1,
        type: 'string'
      },
      {
        label: 'Email',
        key: 'username',
        required: true,
        displayOrder: 2,
        type: 'email'
      },
      {
        label: 'Password',
        key: 'password',
        required: true,
        displayOrder: 3,
        type: 'password'
      },
      {
        label: 'Birthday (YYYY-MM-DD)',
        key: 'birthdate',
        required: true,
        displayOrder: 4,
        type: 'date'
      },
      {
        label: 'PhoneNumber',
        key: 'phone_number',
        required: true,
        displayOrder: 5,
        type: 'string'
      },
    ]
  },
  theme: MyTheme
});