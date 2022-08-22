import React, {useState, useEffect, Component } from 'react';
import { StyleSheet, View, Text, Button, Pressable, Image, TextInput, FlatList, RefreshControl } from 'react-native';
import {styles} from '../stylesheet';
import { getAsyncItem, getUnassignedMentees } from '../Functions/AsyncDatabase';

// Class to retreive mentee mood report and user info data from the ARORA server.
export default function UnAssignedMentees({navigation}){

    const [currentUser, setCurrentUser] = useState([]);
    const [unassignedMentees, setUnassignedMentees] = useState([]);

    // TO DO: implement system to regularly call to fetch new data, create userobject on login for parameters
    useEffect(() => {
        // get user 
        getAsyncItem("current user").then(async user => {
            setCurrentUser(user)

            getUnassignedMentees(user.user_id).then(async mentees => {
                setUnassignedMentees(mentees)
            })
        })
    }, []);



    return(
        <View style={styles.screen}>
            <View style={styles.screencontent}>
                <View style={styles.homescreen}>
                    <View>
                        <UnassignedMenteesList navigation={navigation} />
                    </View>
                </View>
            </View>
        </View>
    )
}