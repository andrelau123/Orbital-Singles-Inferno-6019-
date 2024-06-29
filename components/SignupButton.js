import { Pressable, View, StyleSheet, Text, Dimensions } from "react-native";
import { useFonts, Signika_700Bold } from "@expo-google-fonts/signika";

function SignupButton({ children, onPress }) {
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
export default SignupButton;

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 4,
    shadowColor: "#823b31",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 6,
    shadowRadius: 0.35,
  },
  button: {
    borderRadius: 34,
    borderWidth: 4,
    padding: 8,
    paddingVertical: 15,
    paddingHorizontal: 95,
    backgroundColor: "#9c6c81",
    borderColor: "#dcd7cd",
  },

  buttonText: {
    position: "static",
    textAlign: "center",
    color: "#eee9e9",
    fontFamily: "Sans Serif",
    fontWeight: "bold",
    fontSize: 17,
  },
  pressed: {
    opacity: 0.75,
  },
});
