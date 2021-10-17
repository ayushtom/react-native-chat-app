import React, { useReducer, createContext } from 'react';
import * as SecureStore from 'expo-secure-store';
import jwt_decode from "jwt-decode";

const initialState = {
    userId: null
};

const tokenCheck = async () => {
    var tokenExpiry;
    try {
        tokenExpiry = await SecureStore.getItemAsync('expiry')
    }
    catch (e) {
        console.log(e)
    }
    if (tokenExpiry !== '') {

        if (tokenExpiry * 1000 < Date.now()) {
            await SecureStore.setItemAsync('userId', '');
            await SecureStore.setItemAsync('expiry', '');

        } else {
            initialState.userId = await SecureStore.getItemAsync('userId');
        }
    }

}

tokenCheck()



const AuthContext = createContext({
    userId: initialState.userId,
    login: (userData) => { },
    logout: () => { },
});

function authReducer(state, action) {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                userId: action.payload.userId,
                isLoading: false
            };
        case 'LOGOUT':
            return {
                ...state,
                userId: null,
                isLoading: false
            };

        default:
            return state;
    }
}

function AuthProvider(props) {
    const [state, dispatch] = useReducer(authReducer, initialState);

    const login = async (userId, exp) => {
        await SecureStore.setItemAsync('userId', `${userId}`);
        await SecureStore.setItemAsync('expiry', `${exp}`);
        dispatch({
            type: 'LOGIN',
            payload: userId
        });

    }


    const logout = async () => {
        await SecureStore.setItemAsync('userId', '');
        await SecureStore.setItemAsync('expiry', '');

        dispatch({ type: 'LOGOUT' });
    }

    return (
        <AuthContext.Provider
            value={{ userId: state.user, login, logout }}
            {...props}
        />
    );
}

export { AuthContext, AuthProvider };