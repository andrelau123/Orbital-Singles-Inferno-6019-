import { Pressable, View, StyleSheet, Text } from "react-native";
import { useFonts, Signika_700Bold } from "@expo-google-fonts/signika";

function SignOutButton({ children, onPress, color }) {
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
export default SignOutButton;

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 4,
    shadowColor: "#823b31",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 6,
    shadowRadius: 0.35,
  },
  button: {
    borderRadius: 30,
    borderWidth: 4,
    padding: 8,
    paddingVertical: 16,
    paddingHorizontal: 95,
    backgroundColor: "#bb2d23",
    borderColor: "#e01818",
  },

  buttonText: {
    position: "static",
    textAlign: "center",
    color: "#f0e9e9",
    fontFamily: "Sans Serif",
    fontWeight: "bold",
    fontSize: 17,
  },
  pressed: {
    opacity: 0.75,
  },
});
