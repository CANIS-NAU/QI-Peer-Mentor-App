import React, {useState, useEffect, Component } from 'react';
import { StyleSheet, View, Text, Button, Pressable, Image, TextInput, FlatList, RefreshControl } from 'react-native';
import {styles} from '../stylesheet';
import MenteeInfoBox from '../Components/MenteeInfoBox';
import MenteeMoodReports from '../Components/MenteeMoodReports';
import { getMentees, getUserMoodReports, getAsyncItem } from '../Functions/AsyncDatabase';

// Class to retreive mentee mood report and user info data from the ARORA server.
export default function MenteeProfile({navigation, route}){
    const { mentee, mentor } = route.params;
    const [currentUser, setCurrentUser] = useState([]);

    // TO DO: implement system to regularly call to fetch new data, create userobject on login for parameters
    useEffect(() => {
        getAsyncItem("current user").then(async user => {
            setCurrentUser(user);
        })
    }, []);

    return(
        <View>
            <MenteeInfoBox navigation={navigation} mentee={mentee} mentor={mentor}></MenteeInfoBox>
            <MenteeMoodReports mentee={mentee}></MenteeMoodReports>
        </View>
    )
}