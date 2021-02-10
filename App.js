import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppNav from "./navigation/AppNavigation";
import { NavigationContainer } from '@react-navigation/native';


export default function App() {
  return (
      < NavigationContainer >
          <AppNav headerMode="none" headerShown="false" />
      </NavigationContainer >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
