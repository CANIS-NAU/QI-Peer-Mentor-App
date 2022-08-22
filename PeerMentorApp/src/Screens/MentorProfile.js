import React, {useState, useEffect, Component } from 'react';
import {styles} from '../stylesheet';
import SupervisorMenteeList from '../Components/SupervisorMenteeList';
import { StyleSheet, View, Text, Button, Pressable, Image, TextInput } from 'react-native';

export default function MentorProfile( {route, navigation} ){
    const { mentor } = route.params;
    const [currentUser, setCurrentUser] = useState([]);

  return (
      <View style={styles.mentormenteelist}>
        <Text>Mentees</Text>
        <SupervisorMenteeList navigation={navigation} mentor={mentor}/>
      </View>
  );
}