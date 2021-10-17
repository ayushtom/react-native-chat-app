import React from 'react'
import { View, Text, Button } from 'react-native'

export default function authScreen({ navigation }) {
    const handleOptionPress = (screenName) => {
        navigation.push(screenName)
    }
    return (
        <View>
            <Button
                onPress={() => handleOptionPress('Login')}
                title="Login"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />
            <Button
                onPress={() => handleOptionPress('Register')}
                title="Register"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />
        </View>
    )
}
