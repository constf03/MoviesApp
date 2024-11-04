import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MovieListScreen from './components/MovieListScreen';
import MovieDetailScreen from './components/MovieDetailsScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MoviesList"
          component={MovieListScreen}
          options={{title: 'MovieList'}}
        />
        <Stack.Screen
          name="MovieDetails"
          component={MovieDetailScreen}
          options={{title: 'MovieDetails'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
