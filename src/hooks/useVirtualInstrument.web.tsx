import { createContext, useContext, useMemo, useState } from "react";
import {
  Note,
  allNotes,
  getClosestNote,
  getNoteDistanceAsSemitones,
} from "../utils/music";

const F1 = require("../../assets/sounds/rhodes/F1.wav");
const B1 = require("../../assets/sounds/rhodes/B1.wav");
const E2 = require("../../assets/sounds/rhodes/E2.wav");
const A2 = require("../../assets/sounds/rhodes/A2.wav");
const D3 = require("../../assets/sounds/rhodes/D3.wav");
const G3 = require("../../assets/sounds/rhodes/G3.wav");
const B3 = require("../../assets/sounds/rhodes/B3.wav");
const D4 = require("../../assets/sounds/rhodes/D4.wav");
const F4 = require("../../assets/sounds/rhodes/F4.wav");
const B4 = require("../../assets/sounds/rhodes/B4.wav");
const E5 = require("../../assets/sounds/rhodes/E5.wav");
const A5 = require("../../assets/sounds/rhodes/A5.wav");
const D6 = require("../../assets/sounds/rhodes/D6.wav");
const G6 = require("../../assets/sounds/rhodes/G6.wav");
const C7 = require("../../assets/sounds/rhodes/C7.wav");

const instrumentData: {
  [key: string]: {
    rate: number;
    format: number;
    length: number;
    loopStart: number;
    loopEnd: number;
  };
} = require("../../assets/sounds/rhodes/instrument.json");

const availableNotes: Partial<
  Record<
    Note,
    {
      source: any;
      rate: number;
      format: number;
      length: number;
      loopStart: number;
      loopEnd: number;
    }
  >
> = {
  F1: { source: F1, ...instrumentData.F1 },
  B1: { source: B1, ...instrumentData.B1 },
  E2: { source: E2, ...instrumentData.E2 },
  A2: { source: A2, ...instrumentData.A2 },
  D3: { source: D3, ...instrumentData.D3 },
  G3: { source: G3, ...instrumentData.G3 },
  B3: { source: B3, ...instrumentData.B3 },
  D4: { source: D4, ...instrumentData.D4 },
  F4: { source: F4, ...instrumentData.F4 },
  B4: { source: B4, ...instrumentData.B4 },
  E5: { source: E5, ...instrumentData.E5 },
  A5: { source: A5, ...instrumentData.A5 },
  D6: { source: D6, ...instrumentData.D6 },
  G6: { source: G6, ...instrumentData.G6 },
  C7: { source: C7, ...instrumentData.C7 },
};

export type VirtualInstrument = {
  playNote: (note: Note, velocity: number) => void;
  stopNote: (note: Note) => void;
};

export const VirtualInstrumentContext = createContext<VirtualInstrument>({
  playNote: () => {},
  stopNote: () => {},
});

export default function useVirtualInstrument() {
  return useContext(VirtualInstrumentContext);
}

export function VirtualInstrumentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [pressedNotes, setPressedNotes] = useState<Note[]>([]);

  const audioTags = useMemo(() => {
    return allNotes.map((note) => {
      const closestAvailableNoteKey = getClosestNote(
        note,
        Object.keys(availableNotes) as Note[]
      );

      return (
        <audio
          id={`__audio_${note}`}
          ref={(audio) => {
            if (!audio) {
              return;
            }

            if (!closestAvailableNoteKey) {
              return;
            }

            const closestAvailableNote =
              availableNotes[closestAvailableNoteKey];

            if (!closestAvailableNote) {
              return;
            }

            const distanceWithClosestAvailableNote = getNoteDistanceAsSemitones(
              closestAvailableNoteKey,
              note
            );

            audio.playbackRate = Math.pow(
              2,
              distanceWithClosestAvailableNote / 12
            );
            audio.preservesPitch = false;
          }}
          key={note}
          src={`/assets/sounds/rhodes/${closestAvailableNoteKey}.wav`}
        />
      );
    });
  }, []);

  const playNote = (note: Note, velocity: number) => {
    const audio = document.getElementById(
      `__audio_${note}`
    ) as HTMLAudioElement;

    if (!audio) {
      return;
    }

    // Store pressed notes
    setPressedNotes((previous) => [...previous, note]);

    // Play note
    audio.currentTime = 0;
    audio.volume = velocity;
    audio.play();
  };

  const stopNote = (note: Note) => {
    const audio = document.getElementById(
      `__audio_${note}`
    ) as HTMLAudioElement;

    if (!audio) {
      return;
    }

    // Remove note from pressed notes
    setPressedNotes((previous) => previous.filter((n) => n !== note));

    // Fade out sound for 10s
    const initialVolume = audio.volume;
    const fadeOutInterval = setInterval(() => {
      audio.volume = Math.max(0, audio.volume - initialVolume / 10);
    }, 10);

    setTimeout(() => {
      clearInterval(fadeOutInterval);
      audio.pause();
      audio.currentTime = 0;
      audio.volume = initialVolume;
    }, 100);
  };

  const virtualInstrument = {
    pressedNotes,
    playNote,
    stopNote,
  };

  return (
    <VirtualInstrumentContext.Provider value={virtualInstrument}>
      {audioTags}
      {children}
    </VirtualInstrumentContext.Provider>
  );
}
