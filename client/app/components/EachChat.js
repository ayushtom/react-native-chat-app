import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default function EachChat({ navigation, name }) {

    const handlePress = () => {
        console.log("enter chat")
        navigation.push("Each Chat")
    }

    return (
        <TouchableOpacity style={styles.container} onPress={handlePress}>
            <Text>
                {name ? name : "Each Chat"}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 75,
        borderWidth: 1,
        backgroundColor: "#fbfbfb",
        borderTopWidth: 0
    }
})