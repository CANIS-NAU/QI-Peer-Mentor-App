import React, {useState, useEffect, Component } from 'react';
import { StyleSheet, View, Text, Button, Pressable, Image, TextInput, FlatList, RefreshControl } from 'react-native';
import { getAsyncItem, setAsyncItem } from '../Functions/AsyncDatabase';
import { checkLogin, checkToInitializeStorage, getUser, defaultStart, deleteStorage } from '../Functions/AsyncDatabase';
import {styles} from '../stylesheet';

const wrongLoginError = 'Invalid username and/or password.'

// Class to retreive mentee mood report and user info data from the ARORA server.
export default function Login({navigation}){
    const [usernameinput, setUsername] = React.useState('');
    const [passwordinput, setPassword] = React.useState('');
  
    const [inputError, setInputError] = React.useState('');


    useEffect(() => {
      checkToInitializeStorage();
      //deleteStorage();

      // insert in default user
      //defaultStart();

      //getAsyncItem("mentors").then(result => {
        //console.log(result);
      //})
    }, []);

    const onSubmission = async() => {
      // check server for login credentials
        const user = await checkLogin(usernameinput, passwordinput);

        if (user.user_id != null){
            // token
            await setAsyncItem("token", user.token)
            // get user object
            const currentUser = await getUser(user.user_id);
            console.log(currentUser)
            await setAsyncItem("current user", currentUser)
            // navigate to home screen
            navigation.navigate("Navigation Bar", {screenname: currentUser.first_name})
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
                       onPress={() => navigation.navigate('Create Account', {screenname: 'Create Account'})}>
              <Text style={styles.loginoptiontext}>Create An Account</Text>
            </Pressable>

            <Pressable style={styles.loginoption}
                       onPress={() => navigation.navigate('Forgot Password', {screenname: 'Forgot Password'})}>
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