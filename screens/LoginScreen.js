import { TextInput, View, StyleSheet, Text, Image, TextInputProps } from "react-native";
import Button from "../components/Button";
import { useEffect, useState, ComponentProps } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { app, auth } from "../firebase";
import FAIcon from 'react-native-vector-icons/FontAwesome';


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
        <Image source={require("../assets/Logo.png")} style={styles.image} />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
        <Text style = {styles.subheader}>Ignite Your Love Life with</Text>
          <Text style={styles.title}>Single's Inferno</Text>
        </View>
        <Text></Text>
        <Text style = {styles.textInputHeader}>Username</Text>
        <View style={styles.input}>
          {/*<Text style={styles.text}>Username: </Text>*/}
          <FAIcon name = "user" size = {25} color="#ffffff"/>
          <TextInput
            style={styles.textInput}
            color= "#000000"
            placeholder="e.g. xxx@gmail.com"
            onChangeText={handleEmail}
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
          />
          
        </View>
        <Text></Text>
        
        
        <View style={styles.input}> 
          <Text style = {styles.textInputHeader2}>Password</Text> 
          <FAIcon name =  "lock" aria-hidden="true" size = {25} color="#ffffff"/>
          <TextInput
            style={styles.textInput}
            color= "#000000"
            placeholder="e.g. iLoveSinglesInferno"
            onChangeText={handlePassword}
            autoCapitalize="none"
            autoCorrect={false}
            value={password}
          />
          
        </View>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <Button onPress={handleSignUp} color = "#fa6559">Sign Up</Button>
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

    padding: 8,
    alignItems: "center",
    justifyContent: "center",

  },
  subheader: {
    fontFamily: "Assistant",
    fontSize: 23,
    alignItems: "center",
    color : "#000000",

  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 50,
    width: 230,
    flexDirection: "row",
    padding: 8,
    textAlign: "center",
 
  },
  main: {
    flex: 1,
    backgroundColor: "#fa6559",
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  title: {
    fontFamily: "Martel",
    fontSize: 50,
    fontWeight: "bold",
    color: "#ffffff",
  },
  textInputHeader: {
    position: 'absolute',
    top: 110,
    left: 90,
    zIndex: 100,
    color: "#ffffff",
    backgroundColor: '#fa6559',
    paddingHorizontal: 20,

  },
  textInputHeader2: {
    position: 'absolute',
    top: -10,
    left: 10,
    zIndex: 100,
    color: "#ffffff",
    backgroundColor: '#fa6559',
    paddingHorizontal: 20,
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
    Color: "#000000",
    
  },
  image: {
    marginTop: 100,
    width: 400,
    height: 400,
  },

  imageContainer: { justifyContent: "center", alignItems: "center", flex: 1 },
  contentContainer: {
    alignItems: "center",
    flex: 3,
  },
 
  textInputContainer : {
    justifyContent: "space-evenly",
  },
});
