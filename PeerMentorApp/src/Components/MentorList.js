import React, {useState, useEffect} from 'react';
import {styles} from '../stylesheet';
import { StyleSheet, View, Text, TextInput, Button, Pressable, Image, FlatList, RefreshControl } from 'react-native';
import { getMentors, getUserMoodReports, getAsyncItem } from '../Functions/AsyncDatabase';

export default function MentorList( {navigation} ) {

  const [currentUser, setCurrentUser] = useState({});
  const [mentors, setMentors] = useState([]);
  const [searchMentors, setSearchMentors] = useState([]);

  useEffect(() => {
    getAsyncItem("current user").then(async user => {
      setCurrentUser(user)
      //console.log(`currentUser user_name: ${user.user_name}`)
      getMentors(user.user_id).then(async result => {
        setMentors(result)
        setSearchMentors(result)
      })
    })
  }, []);

  const searchQueryMentors = (query) => {
    if (query == ''){
      setSearchMentors(mentors)
    }
    else{
      let queryMentors = []
      for (let mentor of mentors){
        let fullName = mentor.first_name + ' ' + mentor.last_name;
        if (fullName.toLowerCase().includes(query.toLowerCase())){
          queryMentors.push(mentor)
        }
      }
      setSearchMentors(queryMentors)
    }
  }

  const MentorItem = ({mentor}) => (
    <View style={styles.homescreenmenteelist}>
        <Pressable style={styles.homescreenmentee}
                            onPress={() => navigation.navigate("Mentor Profile", {screenname: `${mentor.first_name} ${mentor.last_name}`, mentor: mentor})}>
            <View style={styles.homescreenmentee}>
                <Text>{mentor.first_name} {mentor.last_name}</Text>
            </View>
        </Pressable>
    </View>
  )

  const renderMentor = ({ item: mentorItem }) => (
      <MentorItem mentor = {mentorItem} />
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
      onChangeText = {searchQuery => searchQueryMentors(searchQuery)}
      />

      <FlatList
                  contentContainerStyle={{flexGrow:1}}
                  data={searchMentors}
                  keyExtractor={(item, index) => index}
                  renderItem={renderMentor}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }/>
    </View>)
}