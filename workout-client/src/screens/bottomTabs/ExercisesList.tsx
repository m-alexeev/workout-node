import type { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs"
import type { CompositeScreenProps } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  ExerciseStackParamList,
  ExerciseTabParamList,
} from "../../types/navigation";
import React, { FC, useEffect, useState } from "react";
import { List, Text } from "react-native-paper";
import { SafeAreaView, StyleSheet, FlatList } from "react-native";
import { useTheme } from "../../contexts/theme";
import { exerciseType } from "../../types/exercises";
import { useFilters } from "../../contexts/filter";
import ExerciseListItem from "../../components/exercises/exerciseListItem";

type ExerciseScreenProps = CompositeScreenProps<
  NativeStackScreenProps<ExerciseStackParamList, "ExerciseList">,
  MaterialTopTabScreenProps<ExerciseTabParamList>
>;

// TODO: Apply filter to exercise list
// TODO: Add navigation to exercise page

const unfilteredExercises =
  require("../../../assets/data/exercises.json") as exerciseType[];

const ExerciseScreen: FC<ExerciseScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const [filteredExercises, setFilteredExercises] = useState<exerciseType[]>(unfilteredExercises);
  const { filters } = useFilters();

  useEffect(() => {}, [filters]);

  const handlePress = (id: string ) => {
    navigation.navigate("Exercise", {exerciseID: id});
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <List.Section>
        <List.Subheader>Exercises</List.Subheader>
        <FlatList
          data={filteredExercises}
          keyExtractor={(item) => item.id}
          initialNumToRender={10}
          renderItem={({ item }) => <ExerciseListItem {...item} handlePress={handlePress} />}
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
