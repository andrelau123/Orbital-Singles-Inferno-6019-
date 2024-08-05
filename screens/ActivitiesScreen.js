import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import Button from "../components/Button";
import { main } from "../components/GetResponse";
import { useState, useEffect } from "react";
import { onValue, ref } from "firebase/database";
import { auth, database } from "../firebase";
import { useFonts, LoveYaLikeASister_400Regular } from "expo-font";
import { TypeAnimation } from "react-native-type-animation";

function ActivitiesScreen() {
  const [activity, setactivity] = useState("");
  const [best, setbest] = useState("");
  const [worst, setworst] = useState("");
  const [refinetext, setrefinetext] = useState("");
  const [response, setresponse] = useState(false);
  const useruid = auth.currentUser.uid;
  const refer = ref(database, "users/" + useruid);
  const font = useFonts({ LoveYaLikeASister_400Regular });

  useEffect(() => {
    onValue(refer, (snapshot) => {
      const data = snapshot.val();
      setbest(data.best);
      setworst(data.worst);
    });
  }, []);

  function handleactivity() {
    setactivity(main(best, worst, refinetext));
    setresponse(true);
    console.log(activity);
  }

  function resettext() {
    setrefinetext("");
  }

  function handletext(text) {
    setrefinetext(text);
    console.log(refinetext);
  }

  function refineresponse() {
    if (!response) {
      Alert.alert("Please generate a response first before refining");
      return;
    } else if (refinetext == "") {
      Alert.alert("Please input a refine promt first!!");
      return;
    }
    setactivity(main(best, worst, refinetext));
    resettext();
    console.log(activity);
  }

  return (
    <View style={styles.main}>
      <ScrollView>
        <View style={styles.activitycontainer}>
          <Button onPress={handleactivity}>GET ACTIVITY</Button>
        </View>
        <View style={styles.buttoncontainer}>
          <Text style={styles.text}>{activity}</Text>
        </View>
        <View style={styles.refine}>
          <View style={styles.padding}>
            <Text style={styles.refinetext}>
              I would like to refine this response!!
            </Text>
          </View>
          <View style={styles.padding}>
            <TextInput
              placeholder="your conditions"
              style={styles.textinput}
              value={refinetext}
              onChangeText={handletext}
              autoCorrect={false}
            />
          </View>
          <View style={styles.padding}>
            <Button onPress={refineresponse}>REFINE RESPONSE</Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default ActivitiesScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#fa6559",
    padding: 30,
  },
  buttoncontainer: {
    flex: 1,
    padding: 12,
  },
  activitycontainer: {
    flex: 1,
  },
  text: {
    color: "white",
    fontFamily: "LoveYaLikeASister_400Regular",
  },

  refine: {
    padding: 12,
    backgroundColor: "#72a1af",
    borderRadius: 12,
  },
  textinput: {
    padding: 12,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: "white",
    backgroundColor: "#f6d9c1",
  },
  padding: {
    padding: 6,
  },
  refinetext: {
    color: "white",
  },
});
