import { useState } from "react";
import { ScrollView, StyleSheet, View, ViewStyle } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { Note } from "../../utils/music";
import useVirtualInstrument from "../../hooks/useVirtualInstrument";
import useMidiKeyboard from "../../hooks/useMidiKeyboard";
import { ThemeStyleSheet } from "../../hooks/useStyle";

export type PianoKeyboardProps = {
  style?: ViewStyle;
};

export default function PianoKeyboard({ style }: PianoKeyboardProps) {
  const [width, setWidth] = useState(0);
  const octaveWidth = width * 0.8;
  const styles = useStyles();

  const { playNote, stopNote } = useVirtualInstrument();

  useMidiKeyboard(playNote, stopNote);

  return (
    <ScrollView
      style={style}
      onLayout={(event) => {
        const { width } = event.nativeEvent.layout;
        setWidth(width);
      }}
      horizontal
    >
      <View style={styles.container}>
        <Octave
          index={0}
          width={octaveWidth}
          onTouchStart={playNote}
          onTouchEnd={stopNote}
        />
        <Octave
          index={1}
          width={octaveWidth}
          onTouchStart={playNote}
          onTouchEnd={stopNote}
        />
        <Octave
          index={2}
          width={octaveWidth}
          onTouchStart={playNote}
          onTouchEnd={stopNote}
        />
        <Octave
          index={3}
          width={octaveWidth}
          onTouchStart={playNote}
          onTouchEnd={stopNote}
        />
        <Octave
          index={4}
          width={octaveWidth}
          onTouchStart={playNote}
          onTouchEnd={stopNote}
        />
        <Octave
          index={5}
          width={octaveWidth}
          onTouchStart={playNote}
          onTouchEnd={stopNote}
        />
        <Octave
          index={6}
          width={octaveWidth}
          onTouchStart={playNote}
          onTouchEnd={stopNote}
        />
      </View>
    </ScrollView>
  );
}

type OctaveProps = {
  index: number;
  width: number;
  onTouchStart: (note: Note, velocity: number) => void;
  onTouchEnd: (note: Note) => void;
};

function Octave({ index, width, onTouchStart, onTouchEnd }: OctaveProps) {
  const styles = useStyles();

  return (
    <View style={[styles.octave, { width }]}>
      <View style={styles.whiteKeys}>
        {whiteNotes.map((note) => (
          <WhiteKey
            key={note}
            note={`${note}${index}` as Note}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          />
        ))}
      </View>
      <View style={styles.blackKeys1}>
        {blackNotes1.map((note) => (
          <BlackKey
            key={note}
            note={`${note}${index}` as Note}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          />
        ))}
      </View>
      <View style={styles.blackKeys2}>
        {blackNotes2.map((note) => (
          <BlackKey
            key={note}
            note={`${note}${index}` as Note}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          />
        ))}
      </View>
    </View>
  );
}

type KeyProps = {
  note: Note;
  onTouchStart: (note: Note, velocity: number) => void;
  onTouchEnd: (note: Note) => void;
};

function WhiteKey({ note, onTouchStart, onTouchEnd }: KeyProps) {
  const styles = useStyles();

  return (
    <TouchableRipple
      style={styles.whiteKey}
      onPress={() => {}}
      onPressIn={() => onTouchStart(note, 1.0)}
      onPressOut={() => onTouchEnd(note)}
    >
      <></>
    </TouchableRipple>
  );
}

function BlackKey({ note, onTouchStart, onTouchEnd }: KeyProps) {
  const styles = useStyles();

  return (
    <TouchableRipple
      style={styles.blackKey}
      rippleColor="grey"
      onPress={() => {}}
      onPressIn={() => onTouchStart(note, 1.0)}
      onPressOut={() => onTouchEnd(note)}
    >
      <></>
    </TouchableRipple>
  );
}

const whiteNotes: string[] = ["C", "D", "E", "F", "G", "A", "B"];
const blackNotes1: string[] = ["Db", "Eb"];
const blackNotes2: string[] = ["Gb", "Ab", "Bb"];

const useStyles = ThemeStyleSheet.create((theme) => ({
  container: {
    flexDirection: "row",
  },
  octave: {
    flexDirection: "row",
    borderTopColor: "black",
    borderTopWidth: 1,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    maxWidth: theme.breakpoints.sm * 0.5,
  },
  whiteKeys: {
    flex: 1,
    flexDirection: "row",
  },
  blackKeys1: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "50%",
    height: "60%",
    flexDirection: "row",
    marginLeft: "10%",
    gap: "12.6666666%" as any,
  },
  blackKeys2: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "50%",
    height: "60%",
    flexDirection: "row",
    marginLeft: "53%",
    gap: "12.6666666%" as any,
  },
  whiteKey: {
    flex: 1,
    backgroundColor: "white",
    borderRightWidth: 1,
    borderColor: "black",
  },
  blackKey: {
    backgroundColor: "black",
    borderRightWidth: 1,
    borderColor: "black",
    width: "16%",
  },
}));
