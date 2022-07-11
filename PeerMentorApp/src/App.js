import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Image, Text, View } from 'react-native';
import {styles} from './stylesheet';

import ChangeEmail from './Screens/ChangeEmail';
import ChangePassword from './Screens/ChangePassword';

import Chat from './Screens/Chat';
import ChatRoom from './Screens/ChatRoom';

import CreateAccount from './Screens/CreateAccount';
import ForgotPassword from './Screens/ForgotPassword';

import Login from './Screens/Login';
import Home from './Screens/Home';
import MenteeProfile from './Screens/MenteeProfile';
import Profile from './Screens/Profile';

const Stack = createNativeStackNavigator();


function LoginStack(){
  return(
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Create Account" component ={CreateAccount}
                  options={({route}) => ({ title: route.params.screenname})}/>
        <Stack.Screen name="Forgot Password" component ={ForgotPassword}
                  options={({route}) => ({ title: route.params.screenname})}/>
      </Stack.Navigator>
  )};
export {LoginStack};

function HomeStack() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Mentee Profile" component ={MenteeProfile}
                  options={({route}) => ({ title: route.params.screenname})}/>
        <Stack.Screen name="Chat Room" component = {ChatRoom} options={({route}) => ({ title: route.params.screenname})}/>
      </Stack.Navigator>
  )};
export {HomeStack};

function ProfileStack() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Profile" component={Profile}/>
        <Stack.Screen name="Change Email" component={ChangeEmail} />
        <Stack.Screen name="Change Password" component={ChangePassword} />
      </Stack.Navigator>
  )};
export {ProfileStack};

function ChatStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Chat" component={Chat}/>
      <Stack.Screen name="Chat Room" component ={ChatRoom}
                    options={({route}) => ({ title: route.params.screenname})}/>
    </Stack.Navigator>
  )};
export {ChatStack};

const Tab = createBottomTabNavigator();
function NavigationBar() {
  return(
        <Tab.Navigator initialRouteName="Home Stack"
        screenOptions = {{
          "tabBarShowLabel": false,
          "tabBarLabelStyle": {
            "marginBottom": 30,
          },
          "tabBarStyle": [
            {
              "display": "flex",
              "height": '10%',
              "backgroundColor": "#7897AB"
            },
            null
          ],
          tabBarHideOnKeyboard: true
        }}
        >
          <Tab.Screen name="Profile Stack" component={ProfileStack}
              options={{ headerShown: false, tabBarIcon: ({size, focused, color}) => {
              return (<Image style={styles.navbaricons} source={require('../assets/profilebuttonicon.png')}/>)}}}/>

          <Tab.Screen name="Home Stack" component={HomeStack}
              options={{ headerShown: false, tabBarIcon: ({size, focused, color}) => {
              return (<Image style={styles.navbaricons} source={require('../assets/homebuttonicon.png')}/>)}}}/>

          <Tab.Screen name="Chat Stack" component = {ChatStack}
                      options={{ headerShown: false, tabBarIcon: ({size, focused, color}) => {
              return (<Image style={styles.navbaricons} source={require('../assets/chatbuttonicon.png')}/>)}}}/>

        </Tab.Navigator>
  )};
export {NavigationBar};


export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initalRouteName = "Login Stack">
        <Stack.Screen name="Login Stack" component={LoginStack} options={{ headerShown: false }} />
        <Stack.Screen name="Navigation Bar" component={NavigationBar} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
