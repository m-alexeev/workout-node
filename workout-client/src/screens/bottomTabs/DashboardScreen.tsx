import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type {CompositeScreenProps} from "@react-navigation/native";
import type {NativeStackScreenProps} from "@react-navigation/native-stack"
import { DashboardStackParamList, MainTabParamList } from "../../types/navigation";
import React, { FC } from "react";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native";

type DashboardScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, "Dashboard">,
  NativeStackScreenProps<DashboardStackParamList>
>;

const DashboardScreen: FC<DashboardScreenProps> = ({navigation}) => {
  return (
    <SafeAreaView>   
      <Text>Dashboard</Text>
    </SafeAreaView>
  );
};

export default DashboardScreen;