import React from 'react';
import {StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Screens/Home';
import GlobalContextProvider from './Contexts/GlobalContext';
import Results from './Screens/Results';
import AuthContextProvider from './Contexts/useAuthContext';
import Login from './Screens/Login';
import SignUp from './Screens/SignUp';
import WatchLater from './Screens/WatchLater';
import Recipe from './Screens/Recipe';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <AuthContextProvider>
      <GlobalContextProvider>
        <View style={styles.appContainer}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{headerShown: false}}
              initialRouteName="Home">
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Results" component={Results} />
              <Stack.Screen name="Recipe" component={Recipe} />
              <Stack.Screen name="WatchLater" component={WatchLater} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="SignUp" component={SignUp} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </GlobalContextProvider>
    </AuthContextProvider>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
});

export default App;
