import { Component, useState, useEffect } from 'react';
import {styles} from '../stylesheet';
import { StyleSheet, View, Text, TextInput, Button, Pressable, Image, FlatList, RefreshControl } from 'react-native';
import { fetchUserInfo } from '../Functions/ARORAServer';
import { checkIfMenteeFlagged, getUserMoodReports, createFlag, unflag } from '../Functions/AsyncDatabase';
import { getAsyncItem } from '../Functions/AsyncDatabase';

// sqlite queries

// Class to retreive mentee mood report and user info data from the ARORA server.
export default function MenteeInfoBox({navigation, mentee, mentor}){
    // TO DO: implement system to regularly call to fetch new data, create userobject on login for parameters
    const [currentUser, setCurrentUser] = useState([]);
    const [ menteeData, setMenteeData ] = useState(mentee);
    const [ moodReports, setMoodReports ] = useState([]);
    const [ flagged, setFlagged ] = useState('No');

    useEffect(() => {
        getAsyncItem("current user").then(async user => {
            setCurrentUser(user)
        })
        getUserMoodReports(mentee.user_id).then(async info => {
            setMoodReports(info)
        })
        checkIfMenteeFlagged(mentee.user_id, currentUser.username).then(async result => {
            if (result){
                setFlagged("Yes");
            }
            else{
                setFlagged("No");
            }
        })
      }, []);

    // check if user is mentor or supervisor, show appropriate components
    const ViewChatLogs = () => {
        if (currentUser.mentor_id == null){
            return(
                //button to view chat logs
                <View>
                <Button style={styles.loginbutton}
                          title = "View Chat Logs"
                          color = "#7897AB"
                          onPress={() => {
                            navigation.navigate("Chat Log", {screenname: `${mentor.last_name} & ${mentee.last_name} Logs`, mentee: mentee, mentor: mentor })
                          }}/>
              </View>
            )
        }
    }

    const toggleFlag = () => {
        // Switch toggle state
        if( flagged == "No" ) {
            //mentee.flagIcon = require('../../assets/flag0.png')
            setFlagged("Yes")
            createFlag(mentee.user_id, currentUser.user_id, "Flagged.") // TO DO ADD ABILITY TO FLAG REASON
        }
        else {
            //mentee.flagIcon = require('../../assets/flag1.png')
            setFlagged("No")
            unflag(mentee.user_id, currentUser.user_id, "Unflagged.")
        }
    }

    return(
        <View>
            <View>
                {ViewChatLogs()}
            </View>
            <View style={styles.menteebuttonsection}>
                <Pressable style={styles.menteebutton}
                                        onPress={() => toggleFlag()}>
                    <Image style={styles.menteeicons} source={require('../../assets/flag0.png')}/>
                    <Text style={styles.menteeicontext}>Toggle Flag</Text>
                </Pressable>
            </View>
            <Text>Mentee Information</Text>
            <Text>Name: {menteeData.first_name} {menteeData.last_name}</Text>
            <Text>Username: {menteeData.user_name}</Text>
            <Text>Current Mood Updated: {menteeData.UserCurrentMoodUpdated}</Text>
            <Text>Is Flagged: {flagged}</Text>
        </View>
    )

}