import { useMemo } from "react";
import PentagoneKeyboard, {
  PentagoneKeyboardItemList,
} from "./PentagoneKeyboard";
import { StyleSheet } from "react-native";

export type IntervalsKeyboard = {
  disabledIntervals?: number[];
  small?: boolean;
  onPress?: (semitones: number) => void;
};

export default function IntervalsKeyboard({
  disabledIntervals,
  small,
  onPress,
}: IntervalsKeyboard) {
  const items: PentagoneKeyboardItemList = useMemo(
    () => [
      {
        label: small ? "" : "1",
        disabled: disabledIntervals?.includes(0),
        onPress: onPress ? () => onPress(0) : undefined,
      },
      {
        label: small ? "" : "b2",
        disabled: disabledIntervals?.includes(1),
        onPress: onPress ? () => onPress(1) : undefined,
      },
      {
        label: small ? "" : "2",
        disabled: disabledIntervals?.includes(2),
        onPress: onPress ? () => onPress(2) : undefined,
      },
      {
        label: small ? "" : "b3",
        disabled: disabledIntervals?.includes(3),
        onPress: onPress ? () => onPress(3) : undefined,
      },
      {
        label: small ? "" : "3",
        disabled: disabledIntervals?.includes(4),
        onPress: onPress ? () => onPress(4) : undefined,
      },
      {
        label: small ? "" : "4",
        disabled: disabledIntervals?.includes(5),
        onPress: onPress ? () => onPress(5) : undefined,
      },
      {
        label: small ? "" : "#4",
        disabled: disabledIntervals?.includes(6),
        onPress: onPress ? () => onPress(6) : undefined,
      },
      {
        label: small ? "" : "5",
        disabled: disabledIntervals?.includes(7),
        onPress: onPress ? () => onPress(7) : undefined,
      },
      {
        label: small ? "" : "b6",
        disabled: disabledIntervals?.includes(8),
        onPress: onPress ? () => onPress(8) : undefined,
      },
      {
        label: small ? "" : "6",
        disabled: disabledIntervals?.includes(9),
        onPress: onPress ? () => onPress(9) : undefined,
      },
      {
        label: small ? "" : "b7",
        disabled: disabledIntervals?.includes(10),
        onPress: onPress ? () => onPress(10) : undefined,
      },
      {
        label: small ? "" : "7",
        disabled: disabledIntervals?.includes(11),
        onPress: onPress ? () => onPress(11) : undefined,
      },
      {
        label: small ? "" : "8",
        disabled: disabledIntervals?.includes(12),
        onPress: onPress ? () => onPress(12) : undefined,
      },
    ],
    [disabledIntervals, onPress]
  );

  return (
    <PentagoneKeyboard items={items} style={small ? styles.small : undefined} />
  );
}

const styles = StyleSheet.create({
  small: {
    maxWidth: 100,
  },
});
