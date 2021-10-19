import React, { useContext, useEffect } from 'react'
import { View, Text, Button } from 'react-native'
import { AuthContext } from '../context/context'

export default function ChatsList({ navigation }) {
    const context = useContext(AuthContext)
    const handlePress = () => {
        context.logout()
    }

    useEffect(() => {
        console.log(context)
    }, [context])
    return (
        <View>
            <Text>Chats List</Text>
            <Button
                onPress={handlePress}
                title="Logout"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />
        </View>
    )
}
