import { StyleSheet, View } from 'react-native'
import React, { FC } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthStackParamList } from '../../../types/navigation';
import { Button, Text, useTheme } from 'react-native-paper';

type RegisterSuccessProps = NativeStackScreenProps<AuthStackParamList, "Success">;

const RegistrationSuccess: FC<RegisterSuccessProps> = ({navigation}) => {
  const theme = useTheme();
  return (
    <SafeAreaView style={{backgroundColor: theme.colors.background}}>
      <Text>Registration Successful!</Text>
      <Button onPress={() => navigation.replace("Login")}>Login</Button>
    </SafeAreaView>
  )
}

export default RegistrationSuccess

const styles = StyleSheet.create({})