import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import EachChat from '../components/EachChat'

const ENDPOINT = 'http://localhost:5000/contacts/all'
export default function ContactsList({ navigation }) {
    const [allContacts, setallContacts] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const getAllContacts = async () => {
                let res = await fetch(ENDPOINT, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                res = await res.json()
                return res
            }
            const result = await getAllContacts()
            setallContacts(result)
        }
        fetchData()

    }, [])

    return (
        <View>
            {allContacts.map((eachContact) => {
                return (
                    <EachChat navigation={navigation} name={eachContact.firstName} />
                )
            })}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {

    }
})
