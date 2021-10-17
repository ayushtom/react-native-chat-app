import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Button } from 'react-native'

export default function Register() {
    const [registerationDetails, setRegisterationDetails] = useState({
        password: '',
        contactNumber: '',
        firstName: '',
        lastName: '',
        email: ''
    })

    const handleChange = (event, name) => {
        event.persist()
        setRegisterationDetails((prev) => ({
            ...prev,
            [name]: event.nativeEvent.text
        }))
    }
    const handleOnPress = () => {
        var passedToken;
        fetch(context.API_ENDPOINT + '/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerationDetails)
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
                onChange={(e) => handleChange(e, 'firstName')}
                value={registerationDetails.firstName}
                placeholder="First Name"
            />
            <TextInput
                style={styles.input}
                onChange={(e) => handleChange(e, 'lastName')}
                value={registerationDetails.lastName}
                placeholder="Last Name"
            />
            <TextInput
                style={styles.input}
                onChange={(e) => handleChange(e, 'contactNumber')}
                value={registerationDetails.contactNumber}
                placeholder="Contact Number"
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                onChange={(e) => handleChange(e, 'email')}
                value={registerationDetails.email}
                placeholder="Email"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                onChange={(e) => handleChange(e, 'password')}
                value={registerationDetails.password}
                placeholder="Password"
                keyboardType="number-pad"
            />
            <Button
                onPress={handleOnPress}
                title="Register"
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