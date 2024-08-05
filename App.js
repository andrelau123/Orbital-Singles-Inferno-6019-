import { StyleSheet, Text, View, StatusBar } from "react-native";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import MBTIScreen from "./screens/MBTIScreen";
import GetDetailsScreen from "./screens/GetDetailsScreen";
import DetailsContextProvider from "./store/context/details";
import MBTIEndScreen from "./screens/MBTIEndScreen";
import MatchScreen from "./screens/MatchScreen";
import ActivitiesScreen from "./screens/ActivitiesScreen";
import ScheduleScreen from "./screens/ScheduleScreen";
import InfoScreen from "./screens/InfoScreen";
import { useFonts } from "expo-font";
import {
  PlayfairDisplay_700Bold,
  TheGirlNextDoor_400Regular,
  ShantellSans_400Regular,
} from "@expo-google-fonts/dev";
import AppLoading from "expo-app-loading";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsloaded] = useFonts({
    PlayfairDisplay_700Bold,
    TheGirlNextDoor_400Regular,
    ShantellSans_400Regular,
  });

  if (!fontsloaded) {
    <AppLoading />;
  }

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
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="BIG 5" component={MBTIScreen} />
            <Stack.Screen name="Details" component={GetDetailsScreen} />
            <Stack.Screen name="mbtiresults" component={MBTIEndScreen} />
            <Stack.Screen name="Match" component={MatchScreen} />
            <Stack.Screen name="Activities" component={ActivitiesScreen} />
            <Stack.Screen name="Schedule" component={ScheduleScreen} />
            <Stack.Screen name="Info" component={InfoScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </DetailsContextProvider>
    </>
  );
}
