import { Text, View } from 'react-native'
import React from 'react'
import { useAuth } from '../contexts/auth'
import { Button, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SecureStore from 'expo-secure-store';

const MainScreen = () => {
  const theme = useTheme();
  const {ResetUserTemp} = useAuth();
  
  return (
    <SafeAreaView style={{backgroundColor: theme.colors.background}}>
      <Text>MainScreen</Text>
      <Button onPress={() => ResetUserTemp!()}>Delete user</Button>
    </SafeAreaView>
  )
}

export default MainScreen
