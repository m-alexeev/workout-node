import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { bodyPartType, equipmentType } from "../../types/exercises";
import { List } from "react-native-paper";

export interface exerciseListItemProps {
  name: string;
  imgSrc?: string;
  bodyPart?: bodyPartType;
  equipment?: equipmentType;
}

// using class component to make use of Pure Components
class ExerciseListItem extends React.PureComponent<exerciseListItemProps> {
  render(): React.ReactNode {
    const { name, imgSrc, bodyPart, equipment } = this.props;

    return <List.Item title={name} />;
  }
}

export default ExerciseListItem;

const styles = StyleSheet.create({});
