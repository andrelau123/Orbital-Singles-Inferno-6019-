import { TextInput, View, Text, StyleSheet } from "react-native";
import Button from "../components/Button";
import { useState } from "react";
import YesnoButton2 from "../components/YesnoButton2";
import { database, auth } from "../firebase";
import { update, ref } from "firebase/database";
function GetDetailsScreen({ navigation }) {
  const [name, setName] = useState("");
  const [telegram, setTelegram] = useState("");
  const [gender, setGender] = useState("");

  function handleName(input) {
    setName(input);
  }

  function handleTelegram(input) {
    setTelegram(input);
  }

  function handleMale() {
    setGender("male");
  }

  function handleFemale() {
    setGender("female");
  }

  function handleResults() {
    const uid = auth.currentUser.uid;
    const updates = {
      name: name,
      telegram: telegram,
      gender: gender,
    };
    update(ref(database, "users/" + uid), updates);

    navigation.navigate("Home");
  }
  return (
    <View style={styles.base}>
      <View style={styles.inputContainer}>
        <View>
          <Text style={styles.text}>Name: </Text>
          <TextInput
            style={styles.input}
            placeholder="name"
            onChangeText={handleName}
            value={name}
          />
        </View>
        <View>
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
          <YesnoButton2 onPress={handleMale}>Male</YesnoButton2>
        </View>
        <View style={styles.genderButton}>
          <YesnoButton2 onPress={handleFemale}>Female</YesnoButton2>
        </View>
      </View>
      <View style={styles.resultsContainer}>
        <Button onPress={handleResults}> GET RESULTS</Button>
      </View>
    </View>
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
    backgroundColor: "#db8273",
    borderColor: "white",
  },
  genderContainer: {
    flex: 1,
    flexDirection: "row",
  },
  genderButton: {
    flex: 1,
  },
  resultsContainer: {
    flex: 1,
    paddingHorizontal: 41,
  },
  genderTextContainer: {
    padding: 12,
  },
  text: {
    paddingVertical: 8,
    marginHorizontal: 8,
    fontSize: 13,
    color: "white",
  },
});
