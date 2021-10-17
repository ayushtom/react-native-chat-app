import React, { useState, useReducer, useMemo } from 'react';
import * as SecureStore from 'expo-secure-store';
import Loading from '../Screens/Loading';
import authScreen from '../Screens/authScreen';
import ChatsList from '../Screens/ChatsList';

const AuthContext = React.createContext();

export default function App({ navigation }) {
    const [state, dispatch] = useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userToken: action.token,
                        isLoading: false,
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: action.token,
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignout: true,
                        userToken: null,
                    };
            }
        },
        {
            isLoading: true,
            isSignout: false,
            userToken: null,
        }
    );

    useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            let userToken;

            try {
                userToken = await SecureStore.getItemAsync('userToken');
            } catch (err) {
                // Restoring token failed
                console.log(err);
            }
            // After restoring token, we may need to validate it in production apps
            if (!tokenval || tokenval == '' || jwt_decode(tokenval).exp < Date.now() / 1000) {
                console.log("Expired token reset")
                SecureStore.setItemAsync('userToken', '');

            }
            else {
                dispatch({ type: 'RESTORE_TOKEN', token: userToken });
            }

        };

        bootstrapAsync();
    }, []);

    const authContext = useMemo(
        () => ({
            signIn: async data => {
                var passedToken;
                fetch('http://localhost:5000/user/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                    .then((response) =>
                        response.json()
                    )
                    .then((res) => {
                        passedToken = res.jwt
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                // In a production app, we need to send some data (usually username, password) to server and get a token
                // We will also need to handle errors if sign in failed
                // After getting token, we need to persist the token using `SecureStore`
                // In the example, we'll use a dummy token

                dispatch({ type: 'SIGN_IN', token: passedToken });
            },
            signOut: () => dispatch({ type: 'SIGN_OUT' }),
            signUp: async data => {
                var passedToken;
                // In a production app, we need to send user data to server and get a token
                // We will also need to handle errors if sign up failed
                // After getting token, we need to persist the token using `SecureStore`
                // In the example, we'll use a dummy token
                fetch('http://localhost:5000/user/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                    .then((response) =>
                        response.json()
                    )
                    .then((res) => {
                        passedToken = res.jwt
                    })
                    .catch((err) => {
                        console.log(err)
                    })

                dispatch({ type: 'SIGN_IN', token: passedToken });
            },
        }),
        []
    );

    return (
        <AuthContext.Provider value={authContext}>
            <Stack.Navigator>
                {state.isLoading ? (
                    // We haven't finished checking for the token yet
                    <Stack.Screen name="Splash" component={Loading} />
                ) : state.userToken == null ? (
                    // No token found, user isn't signed in
                    <Stack.Screen
                        name="authScreen"
                        component={authScreen}

                    />
                ) : (
                    // User is signed in
                    <Stack.Screen name="Chats" component={ChatsList} />
                )}
            </Stack.Navigator>
        </AuthContext.Provider>
    );
}