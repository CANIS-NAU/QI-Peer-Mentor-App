import React, { useState, useEffect } from 'react';
import {styles} from '../stylesheet';
import { StyleSheet, View, Text, Button, Pressable, Image, TextInput, FlatList, RefreshControl } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { getAsyncItem, setAsyncItem, removeAsyncItem, getUser } from '../Functions/AsyncDatabase';

export default function ChatRoom( {navigation, route} )
{
  const {user, mentee} = route.params;

  const [messages, setMessages] = useState([])

  useEffect(() => {
    //setAsyncItem("messages", messagesExample)
    
  }, []);


  // helper method that is sends a message
  function handleSend(newMessage = []) {
    setMessages(GiftedChat.append(messages, newMessage));

    getAsyncItem("mentors").then(users => {

      getMentor(username).then(user => {

        user.messages[mentee.id - 1] = GiftedChat.append(user.messages[mentee.id - 1], newMessage)
        GiftedChat.append(user.messages, newMessage)

        let userIndex = -1;
          for (let index = 0; index < users.length; index++){
            if (users[index].username == user.username){
              userIndex = index;
              break;
            }
          }

        users[userIndex] = user;

        setAsyncItem("users", users)
      })
    })
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={newMessage => handleSend(newMessage)}
      user={{ _id: 0 }}
    />
  );
}