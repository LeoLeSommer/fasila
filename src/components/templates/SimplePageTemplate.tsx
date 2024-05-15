import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeStyleSheet } from "../../hooks/useStyle";
import { View } from "react-native";

export type SimplePageTemplateProps = {
  children: React.ReactNode;
};

export default function SimplePageTemplate({
  children,
}: SimplePageTemplateProps) {
  const styles = useStyles();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  );
}

const useStyles = ThemeStyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    width: "100%",
    maxWidth: theme.breakpoints.sm,
  },
}));
