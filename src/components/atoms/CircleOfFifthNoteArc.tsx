import { Path } from "react-native-svg";
import { NoteWithoutOctave, noteToColor } from "../../utils/music";

const DEG_TO_RAD = 0.017453292519943295769236907684886;

export type CircleOfFifthNoteArcProps = {
  note: NoteWithoutOctave;
  circleSize: number;
  pressed?: boolean;
};

export default function CircleOfFifthNoteArc({
  note,
  circleSize,
  pressed,
}: CircleOfFifthNoteArcProps) {
  const containerCircleRadius = circleSize / 2;
  const fullCircleRadius = pressed
    ? containerCircleRadius + 40
    : containerCircleRadius + 5;
  const color = noteToColor(note);

  let arcCenterDegree = 0;
  switch (note) {
    case "C":
      arcCenterDegree = 90;
      break;
    case "G":
      arcCenterDegree = 120;
      break;
    case "D":
      arcCenterDegree = 150;
      break;
    case "A":
      arcCenterDegree = 180;
      break;
    case "E":
      arcCenterDegree = 210;
      break;
    case "B":
      arcCenterDegree = 240;
      break;
    case "Gb":
      arcCenterDegree = 270;
      break;
    case "Db":
      arcCenterDegree = 300;
      break;
    case "Ab":
      arcCenterDegree = 330;
      break;
    case "Eb":
      arcCenterDegree = 0;
      break;
    case "Bb":
      arcCenterDegree = 30;
      break;
    case "F":
      arcCenterDegree = 60;
      break;
  }

  arcCenterDegree = arcCenterDegree + 180;

  const arcStartDegree = arcCenterDegree - 14;
  const arcEndDegree = arcCenterDegree + 14;

  const center = {
    x: circleSize / 2 + 40,
    y: circleSize / 2 + 40,
  };

  const startInside = {
    x: center.x + containerCircleRadius * Math.cos(arcStartDegree * DEG_TO_RAD),
    y: center.y + containerCircleRadius * Math.sin(arcStartDegree * DEG_TO_RAD),
  };

  const endInside = {
    x: center.x + containerCircleRadius * Math.cos(arcEndDegree * DEG_TO_RAD),
    y: center.y + containerCircleRadius * Math.sin(arcEndDegree * DEG_TO_RAD),
  };

  const startOutside = {
    x: center.x + fullCircleRadius * Math.cos(arcStartDegree * DEG_TO_RAD),
    y: center.y + fullCircleRadius * Math.sin(arcStartDegree * DEG_TO_RAD),
  };

  const endOutside = {
    x: center.x + fullCircleRadius * Math.cos(arcEndDegree * DEG_TO_RAD),
    y: center.y + fullCircleRadius * Math.sin(arcEndDegree * DEG_TO_RAD),
  };

  return (
    <Path
      d={`M ${startInside.x} ${startInside.y} A ${containerCircleRadius} ${containerCircleRadius} 0 0 1 ${endInside.x} ${endInside.y} L ${endOutside.x} ${endOutside.y} A ${fullCircleRadius} ${fullCircleRadius} 0 0 0 ${startOutside.x} ${startOutside.y} Z`}
      fill={color}
    />
  );
}
