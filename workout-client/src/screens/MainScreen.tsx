import { Text, View } from 'react-native'
import React from 'react'
import { useAuth } from '../contexts/auth'
import { Button, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const MainScreen = () => {
  const theme = useTheme();
  return (
    <SafeAreaView style={{backgroundColor: theme.colors.background}}>
      <Text>MainScreen</Text>
    </SafeAreaView>
  )
}

export default MainScreen
