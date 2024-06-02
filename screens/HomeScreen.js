import { View, StyleSheet, Text, Image } from "react-native";
import Button from "../components/Button";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

function HomeScreen({ navigation }) {
  function onPress() {
    signOut(auth)
      .then(() => navigation.replace("Welcome"))
      .catch((error) => alert(error.message));
  }

  function navigateToMBTIPage() {
    navigation.navigate("MBTI");
  }
  return (
    <View style={styles.main}>
      <View style={styles.profile}>
        <Image style={styles.image} source={require("../assets/avatar.png")} />
        <Text style={styles.text}>
          Welcome back, {auth.currentUser.email} !!!
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        <View>
          <Button onPress={navigateToMBTIPage}>MBTI TEST</Button>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <Button onPress={onPress}>SIGN OUT</Button>
      </View>
    </View>
  );
}

export default HomeScreen;

styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    alignSelf: "center",
    justifyContent: "flex-center",
  },
  main: {
    flex: 1,
    backgroundColor: "#fa6559",
    justifyContent: "center",
    alignItems: "stretch",
  },
  text: {
    textAlign: "center",
    color: "black",
    padding: 8,
    marginBottom: 200,
  },
  signOut: {
    flex: 1,
  },
  buttonsContainer: { flex: 1, paddingHorizontal: 53, marginHorizontal: 0 },
  profile: {
    flex: 1,
    marginTop: 40,
  },
});
