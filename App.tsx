/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useRef} from 'react';
import {AppState} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {HomeScreen} from './src/screens/Home';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DetailsScreen} from './src/screens/Details';
import {UserScreen} from './src/screens/User';
import {IterableListener} from './src/listeners/IterableListener';
import {Iterable} from '@iterable/react-native-sdk';

const Stack = createNativeStackNavigator();

const linking = {
  prefixes: ['https://*.test.com'],
  config: {
    screens: {
      Home: 'home',
      Details: 'details',
      User: 'user',
    },
  },
};

const Navigation = () => {
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        Iterable.getLastPushPayload().then(res => {
          console.log('getLastPushPayload', res);
        });
      }

      appState.current = nextAppState;
      console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="User" component={UserScreen} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <>
      <NavigationContainer linking={linking}>
        <Navigation />
      </NavigationContainer>
      <IterableListener />
    </>
  );
};

export default App;
