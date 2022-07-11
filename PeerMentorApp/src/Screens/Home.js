import React, {useState, useEffect, Component } from 'react';
import { StyleSheet, View, Text, Button, Pressable, Image, TextInput, FlatList, RefreshControl } from 'react-native';
import {styles} from '../stylesheet';
import MenteeList from '../Components/MenteeList';
import { getAsyncItem } from '../Functions/AsyncDatabase';

// Class to retreive mentee mood report and user info data from the ARORA server.
export default function Home({navigation}){

    const [currentUser, setCurrentUser] = useState([]);
    // TO DO: implement system to regularly call to fetch new data, create userobject on login for parameters
    useEffect(() => {
        // get user 
        getAsyncItem("current user").then(async user => {
            setCurrentUser(user)
        })
    }, []);

    return(
        <View style={styles.screen}>
            <View style={styles.screencontent}>
                <View style={styles.homescreen}>
                    <View>
                        <Text>Home Screen for {currentUser.firstname} {currentUser.lastname}</Text>
                        <MenteeList navigation={navigation} currentUser={currentUser}/>
                    </View>
                </View>
            </View>
        </View>
    )
}