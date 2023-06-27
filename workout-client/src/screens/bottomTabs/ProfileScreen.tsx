import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type {CompositeScreenProps} from "@react-navigation/native";
import type {NativeStackScreenProps} from "@react-navigation/native-stack"
import { MainTabParamList, ProfileStackParamList } from "../../types/navigation";
import React, { FC } from "react";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native";

type ProfileScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, "Profile">,
  NativeStackScreenProps<ProfileStackParamList>
>;

const ProfileScreen: FC<ProfileScreenProps> = ({navigation}) => {
  return (
    <SafeAreaView>   
      <Text>Profile</Text>
    </SafeAreaView>
  );
};

export default ProfileScreen;