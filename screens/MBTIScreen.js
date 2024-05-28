import { Text, View, Alert, StyleSheet } from "react-native";
import { useState } from "react";
import Button from "../components/Button";
import { get } from "firebase/database";

function MBTIScreen({ navigation }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [ranking, setRanking] = useState({
    extraversion: 0,
    agreeableness: 0,
    conscientiousness: 0,
    emotional_stability: 0,
    intellect: 0,
  });
  const file = require("./questions.json");
  console.log(file[0]);

  function yesHandler() {}
  function noHandler() {}
  return (
    <View>
      <View>
        <Text>{file[0].question}</Text>
      </View>
      <View style={styles.buttonConatiner}>
        <Button onPress={yesHandler}>Yes</Button>
        <Button onPress={noHandler}>No</Button>
      </View>
    </View>
  );
}

export default MBTIScreen;

const styles = StyleSheet.create({
  buttonConatiner: {
    padding: 8,
  },
});
