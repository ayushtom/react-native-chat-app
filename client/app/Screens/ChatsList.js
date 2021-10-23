import React, { useContext, useEffect } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import EachChat from '../components/EachChat'
import { AuthContext } from '../context/context'
import { Ionicons } from '@expo/vector-icons';
export default function ChatsList({ navigation }) {
    const context = useContext(AuthContext)
    const handlePress = () => {
        context.logout()
    }

    const handleAddPeoplePress = () => {
        navigation.push("Contacts")
    }
    useEffect(() => {
        console.log(context)
    }, [context])

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={handleAddPeoplePress} style={styles.icon}>
                    <Ionicons name="person-add" size={24} color="black" />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);
    return (
        <View style={styles.container}>
            <EachChat navigation={navigation} />
            <EachChat navigation={navigation} />
            <EachChat navigation={navigation} />
            <Button
                onPress={handlePress}
                title="Logout"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fbfbfb"
    },
    icon: {
        marginHorizontal: 10
    }
})