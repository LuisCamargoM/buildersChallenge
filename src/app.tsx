import 'react-native-gesture-handler';

import React from 'react';

import { enableScreens } from 'react-native-screens';

import { Provider as StoreProvider } from 'react-redux';
import { store } from './store/configureStore';
import Navigation from './navigation';

enableScreens();

const App = () => {
  return (
    <>
      <StoreProvider store={store}>
        <Navigation />
      </StoreProvider>
    </>
  );
};

export default App;
