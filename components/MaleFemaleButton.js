import { Pressable, View, StyleSheet, Text } from "react-native";
import { useFonts, PlayfairDisplay_700Bold } from "@expo-google-fonts/dev";

function MaleFemaleButton({ children, Press, color }) {
  const fonts = useFonts({ PlayfairDisplay_700Bold });

  return (
    <View style={styles(color).buttonContainer}>
      <Pressable
        onPress={Press}
        style={({ pressed }) =>
          pressed
            ? [styles(color).button, styles(color).pressed]
            : styles(color).button
        }
      >
        <Text style={styles(color).buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}
export default MaleFemaleButton;

const styles = (colorr) =>
  StyleSheet.create({
    buttonContainer: {
      padding: 4,
      shadowColor: "#823b31",
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 6,
      shadowRadius: 0.35,
    },
    button: {
      borderRadius: 10,
      borderWidth: 3,
      padding: 4,
      paddingVertical: 20,
      borderColor: "#f3eded",
      marginHorizontal: 26,
      backgroundColor: colorr,
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
      backgroundColor: colorr,
    },
  });
