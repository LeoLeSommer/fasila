import { ImageStyle, TextStyle, ViewStyle } from "react-native";
import {
  MD3DarkTheme as DefaultTheme,
  ThemeBase,
  useTheme,
} from "react-native-paper";

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    myOwnColor: "#BADA55",
  },
  breakpoints: {
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  },
};

export type AppTheme = typeof theme & ThemeBase;

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

export namespace ThemeStyleSheet {
  export function create<T extends NamedStyles<T> | NamedStyles<any>>(
    styles: (theme: AppTheme) => T & NamedStyles<any>
  ): () => T {
    return () => {
      const theme = useTheme<AppTheme>();

      return styles(theme);
    };
  }
}

export default function useStyle<T extends NamedStyles<T>>(
  styles: (theme: AppTheme) => T
): T {
  const theme = useTheme<AppTheme>();
  return styles(theme);
}
