import { useNavigation } from "@react-navigation/native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { Appbar as PaperAppbar } from "react-native-paper";

const icon = require("../../../assets/icon.svg");

export default function Appbar({
  navigation,
  options,
  back,
}: NativeStackHeaderProps) {
  return (
    <PaperAppbar.Header>
      <PaperAppbar.Action
        icon={back ? "arrow-left" : icon}
        onPress={() => back && navigation.goBack()}
      />
      <PaperAppbar.Content title={options.title} />
      <PaperAppbar.Action icon="dots-vertical" onPress={() => {}} />
    </PaperAppbar.Header>
  );
}
