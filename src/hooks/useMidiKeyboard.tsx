import { createContext, useContext, useEffect, useState } from "react";
import {
  requestMIDIAccess,
  MIDIAccess,
  MIDIInput,
} from "@motiz88/react-native-midi";
import { Note, midiNoteCodeToNoteName } from "../utils/music";

export type Unsubscribe = () => void;

export type MidiKeyboard = {
  subscribeNoteOn: (
    listener: (note: Note, velocity: number) => void
  ) => Unsubscribe;
  subscribeNoteOff: (listener: (note: Note) => void) => Unsubscribe;
};

export const MidiKeyboardContext = createContext<MidiKeyboard>({
  subscribeNoteOn: () => () => {},
  subscribeNoteOff: () => () => {},
});

export type MidiKeyboardProviderProps = {
  children: React.ReactNode;
};

export function MidiKeyboardProvider({ children }: MidiKeyboardProviderProps) {
  const [midi, setMidi] = useState<MIDIAccess | null>(null);
  const [noteOnListeners, setNoteOnListeners] = useState<
    ((note: Note, velocity: number) => void)[]
  >([]);
  const [noteOffListeners, setNoteOffListeners] = useState<
    ((note: Note) => void)[]
  >([]);

  const subscribeNoteOn = (
    listener: (note: Note, velocity: number) => void
  ) => {
    setNoteOnListeners((previous) => [...previous, listener]);

    return () => {
      setNoteOnListeners((previous) => previous.filter((l) => l !== listener));
    };
  };

  const subscribeNoteOff = (listener: (note: Note) => void) => {
    setNoteOffListeners((previous) => [...previous, listener]);

    return () => {
      setNoteOffListeners((previous) => previous.filter((l) => l !== listener));
    };
  };

  useEffect(() => {
    requestMIDIAccess().then((midi) => setMidi(midi));
  }, []);

  const configureInput = (input: MIDIInput) => {
    input.onmidimessage = (message) => {
      if (message.data && message.data.length !== 3) {
        return;
      }

      const [command, noteMidiCode, midiVelocity] = message.data as any as [
        number,
        number,
        number
      ];

      const note = midiNoteCodeToNoteName(noteMidiCode);

      if (!note) {
        return;
      }

      const normalizedVelocity = Math.min(1, midiVelocity / 127);

      // Command 144 is Note On
      if (command === 144) {
        noteOnListeners.forEach((listener) =>
          listener(note, normalizedVelocity)
        );
      }

      // Command 128 is Note Off
      if (command === 128) {
        noteOffListeners.forEach((listener) => listener(note));
      }
    };

    return () => {
      input.onmidimessage = null;
    };
  };

  useEffect(() => {
    midi?.inputs.forEach(configureInput);
  }, [midi, noteOnListeners, noteOffListeners]);

  return (
    <MidiKeyboardContext.Provider value={{ subscribeNoteOn, subscribeNoteOff }}>
      {children}
    </MidiKeyboardContext.Provider>
  );
}

export default function useMidiKeyboard(
  onNoteOn: (note: Note, velocity: number) => void,
  onNoteOff: (note: Note) => void
) {
  const { subscribeNoteOn, subscribeNoteOff } = useContext(MidiKeyboardContext);

  useEffect(() => {
    const unsubscribeNoteOn = subscribeNoteOn(onNoteOn);
    const unsubscribeNoteOff = subscribeNoteOff(onNoteOff);

    return () => {
      unsubscribeNoteOn();
      unsubscribeNoteOff();
    };
  }, [onNoteOn, onNoteOff]);
}
