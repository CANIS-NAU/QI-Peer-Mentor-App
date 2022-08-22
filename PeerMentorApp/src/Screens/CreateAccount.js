import React, { useState } from 'react';
import { styles } from '../stylesheet';
import { View, Text, Pressable, TextInput } from 'react-native';
import CreateAccountForm from '../Components/CreateAccountForm'

export default function CreateAccount({ navigation }) {

  return (
    <View style={styles.screen}>

      <View style={styles.screencontent}>

        <CreateAccountForm navigation={navigation} />

      </View>
    </View>
  );
}