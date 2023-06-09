import { StyleSheet, View, Image } from "react-native";
import React, { FC } from "react";
import { bodyPartType, equipmentType } from "../../types/exercises";
import { Avatar, Text, TouchableRipple } from "react-native-paper";
import { useTheme } from "../../contexts/theme";
import ExerciseImages from "../../resources/exercises";

export interface exerciseListItemProps {
  id: string;
  name: string;
  bodyPart: bodyPartType;
  handlePress: (id: string) => void;
}
const ExerciseListItem: FC<exerciseListItemProps> = ({
  name,
  id,
  bodyPart,
  handlePress,
}) => {
  const { theme } = useTheme();
  return (
    <TouchableRipple
      onPress={() => handlePress(id)}
      style={{ paddingVertical: 10, borderBottomWidth: 1 }}
    >
      <View style={[styles.container]}>
        <View style={styles.imageContainer}>
          <Avatar.Image
            style={styles.img}
            source={ExerciseImages.getExerciseImgById(id)}
          />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.bodyPart}>{bodyPart}</Text>
        </View>
      </View>
    </TouchableRipple>
  );
};

export default ExerciseListItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: 10,
  },
  contentContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "space-around",
  },
  imageContainer: {
    justifyContent: "center",
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  bodyPart: {
    opacity: 0.8,
  },
  img: {
    overflow: "hidden",
    borderRadius: 32,
  },
});
