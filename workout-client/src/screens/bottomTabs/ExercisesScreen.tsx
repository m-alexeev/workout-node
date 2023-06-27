import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type {CompositeScreenProps} from "@react-navigation/native";
import type {NativeStackScreenProps} from "@react-navigation/native-stack"
import { ExerciseStackParamList, MainTabParamList } from "../../types/navigation";
import React, { FC } from "react";
import { Text } from "react-native-paper";
import { SafeAreaView, StyleSheet } from "react-native";
import { useTheme } from "../../contexts/theme";

type ExerciseScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, "Exercises">,
  NativeStackScreenProps<ExerciseStackParamList>
>;

const ExerciseScreen: FC<ExerciseScreenProps> = ({navigation}) => {
  const {theme} = useTheme();

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.background}]}>   
      <Text>Exercises</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default ExerciseScreen;