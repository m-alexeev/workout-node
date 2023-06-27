import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type {CompositeScreenProps} from "@react-navigation/native";
import type {NativeStackScreenProps} from "@react-navigation/native-stack"
import { ExerciseStackParamList, MainTabParamList } from "../../types/navigation";
import React, { FC } from "react";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native";

type ExerciseScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, "Exercises">,
  NativeStackScreenProps<ExerciseStackParamList>
>;

const ExerciseScreen: FC<ExerciseScreenProps> = ({navigation}) => {
  return (
    <SafeAreaView>   
      <Text>Exercises</Text>
    </SafeAreaView>
  );
};

export default ExerciseScreen;