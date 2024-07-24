import { View, TextInput, Text } from "react-native";
import Button from "./Button";

export default function Responseupdate(handletext) {
  return (
    <View style={styles.refine}>
      <View style={styles.padding}>
        <Text style={styles.refinetext}>
          I would like to refine this response!!
        </Text>
      </View>
      <View style={styles.padding}>
        <TextInput
          placeholder="your conditions"
          style={styles.textinput}
          value={refinetext}
          onChangeText={handletext}
        />
      </View>
      <View style={styles.padding}>
        <Button onPress={refineresponse}>REFINE RESPONSE</Button>
      </View>
    </View>
  );
}
