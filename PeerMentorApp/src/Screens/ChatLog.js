import React, {useState, useEffect, Component } from 'react';
import { StyleSheet, View, Text, Button, Pressable, Image, TextInput, FlatList, RefreshControl } from 'react-native';
import {styles} from '../stylesheet';
import { getAsyncItem, getChatMessages } from '../Functions/AsyncDatabase';

// Class to retreive mentee mood report and user info data from the ARORA server.
export default function ChatLog({route, navigation}){
    const { mentee, mentor } = route.params;
    const [messages, setMessages] = useState([])

    const [currentUser, setCurrentUser] = useState([]);
    // TO DO: implement system to regularly call to fetch new data, create userobject on login for parameters
    useEffect(() => {
        // get user 
        getAsyncItem("current user").then(async user => {
            setCurrentUser(user)

            //get messages between user and mentee
            getChatMessages(mentor.user_id, mentee.user_id).then(async messages => {
                // convert to text
                setMessages(messages);
            })
        })
    }, []);

    const LogItem = ({log}) => (
        <View style={styles.homescreenmenteelist}>
            <View style={styles.homescreenmentee}>
              <Text>[{log.message_date}] {log.sender_name}: {log.message_text}</Text>
            </View>
        </View>
      )
    
      const renderLog = ({ item: logItem }) => (
        <LogItem log = {logItem} />
      )
    
      const [refreshing, setRefreshing] = React.useState(false);
    
      const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
      }
    
      const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
      }, []);


    return(
        <View style={styles.screen}>
            <View style={styles.screencontent}>
                <View style={styles.homescreen}>
                    <View>
                        <FlatList
                            contentContainerStyle={{flexGrow:1}}
                            data={messages}
                            keyExtractor={(item, index) => index}
                            renderItem={renderLog}
                            refreshControl={
                                <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                                />
                            }/>
                    </View>
                </View>
            </View>
        </View>
    )
}