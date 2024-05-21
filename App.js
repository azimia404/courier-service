import React from 'react';
import { persistor, store } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import NavigationProvider from "./src/navigation";
import { StatusBar } from 'react-native';

import { Provider } from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <NavigationProvider />
        <StatusBar style="dark"/>
      </PersistGate>
    </Provider>
  );
};

export default App;