import { TextInput, View, StyleSheet, Text, Image } from "react-native";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { app, auth } from "../firebase";

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscibe = onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        navigation.replace("Home");
      }
    });
    return unsubscibe;
  }, []);

  function handleEmail(userEmailInput) {
    setEmail(userEmailInput);
    console.log(email);
  }

  function handlePassword(userPassword) {
    setPassword(userPassword);
  }

  function reset() {
    setEmail("");
    setPassword("");
  }

  function handleSignUp() {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredetial) => {
        const user = userCredetial.user;
        console.log(user.email);
      })
      .catch((error) => alert(error.message));
    reset();
  }

  function handleSignIn() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredetial) => {
        const user = userCredetial.user;
        console.log(user.email);
      })
      .catch((error) => alert(error.message));
    reset();
  }
  return (
    <View style={styles.main}>
      <View style={styles.imageContainer}>
        <Image source={require("../assets/icon.png")} style={styles.image} />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Single's Inferno</Text>
        </View>
        <View style={styles.input}>
          <Text style={styles.text}>Username: </Text>
          <TextInput
            style={styles.textInput}
            placeholder="username"
            onChangeText={handleEmail}
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
          />
        </View>
        <View style={styles.input}>
          <Text style={styles.text}>Password: </Text>
          <TextInput
            style={styles.textInput}
            placeholder="password"
            onChangeText={handlePassword}
            autoCapitalize="none"
            autoCorrect={false}
            value={password}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <Button onPress={handleSignUp}>Sign Up</Button>
          </View>
          <View style={styles.buttonContainer}>
            <Button onPress={handleSignIn}>Login</Button>
          </View>
        </View>
      </View>
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  textInput: {
    padding: 9,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 4,
    width: 230,
  },
  input: {
    flexDirection: "row",
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  main: {
    flex: 1,
    backgroundColor: "#9fb7cd",
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  title: {
    fontSize: 50,
    fontFamily: "Baskerville",
    color: "#0e0c36",
  },
  text: {
    padding: 8,
    width: 90,
    textAlign: "center",
  },
  buttonContainer: {
    padding: 3,
  },
  buttonsContainer: {
    marginTop: 30,
  },
  image: {
    width: 150,
    height: 150,
  },

  imageContainer: { justifyContent: "center", alignItems: "center", flex: 1 },
  contentContainer: {
    flex: 3,
  },
});
