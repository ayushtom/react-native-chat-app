import React, { useState, useContext } from 'react'
import { View, Text, TextInput, StyleSheet, Button } from 'react-native'
import { AuthContext } from '../context/context'

export default function Login({ navigation }) {
    const context = useContext(AuthContext);

    const [userDetails, setUserDetails] = useState({
        password: '',
        email: ''
    })


    const handleChange = (event, name) => {
        event.persist()
        setUserDetails((prev) => ({
            ...prev,
            [name]: event.nativeEvent.text
        }))
    }

    const handleOnPress = () => {
        var passedToken;
        fetch('http://localhost:5000/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userDetails)
        })
            .then((response) =>
                response.json()
            )
            .then((res) => {
                passedToken = res.jwt
                context.login(passedToken)
            })
            .catch((err) => {
                console.log(err);
            })
    }


    return (
        <View>
            <TextInput
                style={styles.input}
                onChange={(e) => handleChange(e, 'email')}
                value={userDetails.email}
                placeholder="Email"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                onChange={(e) => handleChange(e, 'password')}
                value={userDetails.password}
                placeholder="Password"
                secureTextEntry={true}
                keyboardType="numeric"
            />
            <Button
                onPress={handleOnPress}
                title="Login"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16
    },
    input: {
        height: 60,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    }
});