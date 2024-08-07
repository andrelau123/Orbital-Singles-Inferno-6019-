import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  ImageBackground,
  Alert,
} from "react-native";
import Button from "../components/Button";
import SignOutButton from "../components/SignOutButton";
import { signOut } from "firebase/auth";
import { database, auth } from "../firebase";
import { onValue, ref } from "firebase/database";
import { useFonts } from "expo-font";
import {
  PlayfairDisplay_700Bold,
  TheGirlNextDoor_400Regular,
  ShantellSans_400Regular,
} from "@expo-google-fonts/dev";
import { useState, useEffect } from "react";
import GetMatch from "../components/GetMatch";

function HomeScreen({ navigation }) {
  const useruid = auth.currentUser.uid;
  console.log(useruid);
  const refer = ref(database, "users/" + useruid);
  const font = useFonts({
    PlayfairDisplay_700Bold,
  });
  const font2 = useFonts({
    TheGirlNextDoor_400Regular,
    ShantellSans_400Regular,
  });

  const [name, setname] = useState("");
  const [gender, setgender] = useState("");
  const [best, setbest] = useState("");
  const [worst, setworst] = useState("");
  const [match, setmatch] = useState("");
  const [hobby, sethobby] = useState("");
  const [color, setcolor] = useState("");
  const [food, setfood] = useState("");

  useEffect(() => {
    onValue(refer, (snapshot) => {
      const data = snapshot.val();
      setname(data.name);
      setgender(data.gender);
      setbest(data.best);
      setworst(data.worst);
      sethobby(data.info.hobby);
      setcolor(data.info.color);
      setfood(data.info.food);
      console.log(hobby);
      if (data.mymatch == "-") {
        setmatch(data.mymatch);
      } else {
        onValue(ref(database, "users/" + data.mymatch), (snapshot) => {
          setmatch(snapshot.val().telegram);
        });
      }
    });
  }, []);

  function onPress() {
    signOut(auth)
      .then(() => navigation.replace("Welcome"))
      .catch((error) => alert(error.message));
  }

  function navigateToMBTIPage() {
    navigation.navigate("BIG 5");
  }

  function navigateToMatchingPage() {
    if (best == "") {
      Alert.alert("Please complete an MBTI test before proceeding");
      return;
    }
    GetMatch(useruid);
    navigation.navigate("Match");
  }

  function naviagtetoActivityPage() {
    if (best == "") {
      Alert.alert("Please complete an MBTI test before proceeding");
      return;
    } else if (match == "-") {
      Alert.alert("Please find a match before proceeding");
      return;
    }
    navigation.navigate("Activities");
  }

  function naviagtetoSchedulePage() {
    if (best == "") {
      Alert.alert("Please complete an MBTI test before proceeding");
      return;
    }
    navigation.navigate("Schedule");
  }

  function RenderImage() {
    if (gender == "") {
      return (
        <Image
          source={require("../assets/defprofile.png")}
          style={styles.image}
        />
      );
    } else if (gender == "male") {
      return (
        <Image style={styles.image} source={require("../assets/avatar.png")} />
      );
    } else {
      return (
        <Image
          style={styles.image}
          source={require("../assets/femaleprofile.png")}
        />
      );
    }
  }

  return (
    <View style={styles.main}>
      <ScrollView>
        <View style={styles.profile}>
          <RenderImage />
          <Text style={styles.text}>Welcome back, {name}!!!</Text>
        </View>
        <View style={styles.traits}>
          <View style={styles.detailstextcontainer}>
            <Text style={styles.detailstext}> Name: {name}</Text>
          </View>
          <View style={styles.detailstextcontainer}>
            <Text style={styles.detailstext}> Gender: {gender}</Text>
          </View>
          <View style={styles.detailstextcontainer}>
            <Text style={styles.detailstext}> My Best Trait: {best}</Text>
          </View>
          <View style={styles.detailstextcontainer}>
            <Text style={styles.detailstext}> My Worst Trait: {worst}</Text>
          </View>
          <View style={styles.detailstextcontainer}>
            <Text style={styles.detailstext}> My Match: {match}</Text>
          </View>
          <View style={styles.detailstextcontainer}>
            <Text style={styles.detailstext}> My hobby: {hobby}</Text>
          </View>
          <View style={styles.detailstextcontainer}>
            <Text style={styles.detailstext}> My favourite color: {color}</Text>
          </View>
          <View style={styles.detailstextcontainer}>
            <Text style={styles.detailstext}> My favourite food: {food}</Text>
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <Button onPress={navigateToMBTIPage}>BIG 5 TEST</Button>
          </View>
          <View style={styles.buttonContainer}>
            <Button onPress={navigateToMatchingPage}>GET A MATCH</Button>
          </View>
          <View style={styles.buttonContainer}>
            <Button onPress={naviagtetoActivityPage}>GENERATE ACTIVITY</Button>
          </View>
          <View style={styles.buttonContainer}>
            <Button onPress={naviagtetoSchedulePage}>GENERATE SCHEDULE</Button>
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
  traits: {
    padding: 13,
    backgroundColor: "#a3293f",
    borderRadius: 10,
    position: "absolute",
    top: 160,
    left: 30,
    width: "85%",
    paddingVertical: 30,
    paddingTop: 100,
    zIndex: 1,
    shadowColor: "#877b7a",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 16,
    shadowRadius: 0.35,
  },
  image: {
    width: 170,
    height: 170,
    alignSelf: "center",
    justifyContent: "flex-center",
    shadowColor: "#823b31",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 16,
    shadowRadius: 0.35,
    zIndex: 2,
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
    fontFamily: "PlayfairDisplay_700Bold",
    fontSize: 23,
    color: "#f6d9c1",
  },
  signOut: {
    flex: 1,
  },
  buttonsContainer: {
    flex: 1,
    paddingHorizontal: 44,
    marginBottom: 100,
    marginTop: 90,
  },
  profile: {
    marginTop: 40,
    flex: 1,
    zIndex: 3,
  },
  detailstext: {
    color: "white",
    fontFamily: "ShantellSans_400Regular",
    fontSize: 15,
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
