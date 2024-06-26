import { Text, View, Alert, StyleSheet } from "react-native";
import YesButton from "../components/YesButton";
import NoButton from "../components/NoButton";
import { useState } from "react";
import Helperfunc from "../components/Helperfunc";
import {
  LoveYaLikeASister_400Regular,
  PlayfairDisplay_700Bold,
} from "@expo-google-fonts/dev";
import { update } from "firebase/database";
import { database } from "../firebase";
import { ref } from "firebase/database";
import { auth } from "../firebase";
import { useFonts } from "expo-font";
import * as Progress from "react-native-progress";

function MBTIScreen({ navigation }) {
  const font = useFonts({
    PlayfairDisplay_700Bold,
    LoveYaLikeASister_400Regular,
  });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [ranking, setRanking] = useState({
    extraversion: 0,
    agreeableness: 0,
    conscientiousness: 0,
    emotional_stability: 0,
    intellect: 0,
  });
  const [progressbar, setprogress] = useState(0);
  const file = require("./questions.json");

  function yesHandler() {
    updateRanking();
    updateprogress();
    if (currentQuestion == 49) {
      const result = Object.entries(ranking);
      const maxmin = Helperfunc(result);
      const updates = {
        best: maxmin[0],
        worst: maxmin[1],
        ranking: maxmin[2],
      };
      update(ref(database, "users/" + auth.currentUser.uid), updates);

      navigation.navigate("Details");
      return;
    }
    nextQuestion();
  }
  function noHandler() {
    updateRanking();
    updateprogress();
    if (currentQuestion == 49) {
      const result = Object.entries(ranking);
      const maxmin = Helperfunc(result);
      const updates = {
        best: maxmin[0],
        worst: maxmin[1],
      };
      update(ref(database, "users/" + auth.currentUser.uid), updates);
      navigation.navigate("Details");
      return;
    }
    nextQuestion();
  }

  function nextQuestion() {
    setCurrentQuestion((curr) => curr + 1);
  }

  function updateprogress() {
    setprogress((curr) => curr + 0.02);
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
  return (
    <View style={styles.base}>
      <Text style={styles.Itext}>
        Pick the option that you resonate most with!!
      </Text>
      <View style={styles.progressbar}>
        <Progress.Bar
          color="#f6d9c1"
          borderColor="#f6d9c1"
          width={null}
          progress={progressbar}
        />
      </View>
      <View style={styles.qncontainer}>
        <Text style={styles.text}>{file[currentQuestion].question}</Text>
      </View>
      <View style={styles.yesno}>
        <View style={styles.yesnoButton}>
          <YesButton onPress={yesHandler}>YES</YesButton>
        </View>
        <View style={styles.yesnoButton}>
          <NoButton onPress={noHandler}>NO</NoButton>
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
    backgroundColor: "#fa6559",
    flex: 1,
  },
  yesno: {
    flexDirection: "row",
    flex: 2,
    marginTop: 100,
    justifyContent: "space-evenly",
    marginHorizontal: 15,
  },
  next: {},
  text: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 32,
    padding: 8,
    marginTop: 35,
    margin: 30,
    fontFamily: "PlayfairDisplay_700Bold",
    color: "#f6d9c1",
  },

  yesnoButton: { flex: 2 },
  Itext: {
    color: "white",
    fontFamily: "LoveYaLikeASister_400Regular",
    flex: 1,
    fontSize: 20,
    textAlign: "center",
    padding: 16,
    marginHorizontal: 18,
    marginTop: 30,
  },
  qncontainer: {
    flex: 4,
    backgroundColor: "#a3293f",
    marginHorizontal: 18,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },
  progressbar: {
    flex: 1,
    padding: 16,
    marginHorizontal: 16,
  },
});
