/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useCallback, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import HomePage from './app/screens/HomePage';
import NotesView from './app/screens/NotesView';
import StorageProvider from './app/context/StorageContext';

const Stack = createStackNavigator();
function App() {
 

  return (
    <StorageProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            gestureEnabled:true,
            gestureDirection:"horizontal",
          }}>
          <Stack.Screen name="home" component={HomePage} />
          <Stack.Screen name="notesview" component={NotesView} />
        </Stack.Navigator>
      </NavigationContainer>
    </StorageProvider>
  );
}



export default App;
