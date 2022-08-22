import React, {useState, useEffect, Component } from 'react';
import { StyleSheet, View, Text, Button, Pressable, Image, TextInput, FlatList, RefreshControl } from 'react-native';
import {styles} from '../stylesheet';
import MenteeList from '../Components/MenteeList';
import MentorList from '../Components/MentorList'
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


    // check if user is mentor or supervisor, show appropriate components
    const getAuthorityView = () => {
        if (currentUser.mentor_id == null){
            return(
                <View>
                    <Text>List of Mentors</Text>
                    <MentorList navigation={navigation} />
                </View>
            )
        }
        else{
            return(
                <View>
                    <Text>List of Mentees</Text>
                    <MenteeList navigation={navigation}/>
                </View>
            )
        }
    }

    const displayAssignMentees = () => {
        if (currentUser.mentor_id == null){
            return(
                <View>
                    <Button style={styles.loginbutton}
                            title = "Assign Mentees To Mentors"
                            color = "#7897AB"
                            onPress={() => {
                                navigation.navigate("Assign Mentees", {screenname: "Assign Mentees"})
                            }}/>
                </View>
            )
        }
    }

    return(
        <View style={styles.screen}>
            <View style={styles.screencontent}>
                <View style={styles.homescreen}>
                    <View>
                        <Text>Home Screen for {currentUser.first_name} {currentUser.last_name}</Text>
                        {displayAssignMentees()}
                    </View>
                    <View>
                        {getAuthorityView()}
                    </View>
                </View>
            </View>
        </View>
    )
}