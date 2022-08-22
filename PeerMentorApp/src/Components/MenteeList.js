import React, {useState, useEffect} from 'react';
import {styles} from '../stylesheet';
import { StyleSheet, View, Text, TextInput, Button, Pressable, Image, FlatList, RefreshControl } from 'react-native';
import { getMentees, getUserMoodReports, getAsyncItem } from '../Functions/AsyncDatabase';

export default function MenteeList( {navigation} ) {

  const [currentUser, setCurrentUser] = useState({});
  const [mentees, setMentees] = useState([]);
  const [searchMentees, setSearchMentees] = useState([]);

  useEffect(() => {
    getAsyncItem("current user").then(async user => {
      setCurrentUser(user)
      //console.log(`currentUser user_name: ${user.user_name}`)
      getMentees(user.user_id).then(result => {
        setMentees(result)
        setSearchMentees(result)
      })
    })
  }, []);

  const searchQueryMentees = (query) => {
    if (query == ''){
      setSearchMentees(mentees)
    }
    else{
      let queryMentees = []
      for (let mentee of mentees){
        let fullName = mentee.first_name + ' ' + mentee.last_name;
        if (fullName.toLowerCase().includes(query.toLowerCase())){
          queryMentees.push(mentee)
        }
      }
      setSearchMentees(queryMentees)
    }
  }

  const MenteeItem = ({mentee}) => (
    <View style={styles.homescreenmenteelist}>
        <Pressable style={styles.homescreenmentee}
                            onPress={() => navigation.navigate("Mentee Profile", {screenname: `${mentee.first_name} ${mentee.last_name}`, mentee: mentee})}>
            <View style={styles.homescreenmentee}>
                <Text>{mentee.first_name} {mentee.last_name}</Text>
            </View>
        </Pressable>
    </View>
  )

  const renderMentee = ({ item: menteeItem }) => (
      <MenteeItem mentee = {menteeItem} />
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
                  renderItem={renderMentee}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }/>
    </View>)
}