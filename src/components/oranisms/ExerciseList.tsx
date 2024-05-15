import { FlatList, ListRenderItem, View } from "react-native";
import ExerciseListItem from "../molecules/ExerciseListItem";

export type ExerciseListProps<T> = {
  data: T[];
  renderItem: ListRenderItem<T>;
  keyExtractor: (item: T) => string;
  titleExtractor: (item: T) => string;
};

export default function ExerciseList<T>({
  data,
  renderItem,
  keyExtractor,
  titleExtractor,
}: ExerciseListProps<T>) {
  return (
    <FlatList
      data={data}
      renderItem={(props) => (
        <ExerciseListItem title={titleExtractor(props.item)}>
          {renderItem(props)}
        </ExerciseListItem>
      )}
      keyExtractor={keyExtractor}
    />
  );
}
