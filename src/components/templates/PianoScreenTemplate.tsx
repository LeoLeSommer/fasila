import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeStyleSheet } from "../../hooks/useStyle";
import PianoKeyboard from "../molecules/PianoKeyboard";

export type PianoScreenTemplateProps = {
  children: React.ReactNode;
};

export default function PianoScreenTemplate({
  children,
}: PianoScreenTemplateProps) {
  const styles = useStyles();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>{children}</View>
      <PianoKeyboard style={styles.piano} />
    </SafeAreaView>
  );
}

const useStyles = ThemeStyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: "center",
  },
  header: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    maxWidth: theme.breakpoints.sm,
  },
  piano: {
    flex: 1,
    width: "100%",
  },
}));
