import { StyleSheet } from "react-native";
import { Chip } from "react-native-paper";
import useLocale from "../../hooks/useLocale";

export type IntervalExerciseMode =
  | "ascending"
  | "descending"
  | "ascending_descending"
  | "harmonic"
  | "random";

export const allIntervalExerciseMode = [
  "ascending",
  "descending",
  "ascending_descending",
  "harmonic",
  "random",
] as IntervalExerciseMode[];

export type IntervalExerciseModeChipProps = {
  mode: IntervalExerciseMode;
  onPress?: () => void;
};

export default function IntervalExerciseModeChip({
  mode,
  onPress,
}: IntervalExerciseModeChipProps) {
  const locale = useLocale();

  return (
    <Chip style={styles.chip} onPress={onPress} compact>
      {locale[mode]}
    </Chip>
  );
}

const styles = StyleSheet.create({
  chip: {
    width: "fit-content",
  },
});
