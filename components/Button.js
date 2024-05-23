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
  },
  button: {
    margin: 4,
    borderRadius: 4,
    overflow: "hidden",
    borderWidth: 1,
    padding: 8,
    marginHorizontal: 8,
    backgroundColor: "#c3578b",
    borderColor: "#883d61",
  },
  buttonText: {
    textAlign: "center",
    color: "#2c0b24",
  },
  pressed: {
    opacity: 0.75,
  },
});
