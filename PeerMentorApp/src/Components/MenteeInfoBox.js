import { Component, useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Pressable, Image, FlatList, RefreshControl } from 'react-native';
import { fetchUserInfo } from '../Functions/ARORAServer';
import { checkIfMenteeFlagged, getUserMoodReports } from '../Functions/AsyncDatabase';
import { getAsyncItem } from '../Functions/AsyncDatabase';

// sqlite queries

// Class to retreive mentee mood report and user info data from the ARORA server.
export default function MenteeInfoBox({navigation, mentee}){
    // TO DO: implement system to regularly call to fetch new data, create userobject on login for parameters
    const [currentUser, setCurrentUser] = useState([]);
    const [ menteeData, setMenteeData ] = useState(mentee);
    const [ moodReports, setMoodReports ] = useState([]);
    const [ flagged, setFlagged ] = useState(false);

    useEffect(() => {
        getAsyncItem("current user").then(async user => {
            setCurrentUser(user)
        })
        getUserMoodReports(mentee.user_id).then(async info => {
            setMoodReports(info)
        })
        checkIfMenteeFlagged(mentee.user_id, currentUser.username).then(async result => {
            setFlagged(result);
        })
      }, []);

    return(
        <View>
            <Text>Mentee Information</Text>
            <Text>Name: {menteeData.user_name}</Text>
            <Text>Current Mood Updated: {menteeData.UserCurrentMoodUpdated}</Text>
            <Text>Is Flagged: {flagged}</Text>
        </View>
    )

}