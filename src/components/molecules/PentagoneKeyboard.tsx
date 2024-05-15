import { StyleSheet, View, ViewStyle } from "react-native";
import PentagoneButton from "../atoms/PentagoneButton";
import { useState } from "react";

export type PentagoneKeyboardItem = {
  label: string;
  disabled?: boolean;
  onPress?: () => void;
};

export type PentagoneKeyboardItemList = [
  PentagoneKeyboardItem,
  PentagoneKeyboardItem,
  PentagoneKeyboardItem,
  PentagoneKeyboardItem,
  PentagoneKeyboardItem,
  PentagoneKeyboardItem,
  PentagoneKeyboardItem,
  PentagoneKeyboardItem,
  PentagoneKeyboardItem,
  PentagoneKeyboardItem,
  PentagoneKeyboardItem,
  PentagoneKeyboardItem,
  PentagoneKeyboardItem
];

export type PentagoneKeyboardProps = {
  items: PentagoneKeyboardItemList;
  style?: ViewStyle;
};

export default function PentagoneKeyboard({
  items,
  style,
}: PentagoneKeyboardProps) {
  const [containerWidth, setContainerWidth] = useState(0);

  return (
    <View
      style={[styles.container, style, { minHeight: containerWidth * 0.31 }]}
      onLayout={(event) => {
        setContainerWidth(event.nativeEvent.layout.width);
      }}
    >
      {items.map((item, index) => (
        <PentagoneButton
          key={index}
          label={item.label}
          position={
            [0, 2, 4, 5, 7, 9, 11, 12].includes(index) ? "bottom" : "top"
          }
          style={
            index === 1
              ? styles.second
              : index === 3
              ? styles.fourth
              : index === 6
              ? styles.seventh
              : index === 8
              ? styles.ninth
              : index === 10
              ? styles.eleventh
              : styles.bottom
          }
          disabled={item.disabled}
          width={containerWidth / 8}
          onPress={item.onPress}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  second: {
    position: "absolute",
    top: 0,
    left: "6.25%",
  },
  fourth: {
    position: "absolute",
    top: 0,
    left: "18.75%",
  },
  seventh: {
    position: "absolute",
    top: 0,
    left: "43.75%",
  },
  ninth: {
    position: "absolute",
    top: 0,
    left: "56.25%",
  },
  eleventh: {
    position: "absolute",
    top: 0,
    left: "68.75%",
  },
  bottom: {
    position: "relative",
    //top: "40%",
    alignSelf: "flex-end",
  },
});
