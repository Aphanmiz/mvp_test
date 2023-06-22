import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Navigator from "./src/navigation";

import {Amplify} from 'aws-amplify';
import awsconfig from './src/aws-exports';
//some bug from @aws-amplify/ui-react-native
import { withAuthenticator } from "aws-amplify-react-native";
Amplify.configure(awsconfig);


const App = () => {
  return (
    <View style={styles.container}>
      <Navigator />
      <StatusBar style="auto" />
    </View>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "whitesmoke",
    justifyContent: "center",
  },
});

export default withAuthenticator(App);