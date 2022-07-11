import { fetchNewMoodReports, fetchNewMentees, fetchNewAccessCodes, fetchNewMentorUsers, fetchNewMenteeFlags, fetchNewChatMessages } from './ARORAServer';
import { mentorDataExample } from './DefaultData';
import AsyncStorage from '@react-native-async-storage/async-storage';


// standard async functions
export async function getAsyncItem(key) {
    try{
      var result = await AsyncStorage.getItem(key);
      return JSON.parse(result);
    }
    catch(err){
      console.log(err);
    }
}

export async function setAsyncItem(key, value){
    try{
      var result = await AsyncStorage.setItem(key, JSON.stringify(value));
    }
    catch(err){
      console.log(err);
    }
}

export async function removeAsyncItem(key){
    try{
      await AsyncStorage.removeItem(key);
    }
    catch(err){
      console.log(err);
    }
}

export async function getAsyncKeys(){
  try{
    var result = await AsyncStorage.getAllKeys();
    return result;
  }
  catch(err){
    console.log(err);
  }
}

export async function clearAsyncStorage(){
  try{
    await AsyncStorage.clear();
  }
  catch(err){
  }
}



// update data off server
export async function updateData(){
  updateMoodReports();
  updateMentees();
  //updateMentorUsers();
  //updateChatMessages();
  //updateAccessCodes();
}

export async function updateMoodReports(){
  const json = await fetchNewMoodReports();
  setAsyncItem("mood reports", json);
}

export async function updateMentees(){
  const json = await fetchNewMentees();
  setAsyncItem("mentees", json);
}

export async function updateMentorUsers(){
  const json = await fetchNewMentorUsers();
  setAsyncItem("mentors", json);
}

export async function updateAccessCodes(){
  const json = await fetchNewAccessCodes();
  setAsyncItem("access codes", json);
}

export async function updateMenteeFlags(){
  const json = await fetchNewMenteeFlags();
  setAsyncItem("mentee flags", json);
}

export async function updateChatMessages(){
  const json = await fetchNewChatMessages();
  setAsyncItem("chat messages", json);
}


// return data from database
export async function getMentee(userId){
  return getAsyncItem("mentees").then(async users => {
    return users.find(user => {
      return user.UserId == userId;
    })
  })
}

export async function getMentor(username){
  console.log(`username: ${username}`)
  return getAsyncItem("mentors").then(async users => {
    const result = users.find(user => {
      return user.username == username
    })
    console.log(result)
    return users.find(user => user.username == username)
  })
}

export async function getAllUsers(authority){
  return getAsyncItem("mentors").then(async users => {
    const authorityUsers = users.filter(user => user.authority == authority);
    return authorityUsers;
  })
}

// TO DO: decide how mentees are connected to mentors
export async function getMentees(username){
  return getAsyncItem("mentees").then(async mentees => {
    console.log(mentees)
    return getMentor(username).then(async user => {
      console.log(user)
      const menteeIds = user.menteeIds;
      const menteesList = mentees.filter(mentee => menteeIds.includes(mentee.user_id));
      console.log("returned mentees")
      console.log(menteesList)
      return menteesList;
    })
      
  })
}

export async function getChatMessages(username, mentee){
  return getAsyncItem("chat messages").then(async chatMessages => {
    // TO DO: decide how convo id fits into 
    const menteeMessages = chatMessages.filter(convo => convo.mentorUsername == username && convo.menteeID == mentee.userId);
    return menteeMessages;
  })
}

export async function getUserMoodReports(user_id){
  return getAsyncItem("mood reports").then(async moodReports => {
    console.log("mood reports")
    console.log(moodReports)
    const userMoodReports = moodReports.filter(moodreport => moodreport.user_id == user_id)
    return userMoodReports;
  })
}

//export async function getEvents(username){
//  return getUser(username).then(async user => {
//    return user.events;
//  })
//}


//utility
//export async function initializeStorage(){
  // create empty access codes, flags, mentors
//  getAsyncKeys().then(async keys => {
//    console.log(keys)
//    if (!keys.includes("access codes")){
//      setAsyncItem("access codes", [])
//    }
//    if (!keys.includes("flags")){
//      setAsyncItem("flags")
//    }
//  })
//}

export async function checkLogin(username, password){
  const mentorResult = await getMentor(username);
  // TO DO: PASSWORD HASHING/ UNHASHING
  if (mentorResult != null && mentorResult.password == password){
    return true;
  }
  return false;
}

export async function checkIfMenteeFlagged(user_id, mentorUsername){
  // check if any flags exist
  const keys = await getAsyncKeys();
  if (!keys.includes("flags")){
    return false;
  }
  return getAsyncItem("flags").then(async flags => {
    const flagResult = flags.filter(flag => flag.menteeFlagged == user_id && flag.flaggedBy == mentorUsername )
    return flagResult.length > 0
  })
}

export async function getUserObject(username){
  return await getMentor(username);
}

export async function defaultUser(){
  setAsyncItem("mentors", mentorDataExample)
}