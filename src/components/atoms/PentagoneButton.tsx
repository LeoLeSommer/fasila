import { TouchableOpacity, ViewStyle } from "react-native";
import Svg, { Path, Text } from "react-native-svg";
import useTheme from "../../hooks/useTheme";

export type PentagoneButtonProps = {
  label: string;
  style?: ViewStyle;
  position: "top" | "bottom";
  disabled?: boolean;
  width: number;
  onPress?: () => void;
};

export default function PentagoneButton({
  label,
  style,
  position,
  disabled,
  width,
  onPress,
}: PentagoneButtonProps) {
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={style}
      disabled={disabled || !onPress}
      onPress={onPress}
    >
      {position === "top" ? (
        <Svg width={width} height={width * 1.5} viewBox="0 0 100 150">
          <Path
            d="M0 0 L100 0 L100 100 L50 150 L0 100 L0 50 Z"
            fill={
              disabled
                ? theme.colors.surfaceDisabled
                : theme.colors.primaryContainer
            }
            stroke={theme.colors.background}
            strokeWidth={4}
          />
          <Text x="50" y="75" textAnchor="middle" fontSize="40" fill="white">
            {label}
          </Text>
        </Svg>
      ) : (
        <Svg width={width} height={width * 1.5} viewBox="0 0 100 150">
          <Path
            d="M0 150 L100 150 L100 50 L50 0 L0 50 L0 100 Z"
            fill={
              disabled
                ? theme.colors.surfaceDisabled
                : theme.colors.primaryContainer
            }
            stroke={theme.colors.background}
            strokeWidth={4}
          />
          <Text x="50" y="100" textAnchor="middle" fontSize="40" fill="white">
            {label}
          </Text>
        </Svg>
      )}
    </TouchableOpacity>
  );
}
