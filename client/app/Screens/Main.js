import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//screens
import authScreen from './authScreen';
import ChatsList from './ChatsList';
import Login from './Login';
import Register from './Register';
import EachChatScreen from './EachChatScreen';
import ContactsList from './ContactsList';

import { AuthContext } from '../context/context';


const Stack = createStackNavigator();

export default function Main({ navigation }) {
    const context = useContext(AuthContext)
    return (
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
                    <>
                        <Stack.Screen name="Chats" component={ChatsList} />
                        <Stack.Screen name="Each Chat" component={EachChatScreen} />
                        <Stack.Screen name="Contacts" component={ContactsList} />

                    </>

                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}