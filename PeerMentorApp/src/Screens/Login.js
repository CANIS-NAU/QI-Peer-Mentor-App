import React, {useState, useEffect, Component } from 'react';
import { StyleSheet, View, Text, Button, Pressable, Image, TextInput, FlatList, RefreshControl } from 'react-native';
import { getAsyncItem, setAsyncItem } from '../Functions/AsyncDatabase';
import { checkLogin, getUserObject, updateData, defaultUser, getMentorUserInfo, initializeStorage } from '../Functions/AsyncDatabase';
import {styles} from '../stylesheet';

const wrongLoginError = 'Invalid username and/or password.'

// Class to retreive mentee mood report and user info data from the ARORA server.
export default function Login({navigation}){
    const [usernameinput, setUsername] = React.useState('');
    const [passwordinput, setPassword] = React.useState('');
  
    const [inputError, setInputError] = React.useState('');


    useEffect(() => {
      //initializeStorage();

      // insert in default user
      defaultUser();
      // call for new data
      updateData();

      getAsyncItem("mentors").then(result => {
        //console.log(result);
      })
    }, []);

    const onSubmission = async() => {
        console.log('button pressed')
        const loginResult = await checkLogin(usernameinput, passwordinput);
        console.log(`checking login result: ${loginResult}`)

        if (loginResult == true){
            // get user object
            const currentUser = await getUserObject(usernameinput);
            await setAsyncItem("current user", currentUser)
            // navigate to home screen
            navigation.navigate("Navigation Bar", {screenname: currentUser.firstname})
        }
        else{
            setInputError(wrongLoginError);
        }
    }

    return(
        <View style={styles.screen}>
      <View style={styles.screencontent}>
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>

          <View>
            <Text style={{color: "red"}}>{inputError}</Text>
          </View>

          <TextInput style={styles.logininput}
                     placeholder= "Username"
                     onChangeText = {usernameinput => setUsername(usernameinput)}/>

          <TextInput style={styles.logininput}
                     placeholder= "Password"
                     onChangeText = {passwordinput => setPassword(passwordinput)}
                     secureTextEntry/>

          <View style={styles.loginoptions}>

            <Pressable style={styles.loginoption}
                       onPress={() => navigation.navigate('Creation')}>
              <Text style={styles.loginoptiontext}>Create An Account</Text>
            </Pressable>

            <Pressable style={styles.loginoption}
                       onPress={() => navigation.navigate('Forgot Password')}>
              <Text style={styles.loginoptiontext}>Forgot Password</Text>
            </Pressable>

          </View>

          <View>
            <Button style={styles.loginbutton}
                      title = "Login"
                      color = "#7897AB"
                      onPress={() => onSubmission()}/>
          </View>

        </View>
      </View>
    </View>
    )
}