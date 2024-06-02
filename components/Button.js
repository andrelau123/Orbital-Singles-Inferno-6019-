import { Pressable, View, StyleSheet, Text } from "react-native";
import { useFonts, Signika_700Bold } from "@expo-google-fonts/signika";

function Button({ children, onPress }) {
  const fonts = useFonts({ Signika_700Bold });
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
export default Button;

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 4,
    shadowColor: "#823b31",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 6,
    shadowRadius: 0.35,
  },
  button: {
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 2,
    padding: 8,
    paddingVertical: 16,
    paddingHorizontal: 100,
    backgroundColor: "#d56e66",
    borderColor: "#dcd7cd",
  },

  buttonText: {
    textAlign: "center",
    color: "#f4eff3",
    fontFamily: "Sans Serif",
    fontWeight: "bold",
    fontSize: 14,
  },
  pressed: {
    opacity: 0.75,
  },
});
