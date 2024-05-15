import { useTheme as usePaperTheme } from "react-native-paper";
import { AppTheme } from "./useStyle";

export default function useTheme() {
  return usePaperTheme<AppTheme>();
}
