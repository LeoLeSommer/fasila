import React from "react";
import {
  createMaterialBottomTabNavigator,
  MaterialBottomTabNavigationProp,
} from "react-native-paper/react-navigation";
import IntervalsEaringScreen from "./IntervalsEaringScreen";
import IntervalsFullScreen from "./IntervalsFullScreen";
import IntervalsKnowledgeScreen from "./IntervalsKnowledgeScreen";
import useLocale from "../../../hooks/useLocale";

export type RootStackParamList = {
  Earing: undefined;
  Knowledge: undefined;
  Full: undefined;
};

export type SignInNavigationProps =
  MaterialBottomTabNavigationProp<RootStackParamList>;

const Tab = createMaterialBottomTabNavigator();

export default function IntervalsScreen() {
  const locale = useLocale();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Earing"
        options={{
          tabBarLabel: locale.recognition,
          tabBarIcon: "ear-hearing",
        }}
        component={IntervalsEaringScreen}
      />
      <Tab.Screen
        name="Knowledge"
        options={{
          tabBarLabel: locale.knowledge,
          tabBarIcon: "music-clef-treble",
        }}
        component={IntervalsKnowledgeScreen}
      />
      <Tab.Screen
        name="Full"
        options={{
          tabBarLabel: locale.full,
          tabBarIcon: "crown",
        }}
        component={IntervalsFullScreen}
      />
    </Tab.Navigator>
  );
}
