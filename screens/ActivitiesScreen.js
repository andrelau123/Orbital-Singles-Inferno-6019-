import { StyleSheet, View, Text, ScrollView } from "react-native";
import Button from "../components/Button";
import { main } from "../components/GetResponse";
import { useState, useEffect } from "react";
import { onValue, ref } from "firebase/database";
import { auth, database } from "../firebase";
import { useFonts, LoveYaLikeASister_400Regular } from "expo-font";

function ActivitiesScreen() {
  const [activity, setactivity] = useState("");
  const [best, setbest] = useState("");
  const [worst, setworst] = useState("");
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
    setactivity(main(best, worst));
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
});
