import { StyleSheet, Text, View, StatusBar } from "react-native";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import MBTIScreen from "./screens/MBTIScreen";
import GetDetailsScreen from "./screens/GetDetailsScreen";
import DetailsContextProvider from "./store/context/details";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <DetailsContextProvider>
        <NavigationContainer>
          <StatusBar backgroundColor="white" />
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: "#274f74",
              },
              headerTintColor: "white",
            }}
          >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="MBTI" component={MBTIScreen} />
            <Stack.Screen name="Details" component={GetDetailsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </DetailsContextProvider>
    </>
  );
}
