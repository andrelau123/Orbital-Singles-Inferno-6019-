import { useContext } from "react";
import { DetailsContext } from "../store/context/details";
import Button from "../components/Button";
import { View, StyleSheet } from "react-native";

function MBTIEndScreen({ navigation }) {
  const ctx = useContext(DetailsContext);
  console.log(ctx);

  function handleHome() {
    navigation.back("home");
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
