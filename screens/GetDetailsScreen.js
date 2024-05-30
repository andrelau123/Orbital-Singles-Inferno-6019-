import { TextInput, View } from "react-native";
import Button from "../components/Button";
import YesnoButton from "../components/YesnoButton";

function GetDetailsScreen() {
  return (
    <View>
      <View>
        <TextInput value="name" />
        <TextInput value="telegram handle" />
      </View>
      <View>
        <YesnoButton>Male</YesnoButton>
        <YesnoButton>Female</YesnoButton>
      </View>
      <View>
        <Button>Get Results</Button>
      </View>
    </View>
  );
}

export default GetDetailsScreen;
