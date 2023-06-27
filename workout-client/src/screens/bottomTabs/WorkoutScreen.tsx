import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type {CompositeScreenProps} from "@react-navigation/native";
import type {NativeStackScreenProps} from "@react-navigation/native-stack"
import { MainTabParamList, WorkoutStackParamList } from "../../types/navigation";
import React, { FC } from "react";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native";

type WorkoutScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, "Workout">,
  NativeStackScreenProps<WorkoutStackParamList>
>;

const WorkoutScreen: FC<WorkoutScreenProps> = ({navigation}) => {
  return (
    <SafeAreaView>   
      <Text>History</Text>
    </SafeAreaView>
  );
};

export default WorkoutScreen;