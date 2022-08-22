import { fetchChatMessagesBetweenUsers, fetchMenteeMoodReports, fetchMentorsAssignedMentees, fetchUnassignedMentees, fetchLoginConfirmation, fetchMenteeFlags, fetchAccessCode, fetchMentors, postAccessCode, postMenteeFlag, patchMenteeUnflag, patchUserInfoEmail, patchUserInfoUsername, patchUserInfoPassword, patchUserInfoMentor, fetchUser, postNewMessage } from './ARORAServer';
import { userDataExample, chatMessagesExample, moodReportsExample } from './DefaultData';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SERVERERROR = -999;

// ---------------------------------------------------------------- STANDARD ASYNC
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

export async function mergeAsyncItem(key, value){
  try{
    var result = await AsyncStorage.mergeItem(key, JSON.stringify(value));
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


// ---------------------------------------------------------------- 
// initalize storage on app starup (no data held yet)
export async function checkToInitializeStorage(){
  // create key value pairs to prepare for storage insertion
  // if one doesnt exist, assume all of them don't
  // TO DO: check each one instead of assuming
  if (await getAsyncItem("users") == null){
    setAsyncItem("users", []);
    setAsyncItem("accesss codes", []);
    setAsyncItem("mood reports", []);
    setAsyncItem("mentee flags", []);
    setAsyncItem("chat messages", []);
  }
}

export async function deleteStorage(){
  clearAsyncStorage();
}

// set default user due to uninitalized storage
export async function defaultStart(){
  setAsyncItem("users", userDataExample)
  setAsyncItem("chat messages", chatMessagesExample)
  setAsyncItem("mood reports", moodReportsExample)
}

// check login for the inputted user_name and pasword in local storage
// return user_id to enable ability to fetch object with getUser
export async function checkLogin(user_name, password){
  // TO DO check server for login
  return fetchLoginConfirmation(user_name, password).then(async loginResult => {
    // if account exists and is correct
    console.log(loginResult)
    if (loginResult != SERVERERROR){
      // update local storage
      return updateUsers(loginResult).then(async updateResult => {
        return loginResult;
      });
    }

    // else return local database
    return getAsyncItem("users").then(async users => {
      const userResult = users.filter(user => user.user_name == user_name && user.password == password);
      return userResult[0];
    });
  })
}

// check if a mentee has been flagged by a specific mentor
export async function checkIfMenteeFlagged(mentee_id, mentor_id){
  // check if any flags exist
  return fetchMenteeFlags(mentee_id, mentor_id).then(async response => {

    // if mentee flags do exist
    if (result != SERVERERROR){
      // update local storage
      return updateMenteeFlags(response).then(async result => {
        // get most recent flag, if unflagged or not
        console.log(response)
        return response[-1].unflaggedBy == null
      });
    }

    // return database call
    return getAsyncItem("mentee flags").then(async flags => {
      const flagResult = flags.filter(flag => flag.menteeFlagged == mentee_id && flag.flaggedBy == mentor_id );
      return flagResult.length > 0;
    })

  })
}

// check if access code is valid for use
export async function checkAccessCode(accessCode){
  // check server for access codes
  return fetchAccessCode(accessCode).then(async response => {
    // TO DO if error, accesscode does not exist, return false
    if (response.length == 1 ) return true;
    return false;
  });
}

// get chat messages between sender and reciever
export async function getChatMessages(sender_id, reciever_id){
  // get data from server
  return fetchChatMessagesBetweenUsers(sender_id, reciever_id).then(async messages => {
    // replace entire message object between this sender and reciever in local storage
    if (messages != SERVERERROR){
      console.log(messages)
      //await updateChatMessages(messages)
    }

    // then obtain data from local storage
    return getAsyncItem("chat messages").then(async chatMessages => {
      const messages = chatMessages.filter(message => (message.message_sender_id == sender_id && message.message_reciver_id == reciever_id) 
                                                        || (message.message_sender_id == reciever_id && message.message_reciver_id == sender_id));
      return messages;
    })
  })
}

// update and get all mentees mood reports for a specific mentor.
// have to grab all at a time
export async function getMentorsMenteesMoodReports(mentor_id){
  // get all mentee ids for the mentor 
  return getAsyncItem("users").then(async users => {
    const mentees = users.filter(user => user.mentor_id == mentor_id)
    let mentee_ids = [];
    for (index = 0; index < mentees.length; index++){
      mentee_ids.push(mentees[index]["user_id"]) 
    }

    getMoodReportsFromMenteeList(mentees).then(async newMoodReportData => {
      // update local storage with mood reports
      await updateMoodReports(newMoodReportData)
  
      // get mood reports from local storage
      let menteeMoodReports = []
      getAsyncItem("mood reports").then(async moodReports => {
        for (index = 0; index < moodReports.length; index++){
          if (mentee_ids.contains(moodReports[index]["user_id"]))
            menteeMoodReports.push(moodReports[index]["user_id"]) 
        }
      })
      return nmenteeMoodReports
    })

  })
}

// fetch mood reports for a list of mentees
async function getMoodReportsFromMenteeList(mentees){
  let index;
  let newMoodReportData = [];
  // for every mentee, get its mood reports
  for (index = 0; index < mentees.length; index++){
    let mentee_id = mentees[index]["user_id"] 
    fetchMenteeMoodReports(mentee_id).then(async moodreports => {
      if (moodreports != SERVERERROR)
      newMoodReportData.push(moodreports)
    })
  }
  return newMoodReportData;
}

// get all mentees 
export async function getMentees(mentor_id){
  // check for server connection 

  // update local storage from server
  return fetchMentorsAssignedMentees(mentor_id).then(async mentees =>{
    if (mentees != SERVERERROR){
      await updateUsers("users", mentees)
    }

    // then obtain data from local storage
    return getAsyncItem("users").then(async mentees => {
      return getUser(mentor_id).then(async user => {
        const menteesList = mentees.filter(mentee => mentee.mentor_id == mentor_id);
        return menteesList;
      })
        
    })

  })
}


// TO DO: potentially COMBINE with getMentees (getUsersAssignedTo)
// get mentee information specifically for supervisor view
export async function getMentors(supervisor_id){
  // check for server connection

  // update local storage from server
  return fetchMentors(supervisor_id).then(async mentors => {
    if (mentors != SERVERERROR){
      await updateUsers("users", mentors);
    }

    // then obtain data from storage
    return getAsyncItem("users").then(async users => {
      const mentorsList = users.filter(user => user.mentor_id == supervisor_id);
      return mentorsList
    })

  })
}

// get specific user with user_id (mentor, mentee, supervisor)
export async function getUser(user_id){
  // TO DO: GET FROM SERVER
  return fetchUser(user_id).then(async user => {
    // update locally if no error
    if (user != SERVERERROR){
      await updateUsers("users", user);
    }

    return getAsyncItem("users").then(async users => {
      return users.find(user => {
        return user.user_id === user_id;
      })
    })

  })
}

// TO DO FOR SUPERVISORS - get all mentors and mentees in order to pair them all together
// get all mentors underneath the supervisor
export async function getUnassignedMentees(user_id){
  // TO DO: GET FROM SERVER
  return fetchUnassignedMentees(user_id).then(async unassignedMentees => {
    // update locally
    if (unassignedMentees != SERVERERROR){
      updateUsers(unassignedMentees);
      return unassignedMentees
    }

    // return locally
    // TO DO: api call to check if ids are supervisors
    //        obtain all unassigned users locally

    return getAsyncItem("users").then(async users => {
      // let unassigned = users.filter(user => user.mentor_id == user_id)
      // return unassigned
    })

  })

}

// get specific mentee's mood reports
export async function getUserMoodReports(user_id){
  // update mood reports for a mentors mentees
  return fetchMenteeMoodReports(user_id).then(async newmoodreports => {
    // update locally
    if (newmoodreports != SERVERERROR){
      await updateMoodReports(newmoodreports)
    }

    // return local storage
    return getAsyncItem("mood reports").then(async moodReports => {
      const userMoodReports = moodReports.filter(moodreport => moodreport.user_id == user_id)
      return userMoodReports;
    })
  })
}

// ---------------------------------------------------------------- POST
// send new access code to server, store locally
export async function createAccessCode(accessCode, user_id, authorityLevel){
  // TO DO: may need to be specific timezone date
  const createdAt = new Date();
  const expiredAt = new Date();

  // upload to server
  postAccessCode(accessCode, user_id, createdAt, expiredAt, authorityLevel).then(async accessCode => {
    // if success from server
    if (accessCode != SERVERERROR){
      // create access code upload locally
      const accessCodeObject = {
        access_code: accessCode,
        creator_id: user_id,
        created_at: createdAt,
        expired_at: expiredAt,
        authority_level: authorityLevel
      }
      updateAccessCodes(accessCodeObject);
      // TO DO: decide what is returned on success
      return true;
    }

    return SERVERERROR;
  });
}

// send new mentee flag to server, store locally
export async function createFlag(mentee_id, flaggedBy_id, flagReason){
  // TO DO: may need to be specific timezone date
  let flaggedAt = new Date();

  // send data to server
  postMenteeFlag(mentee_id, flaggedBy_id, flaggedAt, flagReason).then(async menteeFlag => {
    if (menteeFlag != SERVERERROR){
      // create flag object, update local storage
      const newFlag = {
        //flag_id: menteeFlag.flag_id,
        mentee_id: mentee_id,
        flagged_by: flaggedBy_id,
        flagged_at: flaggedAt,
        unflagged_by: null,
        unflagged_at: null,
        flag_reason: flagReason,
        unflag_reason: null,
      };

      updateMenteeFlags(newFlag);
      // TO DO: decide what is returned on success
      return true;
    }

    return SERVERERROR
  })
}

// create new user
export async function createUser(username, email, password, firstname, lastname){
  // TO DO: display to user if no internet connection
  // post to server
  return postUserInfo(username, email, password, firstname, lastname).then(async user_id => {
    if (user_id != SERVERERROR){
      // get user object
      fetchUser(user_id).then(async user => {
        if (user != SERVERERROR){
          // save locally
          updateUsers(user);
          return true;
        }

        return SERVERERROR
      })
    }

    return SERVERERROR
  });
}

//create new message 
export async function createMessage(messageText, sender_id, senderName, receiver_id){
  let messageDate = new Date();
  return postNewMessage(messageText, messageDate, sender_id, senderName, receiver_id).then(async message => {
    // store locally
    if (message != SERVERERROR){
      // TO DO: format message to match local database
      //updateMessages()
    }

    // return success
  })
}


// ---------------------------------------------------------------- PATCH
// update flag with unflagging information
export async function unflag(mentee_id, unflaggedBy_id, unflagReason){
  let unflaggedAt = new Date();

  // send data to server
  return patchMenteeUnflag(mentee_id, unflaggedBy_id, unflaggedAt, unflagReason).then(async unflagResult => {

    if (unflagResult != SERVERERROR){
      // update local storage
      return getAsyncItem("mentee flagging").then(async flags => {
        // find locally
        let mentorAndMenteeFlags = flags.filter(flag => flag.mentee_id == mentee_id && flag.unflagged_by == unflaggedBy_id)
        // get most recent flagging between this mentor and mentee
        let mostRecentFlag = mentorAndMenteeFlags.sort(function(a,b){
          return new Date(b.flagged_at) - new Date(a.flagged_at)
        })

        // update flag with unflag information
        // TO DO: NEEDS TO BE ADDED ON SERVER mostRecentFlag.unflaggedBy = unflaggedBy_id;
        mostRecentFlag.timestamp_resolved = unflaggedAt;
        mostRecentFlag.how_resolved = unflagReason;

      })
    }

    return SERVERERROR;
  })

}

// update user email
export async function changeEmail(user_id, newEmail){
  // update server
  return patchUserInfoEmail(user_id, newEmail).then (async patchResult => {
    if (patchResult != SERVERERROR){
      // update local
      getUser(user_id).then(async user => {
        if (user != null){
          user.email = newEmail;
          updateUsers(user)
        }
        // TO DO: user not found
      })
    }

    return SERVERERROR;
  });

}

// update user username
export async function changeUsername(user_id, newUsername){
  // update server
  patchUserInfoUsername(user_id, newUsername).then(async patchResult => {
    if (patchResult != SERVERERROR){
      // update local
      getUser(user_id).then(async user => {
        if (user != null){
          user.user_name = newUsername;
          updateUsers(user)
        }
        // TO DO: user not found
      })
    }

    return SERVERERROR;
  });

}

// update user password
export async function changePassword(user_id, newPassword){
  // update server
  patchUserInfoPassword(user_id, newPassword).then(async patchResult => {
    if (patchResult != SERVERERROR){
      // update local
      getUser(user_id).then(async user => {
        if (user != null){
          user.password = newPassword; // TO DO ENCRYPTION
          updateUsers(user)
        }
        // TO DO: user not found
      })
    }

    return SERVERERROR;
  });
}

// update mentee's mentor
export async function changeMentor(user_id, mentor_id){
  // update server
  patchUserInfoMentor(user_id, mentor_id).then(async patchResult => {
    if (patchResult != SERVERERROR){
      // update local
      getUser(user_id).then(async user => {
        if (user != null){
          user.mentor_id = mentor_id; // TO DO: make sure correct field name for user_info
          updateUsers(user)
        }
        // TO DO: user not found
      })
    }

    return SERVERERROR;
  });

}

// TO DO: USEDACCESS CODE
// update mentee's mentor
export async function useAccessCode(accessCode, ){
  // update server


}





// ---------------------------------------------------------------- UPDATE

// TO DO: make sure this works when given an array or a single object

// update local storage with incoming user information from server
// deletes updated data and pushes new data (same ids)
export async function updateUsers(newUserData){
  let index = 0;
  getAsyncItem("users").then(async userData => {
    // get all ids being updated
    let user_ids = [];

    // if only given one user object
    if (typeof newUserData == 'object'){
      user_ids.push(newUserData["user_id"])
    }
    // if given list of users
    else{
      for (index = 0; index < newUserData.length; index++){
        user_ids.push(newUserData[index]["user_id"])
      }
    }

    // remove old data from async storage
    userData = userData.filter(user => !user_ids.includes(user.user_id))

    // insert in all new data
    userData.push(newUserData) // TO DO: make sure this is not inserting the whole array, but combining them
    setAsyncItem("users", userData);
  })
}

// update local storage with incoming chat information from server
// deletes updated data and pushes new data (same ids)
export async function updateChatMessages(newChatData){
  let index = 0;
  getAsyncItem("chat messages").then(async chatData => {
    // get all ids being updated
    let message_ids = [];

    // if only given one chat message object
    if (typeof newChatData == 'object'){
      message_ids.push(newChatData["message_id"])
    }
    // if given list of chat messages
    else{
      for (index = 0; index < newChatData.length; index++){
        message_ids.push(newChatData[index]["message_id"])
      }
    }

    // remove old data from async storage
    chatData = chatData.filter(message => !message_ids.includes(message.message_id))

    // insert in all new data
    chatData.push(newChatData) // TO DO: make sure this is not inserting the whole array, but combining them
    setAsyncItem("chat messages", chatData);
  })
}

// update local storage with incoming chat information from server
// deletes updated data and pushes new data (same ids)
export async function updateMoodReports(newMoodReportData){
  let index = 0;
  getAsyncItem("mood reports").then(async moodReportData => {
    // get all ids being updated
    let moodreport_ids = [];

    // if only given one mood report object
    if (typeof newMoodReportData == 'object'){
      moodreport_ids.push(newMoodReportData["moodreport_id"])
    }
    // if given list of mood reports
    else{
      for (index = 0; index < newMoodReportData.length; index++){
        moodreport_ids.push(newMoodReportData[index]["moodreport_id"])
      }
    }

    // remove old data from async storage
    moodReportData = moodReportData.filter(moodReport => !moodreport_ids.includes(moodReport.moodreport_id))

    // insert in all new data
    moodReportData.push(newMoodReportData) // TO DO: make sure this is not inserting the whole array, but combining them
    setAsyncItem("mood reports", moodReportData);
  })
}

export async function updateAccessCodes(newAccessCodesData){
  
  getAsyncItem("access codes").then(async accessCodesData => {

    // get all ids being updated
    let accessCodesToDelete = [];

    // if only given one mood report object
    if (typeof newAccessCodesData == 'object'){
      accessCodesToDelete.push(newAccessCodesData["access_code"])
    }
    // if given list of mood reports
    else{
      for (index = 0; index < newAccessCodeData.length; index++){
        accessCodesToDelete.push(newAccessCodesData[index]["moodreport_id"])
      }
    }

    // remove old data from async storage
    accessCodesData = accessCodesData.filter(accessCode => !accessCodesToDelete.includes(accessCode.access_code))

    // insert in all new data
    accessCodesData.push(newAccessCodesData) // TO DO: make sure this is not inserting the whole array, but combining them
    setAsyncItem("access codes", accessCodesData);
  }) 
}

export async function updateMenteeFlags(newFlagData){
  getAsyncItem("mentee flags").then( async flagData => {
    // get all ids being updated
    let menteeFlagIds = [];

    // if only given one mood report object
    if (typeof newFlagData == 'object'){
      menteeFlagIds.push(newFlagData["access_code"])
    }
    // if given list of mood reports
    else{
      for (index = 0; index < newFlagData.length; index++){
        menteeFlagIds.push(newFlagData[index]["moodreport_id"])
      }
    }

    // remove old data from async storage
    flagData = flagData.filter(flag => !menteeFlagIds.includes(flag.flag_id))

    // insert in all new data
    flagData.push(newFlagData) // TO DO: make sure this is not inserting the whole array, but combining them
    setAsyncItem("mentee flags", flagData);
  })
}


// UNUSED
/*export async function getEvents(user_name){
  return getUser(user_name).then(async user => {
    return user.events;
  })
}*/

