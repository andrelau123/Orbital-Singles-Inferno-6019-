import { Text, View, Alert, StyleSheet } from "react-native";
import YesnoButton from "../components/YesnoButton";
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

  function yesHandler() {
    nextQuestion();
  }
  function noHandler() {
    nextQuestion();
  }

  function nextQuestion() {
    setCurrentQuestion((curr) => {
      if (curr + 1 <= 50) {
        return curr + 1;
      } else {
        return 0;
      }
    });
  }

  function updateRanking() {}

  return (
    <View style={styles.base}>
      <View>
        <Text style={styles.text}>{file[currentQuestion].question}</Text>
      </View>
      <View style={styles.buttonConatiner}>
        <View style={styles.yesno}>
          <YesnoButton onPress={yesHandler}>Yes</YesnoButton>
          <YesnoButton onPress={noHandler}>No</YesnoButton>
        </View>
        <View style={styles.next}></View>
      </View>
    </View>
  );
}

export default MBTIScreen;

const styles = StyleSheet.create({
  buttonConatiner: {
    padding: 8,
  },
  base: {
    backgroundColor: "#9fb7cd",
    flex: 1,
  },
  yesno: {
    flexDirection: "column",
  },
  next: {},
  text: {
    textAlign: "center",
    fontSize: 20,
    padding: 8,
    marginTop: 8,
  },
});
