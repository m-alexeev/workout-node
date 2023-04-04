import { Text, View } from 'react-native'
import React from 'react'
import { useAuth } from '../contexts/auth'
import { Button, useTheme } from 'react-native-paper';

const MainScreen = () => {
  const theme = useTheme();
  const {onLogout} = useAuth();
  return (
    <View style={{backgroundColor: theme.colors.background}}>
      <Text>MainScreen</Text>
      <Button onPress={() => onLogout!()}>Logout</Button>
    </View>
  )
}

export default MainScreen
