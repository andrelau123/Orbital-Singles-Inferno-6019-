import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  ImageBackground,
} from "react-native";
import Button from "../components/Button";
import SignOutButton from "../components/SignOutButton";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useContext, useEffect } from "react";
import { DetailsContext } from "../store/context/details";

function HomeScreen({ navigation }) {
  const detailsctx = useContext(DetailsContext);
  useEffect(() => {
    console.log(detailsctx);
  }, []);

  function onPress() {
    signOut(auth)
      .then(() => navigation.replace("Welcome"))
      .catch((error) => alert(error.message));
  }

  function navigateToMBTIPage() {
    navigation.navigate("MBTI");
  }

  function navigateToMatchingPage() {}

  return (
    <View style={styles.main}>
      <ScrollView>
        <View style={styles.profile}>
          <ImageBackground source={require("../assets/island.png")} />
          <Image
            style={styles.image}
            source={require("../assets/avatar.png")}
          />
          <Text style={styles.text}>
            Welcome back, {auth.currentUser.email} !!!
          </Text>
        </View>
        <View style={styles.traits}>
          <View style={styles.detailstextcontainer}>
            <Text style={styles.detailstext}> Name: </Text>
          </View>
          <View style={styles.detailstextcontainer}>
            <Text style={styles.detailstext}> Gender: </Text>
          </View>
          <View style={styles.detailstextcontainer}>
            <Text style={styles.detailstext}> My Best Trait: </Text>
          </View>
          <View style={styles.detailstextcontainer}>
            <Text style={styles.detailstext}> My Worst Trait: </Text>
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <Button onPress={navigateToMBTIPage}>MBTI TEST</Button>
          </View>
          <View style={styles.buttonContainer}>
            <Button onPress={navigateToMatchingPage}>GET A MATCH</Button>
          </View>
        </View>
        <View style={styles.signoutbutton}>
          <SignOutButton onPress={onPress}>SIGN OUT</SignOutButton>
        </View>
      </ScrollView>
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
    shadowColor: "#823b31",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 16,
    shadowRadius: 0.35,
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
  buttonsContainer: { flex: 1, paddingHorizontal: 45, marginBottom: 100 },
  profile: {
    marginTop: 40,
    flex: 1,
  },
  traits: {
    flex: 1,
    padding: 8,
    marginHorizontal: 16,
    backgroundColor: "#a3293f",
    marginVertical: 8,
    borderRadius: 8,
  },
  detailstext: {
    color: "white",
  },
  detailstextcontainer: {
    padding: 5,
  },
  buttonContainer: {
    padding: 4,
    paddingVertical: 4,
  },
  signoutbutton: {
    flex: 1,
    paddingHorizontal: 45,
    marginBottom: 100,
    paddingVertical: 4,
  },
});
