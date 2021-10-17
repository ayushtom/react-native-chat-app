import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SecureStore from 'expo-secure-store';

//screens
import authScreen from './app/Screens/authScreen';
import ChatsList from './app/Screens/ChatsList';
import Login from './app/Screens/Login';
import Register from './app/Screens/Register';

import { AuthContext, AuthProvider } from './app/context/context';
import Loading from './app/Screens/Loading';


const Stack = createStackNavigator();

export default function App({ navigation }) {
  const context = useContext(AuthContext)

  useEffect(() => {
    const checkLoggedIn = async () => {
      let tokenval;
      try {
        tokenval = await SecureStore.getItemAsync("userId");
      }
      catch (err) {
        console.log(err)
      }
      if (tokenval === null) {
        await SecureStore.setItemAsync('userId', '');
        tokenval = '';
      }
      else {
        let exp = await SecureStore.setItemAsync('userId', '');
        context.login(exp, tokenval)
      }
    };
    checkLoggedIn();
  }, []);
  console.log(context.userId)
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>

          {context.userId == null ? (
            // No token found, user isn't signed in
            <>
              <Stack.Screen
                name="Login/Register"
                component={authScreen}

              />
              <Stack.Screen
                name="Login"
                component={Login}
              />
              <Stack.Screen
                name="Register"
                component={Register}
              />
            </>
          ) : (
            // User is signed in
            <Stack.Screen name="Home" component={ChatsList} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}