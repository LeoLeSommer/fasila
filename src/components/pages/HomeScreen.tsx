import { useNavigation } from "@react-navigation/native";
import useLocale from "../../hooks/useLocale";
import IconTextButton from "../atoms/IconTextButton";
import Table, { Cell, Row } from "../atoms/Table";
import SimplePageTemplate from "../templates/SimplePageTemplate";
import { SignInNavigationProps } from ".";

export default function HomeScreen() {
  const locale = useLocale();
  const navigation = useNavigation<SignInNavigationProps>();

  return (
    <SimplePageTemplate>
      <Table>
        <Row>
          <Cell>
            <IconTextButton
              icon="arrow-left-right"
              text={locale.intervals}
              onPress={() => navigation.navigate("Intervals")}
            />
          </Cell>
          <Cell>
            <IconTextButton
              icon="music-note"
              text={locale.scale_degrees}
              disabled
              onPress={() => {}}
            />
          </Cell>
        </Row>
        <Row>
          <Cell>
            <IconTextButton
              icon="palette"
              text={locale.chords}
              disabled
              onPress={() => {}}
            />
          </Cell>
          <Cell>
            <IconTextButton
              icon="stairs"
              text={locale.scales}
              disabled
              onPress={() => {}}
            />
          </Cell>
        </Row>
        <Row>
          <Cell>
            <IconTextButton
              icon="stairs-up"
              text={locale.transposition}
              disabled
              onPress={() => {}}
            />
          </Cell>
          <Cell>
            <IconTextButton
              icon="music"
              text={locale.transcription}
              disabled
              onPress={() => {}}
            />
          </Cell>
        </Row>
        <Row>
          <Cell>
            <IconTextButton
              icon="brush"
              text={locale.improvisation}
              disabled
              onPress={() => {}}
            />
          </Cell>
          <Cell>
            <IconTextButton
              icon="piano"
              text={locale.free_piano}
              onPress={() => navigation.navigate("FreePiano")}
            />
          </Cell>
        </Row>
      </Table>
    </SimplePageTemplate>
  );
}
