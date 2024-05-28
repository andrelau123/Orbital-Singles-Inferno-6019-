import { StyleSheet, Text, View, StatusBar } from "react-native";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import MBTIScreen from "./screens/MBTIScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="white" />
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#122b43",
          },
          headerTintColor: "white",
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="MBTI" component={MBTIScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
