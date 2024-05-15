import { StyleSheet } from "react-native";
import { Icon, Text, TouchableRipple } from "react-native-paper";
import { ThemeStyleSheet } from "../../hooks/useStyle";

export type IconTextButtonProps = {
  icon: string;
  text: string;
  disabled?: boolean;
  onPress: () => void;
};

export default function IconTextButton({
  icon,
  text,
  disabled,
  onPress,
}: IconTextButtonProps) {
  const styles = useStyles();

  return (
    <TouchableRipple
      style={styles.container}
      onPress={onPress}
      disabled={disabled}
    >
      <>
        <Icon
          source={icon}
          size={40}
          color={disabled ? styles.disabledText.color : undefined}
        />
        <Text style={disabled ? styles.disabledText : undefined}>{text}</Text>
      </>
    </TouchableRipple>
  );
}

const useStyles = ThemeStyleSheet.create((theme) => ({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  disabledText: {
    color: theme.colors.onSurfaceDisabled,
  },
}));
