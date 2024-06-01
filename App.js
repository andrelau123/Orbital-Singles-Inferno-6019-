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
          <StatusBar backgroundColor="#fa6559" />
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: "#fa6559",
              },
              headerTintColor: "#ffffff",
            }}
          >
            <Stack.Screen name="Welcome" component={LoginScreen} />
            <Stack.Screen name="Home" options={{headerStyle: {backgroundColor: '#fa6559',}, }} component={HomeScreen} />
            <Stack.Screen name="MBTI" component={MBTIScreen} />
            <Stack.Screen name="Details" component={GetDetailsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </DetailsContextProvider>
    </>
  );
}
