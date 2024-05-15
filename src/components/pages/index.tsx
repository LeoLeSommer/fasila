import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import FreePianoScreen from "./FreePianoScreen";
import useLocale from "../../hooks/useLocale";
import Appbar from "../molecules/Appbar";
import IntervalsScreen from "./IntervalsScreen.tsx";

export type RootStackParamList = {
  Home: undefined;
  Intervals: undefined;
  FreePiano: undefined;
};

export type SignInNavigationProps =
  NativeStackNavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootPage() {
  const locale = useLocale();

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          header: (props) => <Appbar {...props} />,
        }}
      >
        <Stack.Screen
          name="Home"
          options={{
            title: locale.fasila,
          }}
          component={HomeScreen}
        />
        <Stack.Screen
          name="Intervals"
          options={{
            title: locale.intervals,
          }}
          component={IntervalsScreen}
        />
        <Stack.Screen
          name="FreePiano"
          options={{
            title: locale.free_piano,
          }}
          component={FreePianoScreen}
        />
      </Stack.Navigator>
    </>
  );
}
