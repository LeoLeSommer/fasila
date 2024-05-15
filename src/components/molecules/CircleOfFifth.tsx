import { useState } from "react";
import { View } from "react-native";
import { Svg } from "react-native-svg";
import { allNotesWithoutOctave, noteWithoutOctave } from "../../utils/music";
import { ThemeStyleSheet } from "../../hooks/useStyle";
import useVirtualInstrument from "../../hooks/useVirtualInstrument";
import CircleOfFifthNoteArc from "../atoms/CircleOfFifthNoteArc";

export type CircleOfFifthProps = {
  children: React.ReactNode;
};

export default function CircleOfFifth({ children }: CircleOfFifthProps) {
  const styles = useStyles();
  const [containerSize, setContainerSize] = useState({
    width: 0,
    height: 0,
  });
  const { pressedNotes } = useVirtualInstrument();

  const pressedNotesWithoutOctave = pressedNotes.map((note) =>
    noteWithoutOctave(note)
  );

  const circleSize = Math.min(containerSize.width, containerSize.height);

  return (
    <View style={styles.container}>
      <View
        style={styles.circleContainer}
        onLayout={(event) => {
          const { width, height } = event.nativeEvent.layout;
          setContainerSize({ width, height });
        }}
      >
        <View
          style={[
            styles.circle,
            {
              width: circleSize,
              height: circleSize,
            },
          ]}
        >
          <View style={styles.content}>{children}</View>
        </View>
        <Svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${circleSize + 80} ${circleSize + 80}`}
          style={styles.bigSvg}
        >
          {allNotesWithoutOctave.map((note) => (
            <CircleOfFifthNoteArc
              key={note}
              note={note}
              circleSize={circleSize}
              pressed={pressedNotesWithoutOctave.includes(note)}
            />
          ))}
        </Svg>
      </View>
    </View>
  );
}

const useStyles = ThemeStyleSheet.create((theme) => ({
  container: {
    padding: 48,
    width: "100%",
    height: "100%",
  },
  circleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    borderRadius: 9999,
  },
  bigSvg: {
    position: "absolute",
    width: "calc(100% + 80px)" as any,
    height: "calc(100% + 80px)" as any,
    top: -40,
    left: -40,
  },
  svg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
  },
  content: {
    zIndex: 1,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
}));
