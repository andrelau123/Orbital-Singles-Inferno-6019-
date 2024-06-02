import { TextInput, View, Text, StyleSheet } from "react-native";
import Button from "../components/Button";
import { useContext, useState } from "react";
import YesnoButton2 from "../components/YesnoButton2";
import { DetailsContext } from "../store/context/details";

function GetDetailsScreen({ navigation }) {
  const [name, setName] = useState("");
  const [telegram, setTelegram] = useState("");
  const [gender, setGender] = useState("");
  const detailsctx = useContext(DetailsContext);

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
    detailsctx.updateDetails("name", name);
    detailsctx.updateDetails("telegram", telegram);
    detailsctx.updateDetails("gender", gender);
    navigation.navigate("mbtiresults");
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
        <Button onPress={handleResults}> Get Results</Button>
      </View>
    </View>
  );
}

export default GetDetailsScreen;

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: "#9fb7cd",
  },

  inputContainer: {
    flex: 1,
    padding: 12,
    marginTop: 6,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
    marginHorizontal: 8,
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
  },
  genderTextContainer: {
    padding: 12,
  },
  text: {
    paddingVertical: 8,
    marginHorizontal: 8,
    fontSize: 13,
  },
});
