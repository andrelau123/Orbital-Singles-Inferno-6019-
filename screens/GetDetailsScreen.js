import {
  TextInput,
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import Button from "../components/Button";
import { useState } from "react";
import MaleFemaleButton from "../components/MaleFemaleButton";
import { database, auth } from "../firebase";
import { update, ref } from "firebase/database";
function GetDetailsScreen({ navigation }) {
  const [name, setName] = useState("");
  const [telegram, setTelegram] = useState("");
  const [gender, setGender] = useState("");
  const [malecolor, setmalecolor] = useState("#d35b5b");
  const [femalecolor, setfemalecolor] = useState("#d35b5b");
  const [clicked, setclicked] = useState(false);

  function handleName(input) {
    setName(input);
  }

  function handleTelegram(input) {
    setTelegram(input);
  }

  function handleMale() {
    if (!clicked) {
      setmalecolor("#59a6a7");
      setGender("male");
      setclicked(true);
    } else {
      setmalecolor("#d35b5b");
      setGender("male");
      setclicked(false);
    }
  }

  function handleFemale() {
    if (!clicked) {
      setfemalecolor("#9b1b25");
      setGender("female");
      setclicked(true);
    } else {
      setfemalecolor("#d35b5b");
      setGender("female");
      setclicked(false);
    }
  }

  function handleResults() {
    const uid = auth.currentUser.uid;
    const updates = {
      name: name,
      telegram: telegram,
      gender: gender,
    };
    update(ref(database, "users/" + uid), updates);

    navigation.navigate("Info");
  }
  return (
    <ScrollView style={styles.base}>
      <KeyboardAvoidingView style={styles.screen}>
        <View style={styles.base}>
          <View style={styles.inputContainer}>
            <View style={styles.eachfield}>
              <Text style={styles.text}>Name: </Text>
              <TextInput
                style={styles.input}
                placeholder="name"
                onChangeText={handleName}
                value={name}
              />
            </View>
            <View style={styles.eachfield}>
              <Text style={styles.text}>Telegram: </Text>
              <TextInput
                style={styles.input}
                placeholder="telegram handle"
                onChangeText={handleTelegram}
                autoCapitalize="none"
                autoCorrect={false}
                value={telegram}
              />
            </View>
          </View>
          <View style={styles.genderTextContainer}>
            <Text style={styles.text}>Gender:</Text>
          </View>
          <View style={styles.genderContainer}>
            <View style={styles.genderButton}>
              <MaleFemaleButton Press={handleMale} color={malecolor}>
                Male
              </MaleFemaleButton>
            </View>
            <View style={styles.genderButton}>
              <MaleFemaleButton Press={handleFemale} color={femalecolor}>
                Female
              </MaleFemaleButton>
            </View>
          </View>
          <View style={styles.resultsContainer}>
            <Button onPress={handleResults}> GET RESULTS</Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default GetDetailsScreen;

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
