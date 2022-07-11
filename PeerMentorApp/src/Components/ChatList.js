import React, {useState, useEffect} from 'react';
import {styles} from '../stylesheet';
import { StyleSheet, View, Text, TextInput, Button, Pressable, Image, FlatList, RefreshControl } from 'react-native';
import { getAsyncItem, setAsyncItem, removeAsyncItem, getAsyncKeys, clearAsyncStorage, getLogin, getMentees } from '../Functions/AsyncDatabase';
import { loginsExample, mentorsExample, menteesExample, accessCodesExample} from '../Functions/DefaultData';

export default function ChatList( {navigation} ) {
  const [currentUser, setCurrentUser] = useState([]);
  const [mentees, setMentees] = React.useState([])
  const [searchMentees, setSearchMentees] = React.useState([])

  useEffect(() => {
    getAsyncItem("current user").then(async user => {
      setCurrentUser(user)
  })
    getMentees(currentUser.username).then(results => {
      console.log(results)
      setMentees(results)
      setSearchMentees(results)
    })}, []);

  const searchQueryMentees = (query) => {
    if (query == ''){
      setSearchMentees(mentees)
    }
    else{
      getMentees(username).then(mentees => {
        let queryMentees = []
        for (let mentee of mentees ){
          if (mentee.name.toLowerCase().includes(query.toLowerCase())){
            queryMentees.push(mentee)
          }
        }
        setSearchMentees(queryMentees)
      })
    }
  }

  const ChatItem = ({mentee}) => (
    <View style={styles.homescreenmenteelist}>
      <Pressable style={styles.homescreenmentee}
                 onPress={() => navigation.navigate("Chat Room", {screenname: mentee.name, username: username, mentee: mentee})}>
        <View style={styles.homescreenmentee}>
          <Text>{mentee.name}</Text>
        </View>
      </Pressable>
    </View>
  )

  const renderChat = ({ item: menteeItem }) => (
    <ChatItem mentee = {menteeItem} />
  )

  const [refreshing, setRefreshing] = React.useState(false);

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);



  return (
    <View>
      <TextInput style={styles.logininput}
        placeholder="Search"
        onChangeText = {searchQuery => searchQueryMentees(searchQuery)}
        />
      <FlatList
        contentContainerStyle={{flexGrow:1}}
        data={searchMentees}
        keyExtractor={(item, index) => index}
        renderItem={renderChat}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }/>
    </View>)
}