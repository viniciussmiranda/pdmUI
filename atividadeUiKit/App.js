import React from 'react';
import { PaperProvider, MD3LightTheme, Appbar } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ProfileScreen from './src/screens/ProfileScreen';

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#81a7aa',
    onPrimary: '#FFFFFF',
    primaryContainer: '#ddeef0',
    onPrimaryContainer: '#1a3a3d',
    secondary: '#5f8689',
    onSecondary: '#FFFFFF',
    secondaryContainer: '#cde5e8',
    onSecondaryContainer: '#1a3a3d',
    background: '#FFFBFE',
    surface: '#FFFBFE',
    surfaceVariant: '#ddeef0',
    onSurfaceVariant: '#3d6164',
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <StatusBar style="auto" />
        <Appbar.Header elevated>
          <Appbar.Content title="Meu Perfil" titleStyle={{ fontWeight: '700' }} />
          <Appbar.Action icon="dots-vertical" onPress={() => {}} />
        </Appbar.Header>
        <ProfileScreen />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
