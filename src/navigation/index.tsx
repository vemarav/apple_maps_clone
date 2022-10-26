import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Routes from './routes';
import Locations from '../screens/locations';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <>
      {/* <StatusBar /> */}
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={Routes.askApi}
            component={Locations}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export { Routes, Navigation };
export default Navigation;
