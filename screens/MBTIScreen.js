import { Text, View, Alert, StyleSheet } from "react-native";
import YesnoButton from "../components/YesnoButton";
import { useState } from "react";
import Helperfunc from "../components/Helperfunc";
import { Khand_400Regular, useFonts } from "@expo-google-fonts/khand";

function MBTIScreen({ navigation }) {
  const font = useFonts({ Khand_400Regular });
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
    updateRanking();
    if (currentQuestion == 49) {
      navigation.replace("Details");
    }
    nextQuestion();
  }
  function noHandler() {
    nextQuestion();
  }

  function nextQuestion() {
    setCurrentQuestion((curr) => curr + 1);
  }

  function updateRanking() {
    setRanking((curr) => {
      return {
        ...curr,
        [file[currentQuestion].category]:
          curr[file[currentQuestion].category] + file[currentQuestion].scale,
      };
    });
  }
  console.log(ranking);
  return (
    <View style={styles.base}>
      <Text style={styles.Itext}>I...</Text>
      <View style={styles.test}>
        <Text style={styles.text}>{file[currentQuestion].question}</Text>
      </View>
      <View style={styles.yesno}>
        <View style={styles.yesnoButton}>
          <YesnoButton onPress={yesHandler}>Yes</YesnoButton>
        </View>
        <View style={styles.yesnoButton}>
          <YesnoButton onPress={noHandler}>No</YesnoButton>
        </View>
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
    flexDirection: "row",
    flex: 2,
    marginTop: 100,
  },
  next: {},
  text: {
    textAlign: "center",
    fontSize: 35,
    padding: 8,
    marginTop: 35,
    fontFamily: "Khand_400Regular",
    margin: 30,
  },

  yesnoButton: {
    flex: 1,
  },
  Itext: {
    padding: 12,
    fontSize: 40,
    fontStyle: "italic",
    fontFamily: "Baskerville",
    marginLeft: 25,
    marginTop: 20,
    flex: 1,
  },
  test: {
    flex: 2,
  },
});
