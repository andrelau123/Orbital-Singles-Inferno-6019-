import { View, StyleSheet, Text } from "react-native";
import Button from "../components/Button";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

function HomeScreen({ navigation }) {
  function onPress() {
    signOut(auth)
      .then(() => navigation.replace("Login"))
      .catch((error) => alert(error.message));
  }
  return (
    <View style={styles.main}>
      <Text style={styles.text}>
        Welcome back, {auth.currentUser.email} !!!
      </Text>
      <Button onPress={onPress}>Sign out</Button>
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
});
