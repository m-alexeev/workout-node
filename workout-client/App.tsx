import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import { MaterialDarkTheme } from './src/theme/colors';

export default function App() {
  return (
      <PaperProvider theme={MaterialDarkTheme}>
      </PaperProvider>
  );
}