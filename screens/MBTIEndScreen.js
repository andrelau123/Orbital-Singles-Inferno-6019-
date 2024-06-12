import { useContext } from "react";
import { DetailsContext } from "../store/context/details";
import Button from "../components/Button";
import { View, StyleSheet, Linking } from "react-native";
import axios from "axios";

function MBTIEndScreen({ navigation }) {
  const ctx = useContext(DetailsContext);
  console.log(ctx);

  function handleHome() {
    axios
      .get(
        "https://api.personalitypolice.com/v1/new_test?api_key=7f3ac8e0-bbba-434a-b686-53f389924567ask_gender='true'"
      )
      .then((res) => console.log(res.data));
    navigation.replace("Home");
  }
  return (
    <View style={styles.base}>
      <View style={styles.homeButton}>
        <Button onPress={handleHome}>Back to Home</Button>
      </View>
    </View>
  );
}

export default MBTIEndScreen;

const styles = StyleSheet.create({
  homeButton: {
    flex: 1,
    padding: 8,
  },
  base: {
    backgroundColor: "#9fb7cd",
    flex: 1,
  },
});
