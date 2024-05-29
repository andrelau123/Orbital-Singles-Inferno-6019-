import { View, StyleSheet, Text, Image } from "react-native";
import Button from "../components/Button";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

function HomeScreen({ navigation }) {
  function onPress() {
    signOut(auth)
      .then(() => navigation.replace("Login"))
      .catch((error) => alert(error.message));
  }

  function navigateToMBTIPage() {
    navigation.navigate("MBTI");
  }
  return (
    <View style={styles.main}>
      <Text style={styles.text}>
        Welcome back, {auth.currentUser.email} !!!
      </Text>
      <View style={styles.buttonsContainer}>
        <Button onPress={navigateToMBTIPage}>MBTI Test</Button>
      </View>
      <View style={styles.signOut}>
        <Button onPress={onPress}>Sign out</Button>
      </View>
    </View>
  );
}

export default HomeScreen;

styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#122b43",
  },
  text: {
    textAlign: "center",
    color: "white",
    padding: 8,
    marginBottom: 200,
  },
  buttonsContainer: {
    padding: 8,
    flex: 3,
  },
  signOut: {
    flex: 1,
  },
});
