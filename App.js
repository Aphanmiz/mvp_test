const Stack = createNativeStackNavigator();
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import LandingFrame from "./screens/LandingFrame";
import Journal from "./screens/Journal";
import SignUp from "./screens/SignUp";
import Settings from "./screens/Settings";
import Actoon from "./screens/Actoon";
import Museum from "./screens/Museum";
import Reward from "./screens/Reward";
import Interests from "./screens/Interests";
import SignIn from "./screens/SignIn";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Pressable, TouchableOpacity } from "react-native";


// Root component for the React Native app
const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);
  const [fontsLoaded, error] = useFonts({
    "Open Sans_regular": require("./assets/fonts/Open_Sans_regular.ttf"),
    "Open Sans_semibold": require("./assets/fonts/Open_Sans_semibold.ttf"),
    "Open Sans_bold": require("./assets/fonts/Open_Sans_bold.ttf"),
    Assistant_semibold: require("./assets/fonts/Assistant_semibold.ttf"),
  });

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <>
      <NavigationContainer>
        {hideSplashScreen ? (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="LandingFrame"
              component={LandingFrame}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Journal"
              component={Journal}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Settings"
              component={Settings}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Actoon"
              component={Actoon}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Museum"
              component={Museum}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Reward"
              component={Reward}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Interests"
              component={Interests}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        ) : null}
      </NavigationContainer>
    </>
  );
};
export default App;