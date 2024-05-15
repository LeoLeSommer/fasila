import { useLocales } from "expo-localization";
import { locales, Locale } from "../locales";

export default function useLocale(): Locale {
  const { languageCode } = useLocales()[0];

  return (languageCode && locales[languageCode]) || locales.en;
}
