import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TabNavigator from "./TabNavigator";
import Home from "../screens/Home";
import Journal from "../screens/JournalCreate";
import Onboard from "../onboard/Onboard";

const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerStyle: { backgroundColor: "whitesmoke" } }}
      >
        {/* <Stack.Screen
          name="Onboard"
          component={Onboard}
          options={{ headerShown: false }}
        />  */}
        <Stack.Screen
          name="Home"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Journal" component={Journal} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
