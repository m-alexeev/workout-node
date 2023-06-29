import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { CompositeScreenProps } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  ExerciseStackParamList,
  MainTabParamList,
} from "../../types/navigation";
import React, { FC, useEffect, useState } from "react";
import { List, Text } from "react-native-paper";
import { SafeAreaView, StyleSheet, FlatList } from "react-native";
import { useTheme } from "../../contexts/theme";
import { exerciseType } from "../../types/exercises";
import { useFilters } from "../../contexts/filter";
import ExerciseListItem from "../../components/exercises/exerciseListItem";

type ExerciseScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, "Exercises">,
  NativeStackScreenProps<ExerciseStackParamList>
>;

// TODO: move exercise data to a ts file with image imports
// TODO: Apply filter to exercise list
// TODO: Add navigation to exercise page

const unfilteredExercises =
  require("../../../assets/data/exercises.json") as exerciseType[];

const ExerciseScreen: FC<ExerciseScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const [filteredExercises, setFilteredExercises] = useState<exerciseType[]>(unfilteredExercises);
  const { filters } = useFilters();

  useEffect(() => {}, [filters]);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <List.Section>
        <List.Subheader>Exercises</List.Subheader>
        <FlatList
          data={filteredExercises}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ExerciseListItem {...item} />}
        ></FlatList>
      </List.Section>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ExerciseScreen;
