import { useMemo } from "react";
import useLocale from "../../../hooks/useLocale";
import ExerciseList from "../../oranisms/ExerciseList";
import { View, StyleSheet } from "react-native";
import SimplePageTemplate from "../../templates/SimplePageTemplate";
import { Interval, allIntervals } from "../../../utils/music";
import IntervalExerciseModeChip, {
  IntervalExerciseMode,
  allIntervalExerciseMode,
} from "../../atoms/IntervalExerciseModeChip";
import { Text } from "react-native-paper";
import { format } from "../../../utils/string";
import IntervalsKeyboard from "../../molecules/IntervalsKeyboard";

type IntervalsEaringExercise = {
  title: string;
  intervals: Interval[];
  mode: IntervalExerciseMode;
};

export default function IntervalsEaringScreen() {
  const locale = useLocale();
  const exercises = useMemo<IntervalsEaringExercise[]>(
    () => [
      ...allIntervalExerciseMode.map(
        (mode) =>
          ({
            title: locale.interval_exercises.fourths_fifths,
            intervals: [5, 7],
            mode: mode,
          } as IntervalsEaringExercise)
      ),
      ...allIntervalExerciseMode.map(
        (mode) =>
          ({
            title: locale.interval_exercises.fourths_fifths_octaves,
            intervals: [5, 7, 12],
            mode: mode,
          } as IntervalsEaringExercise)
      ),
      ...allIntervalExerciseMode.map(
        (mode) =>
          ({
            title: locale.interval_exercises.second_major_minor,
            intervals: [1, 2],
            mode: mode,
          } as IntervalsEaringExercise)
      ),
      ...allIntervalExerciseMode.map(
        (mode) =>
          ({
            title: locale.all_until_now,
            intervals: [1, 2, 5, 7, 12],
            mode: mode,
          } as IntervalsEaringExercise)
      ),
      ...allIntervalExerciseMode.map(
        (mode) =>
          ({
            title: locale.interval_exercises.third_major_minor_tritone,
            intervals: [3, 4, 6],
            mode: mode,
          } as IntervalsEaringExercise)
      ),
      ...allIntervalExerciseMode.map(
        (mode) =>
          ({
            title: locale.all_until_now,
            intervals: [1, 2, 3, 4, 5, 6, 7, 12],
            mode: mode,
          } as IntervalsEaringExercise)
      ),
      ...allIntervalExerciseMode.map(
        (mode) =>
          ({
            title: locale.interval_exercises.sixth_major_minor,
            intervals: [8, 9],
            mode: mode,
          } as IntervalsEaringExercise)
      ),
      ...allIntervalExerciseMode.map(
        (mode) =>
          ({
            title: locale.all_until_now,
            intervals: [1, 2, 3, 4, 5, 6, 7, 8, 9, 12],
            mode: mode,
          } as IntervalsEaringExercise)
      ),
      ...allIntervalExerciseMode.map(
        (mode) =>
          ({
            title: locale.interval_exercises.seventh_major_minor,
            intervals: [10, 11],
            mode: mode,
          } as IntervalsEaringExercise)
      ),
      ...allIntervalExerciseMode.map(
        (mode) =>
          ({
            title: locale.all_until_now,
            intervals: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            mode: mode,
          } as IntervalsEaringExercise)
      ),
    ],
    [locale]
  );

  return (
    <SimplePageTemplate>
      <ExerciseList
        data={exercises}
        renderItem={({ item }) => (
          <View style={styles.exerciseSummary}>
            <View>
              <IntervalExerciseModeChip mode={item.mode} />
            </View>
            <View style={styles.exerciseRow}>
              <IntervalsKeyboard
                disabledIntervals={allIntervals.filter(
                  (e) => !item.intervals.includes(e as Interval)
                )}
                small
              />
              <Text variant="bodyMedium">
                {format(
                  locale.interval_exercises.x_intervals,
                  item.intervals.length
                )}
              </Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.title}
        titleExtractor={(item) => item.title}
      />
    </SimplePageTemplate>
  );
}

const styles = StyleSheet.create({
  exerciseSummary: {
    gap: 12,
  },
  exerciseRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
});
