import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import io from "socket.io-client";

const ENDPOINT = "http://localhost:5000"
let socket;

export default function EachChatScreen() {

    const [allMessages, setallMessages] = useState([])
    const [currentMessage, setCurrentMessage] = useState("")
    useEffect(() => {
        socket = io(ENDPOINT);
        socket.on("chat messages", msg => {
            setallMessages((prev) => [...prev, msg])
        });
        return () => {
            socket.emit('disconnnect')
            socket.off()
        }

    }, [ENDPOINT])


    const submitChatMessage = () => {

        socket.emit('send message', currentMessage);
        setCurrentMessage('')
    }
    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollContainer}>

            </ScrollView>
            <View styles={styles.inputContainer}>

            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textBox}
                    value={currentMessage}
                    onChangeText={msg => setCurrentMessage(msg)}
                    onSubmitEditing={submitChatMessage} />
                <TouchableOpacity style={styles.submitButton} onPress={submitChatMessage}>
                    <Ionicons style={styles.icon} name="send" size={20} color="white" />
                </TouchableOpacity>
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollContainer: {
        flexGrow: 1
    },
    inputContainer: {
        flex: 1,
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 75,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10
    },
    textBox: {
        borderRadius: 15,
        borderWidth: 1,
        height: 40,
        flex: 1,
        padding: 10,
        marginRight: 5
    },
    submitButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "black"
    },
    icon: {
        position: "absolute",
        left: 10,
        top: 7
    }
})