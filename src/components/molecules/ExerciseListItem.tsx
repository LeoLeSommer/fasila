import { StyleSheet } from "react-native";
import { Surface, Text } from "react-native-paper";

export type ExerciseListItemProps = {
  title: string;
  children?: React.ReactNode;
};

export default function ExerciseListItem({
  title,
  children,
}: ExerciseListItemProps) {
  return (
    <Surface style={styles.container}>
      <Text variant="titleMedium">{title}</Text>
      {children}
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    margin: 8,
    gap: 12,
  },
});
