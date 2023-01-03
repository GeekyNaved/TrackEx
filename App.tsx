/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { type PropsWithChildren } from 'react';
import {

  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Provider } from 'react-redux';
import store from './src/Redux/store';
import MainNavigation from './src/Router/Stack/MainStack';

const App = () => {


  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  );
};

export default App;
