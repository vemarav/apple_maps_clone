import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import tw from 'twrnc';

import Navigation from './navigation';
import store from './store';

const component = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={tw`flex-1`}>
        <Navigation />
      </GestureHandlerRootView>
    </Provider>
  );
};

export default component;
