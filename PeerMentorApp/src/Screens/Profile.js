import React, {useState, useEffect} from 'react';
import {styles} from '../stylesheet';
import { StyleSheet, View, Text, Button, Pressable, Image, TextInput } from 'react-native';
import { getAsyncItem, setAsyncItem, removeAsyncItem, getEvents, getUser, checkAccessCode, createAccessCode } from '../Functions/AsyncDatabase';

export default function ProfileScreen({ navigation }) {

  const [currentUser, setCurrentUser] = useState([]);
  const [accessCode, setCode] = React.useState('');
  const [email, updateEmail] = useState('');
  const [password, updatePassword] = useState('');

  useEffect(() => {
    getAsyncItem("current user").then(async user => {
      setCurrentUser(user)
    })
  }, []);

  // if supervisor, enable them to make access codes on profile
  // TO DO: drop down menu potentially
  const showAccessCodeCreation = () => {
    // supervisor view
    if (currentUser.mentor_id == null){
        return(
          <View>

            {/* Supervisor only needs to make new blanks with a set access code*/}
            <TextInput style={styles.logininput} 
                      placeholder = "Access Code"
                      onChangeText = {accessCode => setCode(accessCode)} 
                      defaultValue = {accessCode}/>


          {/* Need to add what happens to other data, preferebly a record in database */}
          <Button
              title = "Submit"
              color = "#7897AB"
              onPress={() => {
                // check if access code doesn't already exist
                if (checkAccessCode(accessCode)){
                  // check if valid access code
                  if (accessCode != "" && parseInt(accessCode) >= 0){
                    createAccessCode(accessCode, currentUser.user_id, "supervisor")
                    // TO DO: give success message 
                  }
                  else{
                    // TO DO: give invalid access code error
                  }
                }
                else{
                  // TO DO: give access code already exists error
                }

              }}/>

          </View>
        )
    }
  }

  return (
    <View style={styles.screen}>
      <View style={styles.profilecontent}>

        <Text style={{fontSize: 30, paddingBottom: 0, marginBottom: 20,}}>{currentUser.first_name} {currentUser.last_name}'s Profile</Text>

        <View>
          <Text style={{fontSize: 20, paddingBottom: 0, marginBottom: 0,}}>Email: {currentUser.email}</Text>
          <Pressable style={styles.loginoption}
                       onPress={() => navigation.navigate('Change Email', {screenname: 'Change Email'})}>
              <Text style={{fontSize: 10, paddingBottom: 0, marginBottom: 0,}}>Change Email</Text>
          </Pressable>
        </View>

        <View>
          <Text style={{fontSize: 20, paddingBottom: 0, marginBottom: 0,}}>Username: {currentUser.user_name}</Text>
          <Pressable style={styles.loginoption}
                       onPress={() => navigation.navigate('Change Username', {screenname: 'Change Username'})}>
              <Text style={{fontSize: 10, paddingBottom: 0, marginBottom: 0,}}>Change Username</Text>
          </Pressable>
        </View>

        <View>
          <Text style={{fontSize: 20, paddingBottom: 0, marginBottom: 0,}}>Password: {currentUser.password}</Text>
          <Pressable style={styles.loginoption}
                       onPress={() => navigation.navigate('Change Password', {screenname: 'Change Password'})}>
              <Text style={{fontSize: 10, paddingBottom: 0, marginBottom: 0,}}>Change Password</Text>
          </Pressable>
        </View>

        <View style={{marginBottom: 10}}>
        {showAccessCodeCreation()}
        </View>

        <Button
          title = "Log Out"
          color = "#7897AB"
                   onPress={() => navigation.navigate("Login")}/>

      </View>
    </View>
  );
}