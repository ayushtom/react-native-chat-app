import React, { useContext, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { AuthContext, AuthProvider } from './app/context/context';
import Main from './app/Screens/Main'


export default function App({ navigation }) {
  const context = useContext(AuthContext)

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        SecureStore.getItemAsync("userId").then(async (tokenval) => {

        })
      }
      catch (err) {
        console.log(err)
      }

    };
    checkLoggedIn();
  }, []);
  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  );
}