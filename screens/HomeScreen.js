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
      <Image style={styles.image} source={require('../assets/avatar.png')}/>
      <Text style={styles.text}>
        Welcome back, {auth.currentUser.email} !!!
      </Text>

      <Button onPress={navigateToMBTIPage} style={styles.buttonsContainer}>MBTI Test</Button>

      <Button onPress={onPress} style={styles.buttonsContainer}>Sign out</Button>
      
    </View>
  );
}

export default HomeScreen;

styles = StyleSheet.create({
  image: {
    width: 100, 
    height: 100,
    alignSelf: "center",
    justifyContent:"flex-center",

  },
  main: {
    flex:1,
    backgroundColor: "#ffffff",
    justifyContent:"center",
    alignItems: "stretch",
  },
  text: {
    textAlign: "center",
    color: "black",
    padding: 8,
    marginBottom: 200,
  },
  buttonsContainer: {
    justifyContent:"flex-start",
    padding: 8,
    flex: 3,
  },
  signOut: {
    flex: 1,
  },
});
