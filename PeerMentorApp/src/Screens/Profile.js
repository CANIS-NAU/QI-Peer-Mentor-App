import React, {useState, useEffect} from 'react';
import {styles} from '../stylesheet';
import { StyleSheet, View, Text, Button, Pressable, Image, TextInput } from 'react-native';
import { getAsyncItem, setAsyncItem, removeAsyncItem, getEvents, getUser } from '../Functions/AsyncDatabase';

export default function ProfileScreen({ navigation }) {

  const [currentUser, setCurrentUser] = useState([]);
  const [email, updateEmail] = useState('');
  const [password, updatePassword] = useState('');

  useEffect(() => {
    getAsyncItem("current user").then(async user => {
      setCurrentUser(user)
    })
  }, []);


  return (
    <View style={styles.screen}>
      <View style={styles.profilecontent}>

        <Text style={{fontSize: 30, paddingBottom: 0, marginBottom: 20,}}>{currentUser.firstname} {currentUser.lastname}'s Profile</Text>

        <View>
          <Text style={{fontSize: 20, paddingBottom: 0, marginBottom: 0,}}>Email: {currentUser.email}</Text>
        </View>

        <View>
          <Text style={{fontSize: 20, paddingBottom: 0, marginBottom: 0,}}>Username: {currentUser.username}</Text>
        </View>

        <View>
          <Text style={{fontSize: 20, paddingBottom: 0, marginBottom: 20,}}>Password: {currentUser.password}</Text>
        </View>

        <Button
          title = "Log Out"
          color = "#7897AB"
                   onPress={() => navigation.navigate("Login")}/>

      </View>
    </View>
  );
}
