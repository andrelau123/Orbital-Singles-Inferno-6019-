import { Pressable, View, StyleSheet, Text } from "react-native";

function Button({ children, onPress }) {
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
    shadowColor: "#29395a",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 6,
    shadowRadius: 0.35,
  },
  button: {
    borderRadius: 4,
    overflow: "hidden",
    borderWidth: 1,
    padding: 8,
    marginHorizontal: 100,
    paddingVertical: 13,
    backgroundColor: "#372056",
    borderColor: "#fcfbfb",
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#ede8ec",
  },
  pressed: {
    opacity: 0.75,
  },
});
