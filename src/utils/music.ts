import { detect } from "@tonaljs/chord-detect";

export type NoteWithoutOctave =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "Ab"
  | "Bb"
  | "Db"
  | "Eb"
  | "Gb";

export type Note =
  | "A-1"
  | "Bb-1"
  | "B-1"
  | "C0"
  | "Db0"
  | "D0"
  | "Eb0"
  | "E0"
  | "F0"
  | "Gb0"
  | "G0"
  | "Ab0"
  | "A0"
  | "Bb0"
  | "B0"
  | "C1"
  | "Db1"
  | "D1"
  | "Eb1"
  | "E1"
  | "F1"
  | "Gb1"
  | "G1"
  | "Ab1"
  | "A1"
  | "Bb1"
  | "B1"
  | "C2"
  | "Db2"
  | "D2"
  | "Eb2"
  | "E2"
  | "F2"
  | "Gb2"
  | "G2"
  | "Ab2"
  | "A2"
  | "Bb2"
  | "B2"
  | "C3"
  | "Db3"
  | "D3"
  | "Eb3"
  | "E3"
  | "F3"
  | "Gb3"
  | "G3"
  | "Ab3"
  | "A3"
  | "Bb3"
  | "B3"
  | "C4"
  | "Db4"
  | "D4"
  | "Eb4"
  | "E4"
  | "F4"
  | "Gb4"
  | "G4"
  | "Ab4"
  | "A4"
  | "Bb4"
  | "B4"
  | "C5"
  | "Db5"
  | "D5"
  | "Eb5"
  | "E5"
  | "F5"
  | "Gb5"
  | "G5"
  | "Ab5"
  | "A5"
  | "Bb5"
  | "B5"
  | "C6"
  | "Db6"
  | "D6"
  | "Eb6"
  | "E6"
  | "F6"
  | "Gb6"
  | "G6"
  | "Ab6"
  | "A6"
  | "Bb6"
  | "B6"
  | "C7";

export const allNotesWithoutOctave: NoteWithoutOctave[] = [
  "A",
  "Bb",
  "B",
  "C",
  "Db",
  "D",
  "Eb",
  "E",
  "F",
  "Gb",
  "G",
  "Ab",
];

export const allNotes: Note[] = [
  "A-1",
  "Bb-1",
  "B-1",
  "C0",
  "Db0",
  "D0",
  "Eb0",
  "E0",
  "F0",
  "Gb0",
  "G0",
  "Ab0",
  "A0",
  "Bb0",
  "B0",
  "C1",
  "Db1",
  "D1",
  "Eb1",
  "E1",
  "F1",
  "Gb1",
  "G1",
  "Ab1",
  "A1",
  "Bb1",
  "B1",
  "C2",
  "Db2",
  "D2",
  "Eb2",
  "E2",
  "F2",
  "Gb2",
  "G2",
  "Ab2",
  "A2",
  "Bb2",
  "B2",
  "C3",
  "Db3",
  "D3",
  "Eb3",
  "E3",
  "F3",
  "Gb3",
  "G3",
  "Ab3",
  "A3",
  "Bb3",
  "B3",
  "C4",
  "Db4",
  "D4",
  "Eb4",
  "E4",
  "F4",
  "Gb4",
  "G4",
  "Ab4",
  "A4",
  "Bb4",
  "B4",
  "C5",
  "Db5",
  "D5",
  "Eb5",
  "E5",
  "F5",
  "Gb5",
  "G5",
  "Ab5",
  "A5",
  "Bb5",
  "B5",
  "C6",
  "Db6",
  "D6",
  "Eb6",
  "E6",
  "F6",
  "Gb6",
  "G6",
  "Ab6",
  "A6",
  "Bb6",
  "B6",
  "C7",
];

export type Interval = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export const allIntervals: Interval[] = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
];

export function detectChord(notes: Note[]): string | null {
  if (notes.length === 0) {
    return null;
  }

  if (notes.length === 1) {
    return notes[0].replace(/\d/g, "").replace("-", "");
  }

  if (notes.length === 2) {
    const note1 = noteWithoutOctave(notes[0]);
    const note2 = noteWithoutOctave(notes[1]);

    return `${note1} + ${note2}`;
  }

  const result = detect(notes);
  return result.length === 0 ? null : result[0];
}

export function getNoteDistanceAsSemitones(note1: Note, note2: Note): number {
  const note1Index = noteToIndex(note1);
  const note2Index = noteToIndex(note2);
  return note2Index - note1Index;
}

export function getClosestNote(
  targetNote: Note,
  availabledNotes: Note[]
): Note | null {
  let closestNote: Note | null = null;
  let minDistance = Infinity;

  for (const note of availabledNotes) {
    const distance = getNoteDistanceAsSemitones(targetNote, note);
    if (Math.abs(distance) < Math.abs(minDistance)) {
      minDistance = distance;
      closestNote = note;
    }
  }

  return closestNote;
}

export function midiNoteCodeToNoteName(noteCode: number): Note | null {
  if (noteCode < 21 || noteCode > 108) {
    return null;
  }

  return allNotes[noteCode - 21];
}

export function noteWithoutOctave(note: Note): NoteWithoutOctave {
  return note.replace(/\d/g, "").replace("-", "") as NoteWithoutOctave;
}

function noteToIndex(note: Note): number {
  return allNotes.indexOf(note);
}

export function noteToColor(note: NoteWithoutOctave) {
  switch (note) {
    case "C":
      return "#FF0000";
    case "G":
      return "#FFA500";
    case "D":
      return "#FFFF00";
    case "A":
      return "#DFFF00";
    case "E":
      return "#00FF00";
    case "B":
      return "#00FFBF";
    case "Gb":
      return "#00FFFF";
    case "Db":
      return "#007FFF";
    case "Ab":
      return "#0000FF";
    case "Eb":
      return "#8B00FF";
    case "Bb":
      return "#FF00FF";
    case "F":
      return "#FF007F";
  }
}
