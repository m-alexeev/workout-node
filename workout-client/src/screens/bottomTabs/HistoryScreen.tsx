import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type {CompositeScreenProps} from "@react-navigation/native";
import type {NativeStackScreenProps} from "@react-navigation/native-stack"
import { MainTabParamList, HistoryStackParamList } from "../../types/navigation";
import React, { FC } from "react";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native";

type HistoryScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, "History">,
  NativeStackScreenProps<HistoryStackParamList>
>;

const HistoryScreen: FC<HistoryScreenProps> = ({navigation}) => {
  return (
    <SafeAreaView>   
      <Text>History</Text>
    </SafeAreaView>
  );
};

export default HistoryScreen;