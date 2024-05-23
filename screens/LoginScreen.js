import { TextInput, View, StyleSheet, Text } from "react-native";
import Button from "../components/Button";
import { useState } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { app } from "../firebase";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onPress() {
    console.log("pressed");
  }

  function handleEmail(userEmailInput) {
    setEmail(userEmailInput);
    console.log(email);
  }

  function handlePassword(userPassword) {
    setPassword(userPassword);
  }

  function handleSignUp() {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredetial) => {
        const user = userCredetial.user;
        console.log(user.displayName);
      })
      .catch((error) => alert(error.message));
  }

  return (
    <View styles={styles.main}>
      <View style={styles.input}>
        <Text>Username: </Text>
        <TextInput
          style={styles.textInput}
          placeholder="username"
          onChangeText={handleEmail}
        />
      </View>
      <View style={styles.input}>
        <Text>Password: </Text>
        <TextInput
          style={styles.textInput}
          placeholder="password"
          onChangeText={handlePassword}
        />
      </View>
      <View>
        <Button onPress={handleSignUp}>Sign Up</Button>
        <Button onPress={onPress}>Login</Button>
      </View>
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  textInput: {
    padding: 8,
    borderColor: "black",
    borderWidth: 1,
  },
  input: {
    flexDirection: "row",
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  main: {
    alignItems: "center",
    justifyContent: "center",
  },
});
