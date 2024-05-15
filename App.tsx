import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as Linking from "expo-linking";
import { VirtualInstrumentProvider } from "./src/hooks/useVirtualInstrument";
import { MidiKeyboardProvider } from "./src/hooks/useMidiKeyboard";
import { theme } from "./src/hooks/useStyle";
import RootPage from "./src/components/pages";

const prefix = Linking.createURL("/");

export default function App() {
  const linking = {
    prefixes: [prefix],
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer linking={linking}>
        <MidiKeyboardProvider>
          <VirtualInstrumentProvider>
            <PaperProvider theme={theme}>
              <RootPage />
            </PaperProvider>
          </VirtualInstrumentProvider>
        </MidiKeyboardProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
