import { Pressable, View, StyleSheet, Text } from "react-native";
import { useFonts, PlayfairDisplay_700Bold } from "@expo-google-fonts/dev";

function YesButton({ children, onPress }) {
  const fonts = useFonts({ PlayfairDisplay_700Bold });
  return (
    <View style={styles.buttonContainer}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) =>
          pressed ? [styles.button, styles.pressed] : styles.button
        }
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}
export default YesButton;

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 4,
    shadowColor: "#823b31",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 6,
    shadowRadius: 0.35,
  },
  button: {
    borderRadius: 10,
    borderWidth: 4,
    padding: 4,
    paddingVertical: 18,
    backgroundColor: "#d56e66",
    borderColor: "#59754e",
    marginHorizontal: 25,
  },

  buttonText: {
    position: "static",
    textAlign: "center",
    color: "#eee9e9",
    fontFamily: "Sans Serif",
    fontWeight: "bold",
    fontSize: 20,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: "#80ba64",
  },
});
