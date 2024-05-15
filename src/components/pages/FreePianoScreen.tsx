import { detectChord } from "../../utils/music";
import { Text } from "react-native-paper";
import PianoScreenTemplate from "../templates/PianoScreenTemplate";
import CircleOfFifth from "../molecules/CircleOfFifth";
import useVirtualInstrument from "../../hooks/useVirtualInstrument";

export default function FreePianoScreen() {
  const { pressedNotes } = useVirtualInstrument();

  return (
    <PianoScreenTemplate>
      <CircleOfFifth>
        <Text variant="displayLarge">{detectChord(pressedNotes)}</Text>
      </CircleOfFifth>
    </PianoScreenTemplate>
  );
}
