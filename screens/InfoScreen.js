import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import Button from "../components/Button";
import { auth, database } from "../firebase";
import { update, ref } from "firebase/database";

function InfoScreen({ navigation }) {
  const [hobby, sethobby] = useState("");
  const [color, setcolor] = useState("");
  const [food, setfood] = useState("");

  function handlehobby(input) {
    sethobby(input);
    console.log(hobby);
  }

  function handlecolor(input) {
    setcolor(input);
  }

  function handlefood(input) {
    setfood(input);
  }

  function handleResults() {
    const uid = auth.currentUser.uid;
    const updates = {
      hobby: hobby,
      color: color,
      food: food,
    };
    update(ref(database, "users/" + uid + "/info"), updates);
    navigation.navigate("Home");
  }

  return (
    <ScrollView style={styles.base}>
      <KeyboardAvoidingView style={styles.screen}>
        <View style={styles.base}>
          <View style={styles.inputContainer}>
            <View style={styles.eachfield}>
              <Text style={styles.text}>Hobby: </Text>
              <TextInput
                style={styles.input}
                placeholder="hobby"
                onChangeText={handlehobby}
                value={hobby}
              />
            </View>
            <View style={styles.eachfield}>
              <Text style={styles.text}>Favourite color?: </Text>
              <TextInput
                style={styles.input}
                placeholder="color"
                onChangeText={handlecolor}
                autoCapitalize="none"
                autoCorrect={false}
                value={color}
              />
            </View>

            <View style={styles.eachfield}>
              <Text style={styles.text}>Favourite food?: </Text>
              <TextInput
                style={styles.input}
                placeholder="food"
                onChangeText={handlefood}
                autoCapitalize="none"
                autoCorrect={false}
                value={food}
              />
            </View>
          </View>
        </View>
        <View style={styles.resultsContainer}>
          <Button onPress={handleResults}> GET RESULTS</Button>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
export default InfoScreen;

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: "#fa6559",
  },

  inputContainer: {
    flex: 1,
    padding: 12,
    marginTop: 6,
  },
  input: {
    borderWidth: 2,
    padding: 10,
    borderRadius: 6,
    marginHorizontal: 8,
    backgroundColor: "#f6d9c1",
    borderColor: "white",
  },
  genderContainer: {
    flex: 1,
    flexDirection: "row",
    padding: 12,
  },
  genderButton: {
    flex: 1,
  },
  resultsContainer: {
    flex: 1,
    marginTop: 135,
    paddingHorizontal: 41,
  },
  genderTextContainer: {
    padding: 24,
  },
  text: {
    paddingVertical: 8,
    marginHorizontal: 8,
    fontSize: 15,
    color: "white",
    fontFamily: "Sans Serif",
    fontWeight: "600",
  },
  eachfield: {
    padding: 8,
  },
  screen: {
    flex: 1,
  },
});
