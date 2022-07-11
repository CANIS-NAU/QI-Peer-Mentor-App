import React, {useState, useEffect} from 'react';
import {styles} from '../stylesheet';
import { StyleSheet, View, Text, Button, Pressable, Image, TextInput, Divider } from 'react-native';
import ChatList from '../Components/ChatList'
import { getAsyncItem, setAsyncItem, removeAsyncItem, getAsyncKeys, clearAsyncStorage, getLogin, getMentees} from '../Functions/AsyncDatabase';

export default function Chat( {navigation} ) {
  
  const [currentUser, setCurrentUser] = useState([]);
  const [menteeList, setMentees] = useState('');

  useEffect(() => {
    getAsyncItem("current user").then(async user => {
      setCurrentUser(user)
    })
    getMentees(username).then(results => {
      setMentees(results)
    
    })}, []);

  return(
    <View style={styles.screen}>
      <View style={styles.screencontent}>
        <View style={styles.homescreen}>

          <Text style={{fontSize: 20, paddingBottom: 3, marginBottom: 3,}}>Your Chats</Text>

          <ChatList navigation={navigation}/>

        </View>

      </View>

    </View>
  );
}