import React, {useState, useEffect} from 'react';
import {styles} from '../stylesheet';
import { StyleSheet, View, Text, TextInput, Button, Pressable, Image, FlatList, RefreshControl } from 'react-native';
import { getMentees, getUserMoodReports, getAsyncItem } from '../Functions/AsyncDatabase';

// unassigned mentees list for use in assigning mentees to a mentor
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
                        <Text> Unassigned Mentees List </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}