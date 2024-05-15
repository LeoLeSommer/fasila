import en from "./en";
import fr from "./fr";

export type Locale = {
  fasila: string;
  intervals: string;
  scale_degrees: string;
  chords: string;
  scales: string;
  transposition: string;
  transcription: string;
  improvisation: string;
  free_piano: string;
  recognition: string;
  knowledge: string;
  full: string;
  all_until_now: string;
  ascending: string;
  descending: string;
  ascending_descending: string;
  harmonic: string;
  random: string;
  interval_exercises: {
    x_intervals: string;
    fourths_fifths: string;
    fourths_fifths_octaves: string;
    second_major_minor: string;
    third_major_minor_tritone: string;
    sixth_major_minor: string;
    seventh_major_minor: string;
  };
};

export type Locales = {
  [key: string]: Locale;
};

export const locales: Locales = {
  en,
  fr,
};
