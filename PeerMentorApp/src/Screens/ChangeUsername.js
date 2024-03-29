import * as React from 'react';
import {styles} from '../stylesheet';
import { StyleSheet, View, Text, Button, Pressable, Image, TextInput, Divider } from 'react-native';

export default function ChangeUsername({ navigation }) {
  const [email, emailText] = React.useState('');

  // TO DO: security questions instead of recovery email as an idea
  //        integrate changeUsername async call
  return (
    <View style={styles.screen}>

      <View style={styles.screencontent}>
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>

          <Text style={{fontSize: 20, paddingBottom: 0, marginBottom: 0,}}>Enter your recovery account email to recieve a change of password request.</Text>

          <TextInput style={styles.changepasswordinput}
                     placeholder="Current Password"
                     onChangeText = {email => emailText(email)}
                     defaultValue = {email}/>

          <Pressable style={styles.changepasswordoption}
                     onPress={() => navigation.navigate('Profile')}>
            <Text style={styles.changepasswordtext}>Return to Profile</Text>
          </Pressable>

          <Pressable style={styles.changepasswordbutton}
                     onPress={email == '@nau.edu' ? () => navigation.navigate('Profile') : null}>
            <Text style={styles.changepasswordbuttontext}>Submit</Text>
          </Pressable>

        </View>
      </View>
    </View>
  );
}