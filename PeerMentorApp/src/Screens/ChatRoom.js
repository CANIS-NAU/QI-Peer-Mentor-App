import React, { useState, useEffect } from 'react';
import {styles} from '../stylesheet';
import { StyleSheet, View, Text, Button, Pressable, Image, TextInput, FlatList, RefreshControl } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { getAsyncItem, getChatMessages, setAsyncItem, createMessage, removeAsyncItem, getUser } from '../Functions/AsyncDatabase';

export default function ChatRoom( {navigation, route} )
{
  const {mentee} = route.params;
  const [currentUser, setCurrentUser] = useState([]);
  const [messages, setMessages] = useState([])

  useEffect(() => {
    getAsyncItem("current user").then(async user => {
      setCurrentUser(user)

      getChatMessages(user.user_id, mentee.user_id).then(async messages => {
        // convert to gifted chat fields
        for (let index = 0; index < messages.length; index++){
          // check if current user sent the messages, 1 if true, 2 if false for _id field
          console.log(`sender name ${messages[index].sender_name}  username = ${user.user_name}`)
          let sender = ( messages[ index ].sender_name != user.user_name ? 2 : 0 );
          let new_message = {
            _id: messages[ index ].message_id,
            text: messages[ index ].message_text,
            createdAt: messages[ index ].message_date,
            user: {
              _id: sender,
              name: messages[ index ].sender_name,
              avatar: '',
             },
          }
          // append message object for gifted chat
          setMessages(previousMessages => GiftedChat.append(previousMessages, new_message))
        }

      })
    })


  }, []);


  // helper method that is sends a message
  function handleSend(newMessage = []) {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessage));

    getAsyncItem("chat messages").then(chatMessages => {

      // TO DO: figure out how to append other appropriate data for the put api call
      // change message object to be compatible with messages
      let storedMessageObject = {
        message_id: 1,
        convo_id: 1,
        message_text: "Hello!", // message_text when sending to the server
        message_date: new Date(),
        message_sender_id: 2147483648,
        message_reciver_id: 2,
        sender_name: 'ashleeaholloway',
      }

      let updatedMessages = GiftedChat.append(chatMessages, newMessage)
      setAsyncItem("chat messages", updatedMessages).then(async result => {
        console.log(await getAsyncItem("chat messages"))
      });

    })

    // TO DO: testing, needs extra parameters
    createMessage(newMessage.text, currentUser.user_id, currentUser.user_name, mentee.user_id)
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={newMessage => handleSend(newMessage)}
      user={{ _id: 0 }}
    />
  );
}