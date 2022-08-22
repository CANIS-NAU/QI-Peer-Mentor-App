import React, { useState } from 'react';
import { styles } from '../stylesheet';
import { View, Text, Pressable, TextInput } from 'react-native';
import { getAsyncItem, setAsyncItem, getUser, useAccessCode } from '../Functions/AsyncDatabase';
//import { useForm } from "react-hook-form";

export default function CreateAccountForm( {navigation} ) {
    //const { register, handleSubmit } = useForm();
    //const onSubmit = data => console.log(data);
    const emailValidationRegex = ".+@.+\..+";
    const passwordValidationRegex = "^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"; // 8 characters, 1 letter, 1 number minimum


    const [accessCode, setCode] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [inputError, setInputError] = React.useState('');

    const VALIDATION_SUCCESS = 0;
    const ACCESS_CODE_INVALID = 1;
    const USERNAME_IN_USE = 2;
    const USERNAME_INVALID = 3;
    const INVALID_EMAIL = 4;
    const EMAIL_IN_USE = 5;
    const PASSWORDS_DO_NOT_MATCH = 6;
    const PASSWORD_INVALID = 7;
    const FIRST_NAME_BLANK = 8;
    const LAST_NAME_BLANK = 9;


    const validate = (accesssCode, email, username, password, confirmPassword, firstName, lastName) => {
        // validate access code
        if (!checkAccessCode(accessCode)) return ACCESS_CODE_INVALID;
        // validate email // simple regex .+@.+\..+
        if (!email.test(emailValidationRegex)) return INVALID_EMAIL;
        // validate username not in use
        if (!checkUsernameInUse(username)) return USERNAME_IN_USE; 
        // validate username
        if (!username.length > 3) return USERNAME_INVALID;
        // validate password
        if (!password.test(passwordValidationRegex)) return PASSWORD_INVALID;
        // check if passwords match
        if (password != confirmPassword) return PASSWORDS_DO_NOT_MATCH
        // check if first name is blank
        if (!firstName.length > 0) return FIRST_NAME_BLANK;
        // check if last name is blank
        if (!lastName.length > 0) return LAST_NAME_BLANK;

        return VALIDATION_SUCCESS;
    }

    // TO DO: Security Questions, new form format
    /*        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>

        <Form onSubmit={handleSubmit(onSubmit)}>
            <Input label= "Access Code" {...register("accessCode", {required: true, 
                    validate: {
                        
                    }
            })} />
            {errors.accessCode?.type === 'required' && "First name is required"}
            <Input label= "First Name" {...register("firstName", {required: true})} />
            <Input label= "Last Name" {...register("lastName", {required: true})} />
            <Input label= "Email" {...register("email", {required: true, pattern: emailValidationRegex})} />
            <Input label= "Username" {...register("username", {required: true})} />
            <Input label= "Password" {...register("password", {required: true, pattern: passwordValidationRegex})} />
            <Input label= "Confirm Password" {...register("confirmPassword", {required: true, pattern: passwordValidationRegex})} />

            <Input type="submit" />
        </Form>*/

    return(
        <View>

            <View>
                <Text style={{color: "red"}}>{inputError}</Text>
            </View>

            <TextInput style={styles.forminput} 
                        placeholder = "Access Code"
                        onChangeText = {accessCode => setCode(accessCode)} 
                        defaultValue = {accessCode}/>

            <TextInput style={styles.forminput} 
                        placeholder = "First Name"
                        onChangeText = {firstName => setFirstName(name)} 
                        defaultValue = {firstName}/>

            <TextInput style={styles.forminput} 
                        placeholder = "Last Name"
                        onChangeText = {lastName => setLastName(name)} 
                        defaultValue = {lastName}/>

            <TextInput style={styles.forminput} 
                        placeholder = "Recovery Email"
                        onChangeText = {email => setEmail(email)} 
                        defaultValue = {email}/>

            <TextInput style={styles.forminput} 
                        placeholder = "Username"
                        onChangeText = {username => setUsername(username)} 
                        defaultValue = {username}/>

            <TextInput style={styles.forminput} 
                        placeholder = "Password"
                        onChangeText = {password => setPassword(password)} 
                        defaultValue = {password}
                        secureTextEntry/>
            
            <TextInput style={styles.forminput} 
                        placeholder = "Confirm Password"
                        onChangeText = {password => setConfirmPassword(password)} 
                        defaultValue = {confirmPassword}
                        secureTextEntry/>

            <Pressable style={styles.loginoption}
                                onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginoptiontext}>Return to Login</Text>
            </Pressable>

            {/* Need to add what happens to other data, preferebly a record in database */}
            <Pressable style={styles.loginbutton} 
                        onPress={async () => {
                            // TO DO: change to using async call for checking access code
                            getAsyncItem("access codes").then(async codes => {
                            for (let code of codes){

                                // TO DO: better configuration for finding correctly inputted data
                                if (code.code == accessCode && email.includes("@") && email.includes(".") && username != '' && password != ''){
                                // check if user exists already
                                let checkUsername = await getUser(username)
                                if (checkUsername === undefined){
                                    if (password == confirmPassword){

                                    setInputError('')
                                    getAsyncItem("users").then(users => {
                                        
                                        //  TO DO change to async method
                                        if (code.authority == "mentor"){
                                            users.push()
                                        }
                                        else{
                                            users.push()
                                        }
                                        setAsyncItem("users", users);

                                        //update server on access code use
                                        //useAccessCode(accessCode);

                                        navigation.navigate("Login");

                                    })
                                    
                                    }
                                    else{
                                    setInputError("Passwords do not match.")
                                    }
                                }
                                else{
                                    setInputError("Username is already taken.")
                                }
                                }
                                else{
                                if (code.code != accessCode){
                                    setInputError("Invalid Access Code.")
                                }
                                else{
                                    setInputError("Invalid Input.\nYou must enter a username, password, and valid email address.")
                                }
                                }
                            }
                            
    
                            })
                        }}>
                <Text style={styles.loginbuttontext}> Submit </Text>
            </Pressable>

            </View>
    )
}