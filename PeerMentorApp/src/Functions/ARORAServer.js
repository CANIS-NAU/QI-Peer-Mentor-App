import { serverurl } from '../../config';
import { menteeDataExample } from './DefaultData';

const ERROR = -999;

// fetch all new data
export function fetchAllData(){
    //fetchNewMoodReports()
    //fetchNewUserInfo()
}

// put all data
export function putAllData(){  
    // TO DO: IMPLEMENT put calls for peer mentor app data to the arora server
    //pushUserInfo()
    //pushMoodReports()
}

// ----------------------------------------------------------------- MOOD REPORTS
// fetches all mood reports on the server
export async function fetchAllMoodReports(){
    try{
        const response = await fetch(`${serverurl}moodreports`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
        const json = await response.json();
        console.log(`Obtained mood report data from server.`)
        return json;
    }
    catch(error){
        console.error(error)
        console.log(`Error retrieving data from server.\n${error}`)
        return ERROR;
    };
}

// fetch specific mentee's mood reports
export async function fetchMenteeMoodReports(user_id){
    try{
        const response = await fetch(`${serverurl}moodreports/${user_id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
        const json = await response.json();
        console.log(`Obtained ${user_id}'s mood report data from server.`)
        return json;
    }
    catch(error){
        console.error(error)
        console.log(`Error retrieving data from server.\n${error}`)
        return ERROR;
    };
}




// ----------------------------------------------------------------- USER INFO
// fetch user
export async function fetchUser(user_id){
    try{
        const response = await fetch(`${serverurl}userinfo/${user_id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
        const json = await response.json();
        console.log(`Obtained user data from server.`);
        return json;

    }catch(error){
        console.error(error);
        console.log(`Error retrieving data from server.\n${error}`)
        return ERROR;
    };
}


// check login with username and password
export async function fetchLoginConfirmation(username, password){
   try{
    const response = await fetch(`${serverurl}api-token-auth/`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "username": username,
            "password": password
        })
    })
    const json = await response.json();
    console.log(`Obtained login confirmation from server: ${json.user_id}`);
    
    // check for validity, user exists
    if (json.user_id){
        return json
    }
    return ERROR;

   }catch(error){
    console.error(error);
    console.log(`Error retrieving data from server.\n${error}`)
    return ERROR;
   }

}
// fetch all unassigned mentees
// params: user_id for a supervisor
export async function fetchUnassignedMentees(user_id){
    try{
        const response = await fetch(`${serverurl}unassignedmentees/user_id`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
        const json = await response.json();
        console.log(`Obtained user data from server.`);
        return json;

    }catch(error){
        console.error(error);
        console.log(`Error retrieving data from server.\n${error}`)
        return ERROR;
    };
}

// fetch all assigned mentees for a specific mentor
// params: user_id for a mentor MAY NEED TO BE USERNAME?
export async function fetchMentorsAssignedMentees(user_id){
    try{
        const response = await fetch(`${serverurl}assignedmentees/${user_id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
        const json = await response.json();
        console.log(`Obtained user data from server.`);
        return json;

    }catch(error){
        console.error(error);
        console.log(`Error retrieving data from server.\n${error}`)
        return ERROR;
    };
}

// TO DO: fetch mentors for specifically supervisor view
export async function fetchMentors(user_id){
    try{
        const response = await fetch(`${serverurl}userinfo/${user_id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
        const json = await response.json();
        console.log(`Obtained user data from server.`);
        return json;

    }catch(error){
        console.error(error);
        console.log(`Error retrieving data from server.\n${error}`)
        return ERROR;
    };
}

// post new user
export async function postUserInfo(username, email, password, firstname, lastname){
    try{
        fetch(`${serverurl}createuser`, {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
                first_name: firstname,
                last_name: lastname
            }),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then((response) => response.json())
        .then((json) => {
            return json;
        })
    }catch(error){
        console.error(error);
        console.log(`Error retrieving data from server.\n${error}`)
        return ERROR;
    };
}

// update username for a user
export async function patchUserInfoUsername(user_id, username){
    try{
        fetch(`${serverurl}userinfo/${user_id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                username: username,
            }),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then((response) => response.json())
        .then((json) => {
            return json;
        })
    }catch(error){
        console.error(error);
        console.log(`Error retrieving data from server.\n${error}`)
        return ERROR;
    };
}

// update password for a user
export async function patchUserInfoPassword(user_id, password){
    try{
        fetch(`${serverurl}userinfo/${user_id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                password: password,
            }),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then((response) => response.json())
        .then((json) => {
            return json;
        })
    }catch(error){
        console.error(error);
        console.log(`Error retrieving data from server.\n${error}`)
        return ERROR;
    };
}

// update email for a user
export async function patchUserInfoEmail(user_id, email){
    try{
        fetch(`${serverurl}userinfo/${user_id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                email: email,
            }),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then((response) => response.json())
        .then((json) => {
            return json;
        })
    }catch(error){
        console.error(error);
        console.log(`Error retrieving data from server.\n${error}`)
        return ERROR;
    };
}

// change mentor of a mentee
// params: user_id of a mentee to be updated, user_id of mentor to be assigned to
export async function patchUserInfoMentor(mentee_id, mentor_id){
    try{
        const response = await fetch(`${serverurl}changementor/${mentee_id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                mentor_id: mentor_id,
            }),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
        const json = await response.json();
        console.log(`Obtained user data from server.`);
        return json;

    }catch(error){
        console.error(error);
        console.log(`Error retrieving data from server.\n${error}`)
        return ERROR;
    };
}




// ----------------------------------------------------------------- ACCESS CODES
// checks for existence of access code (valid access code)
// returns access code object or else error
export async function fetchAccessCode(accessCode){
    try{
        fetch(`${serverurl}AccessCodes/${accessCode}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then((response) => response.json())
        .then((json) => {
            return json;
        })
    }catch(error){
        console.error(error);
        console.log(`Error retrieving data from server.\n${error}`)
        return ERROR;
    };
}

// push new access code
export async function postAccessCode(accessCode, user_id, createdAt, expiredAt, authorityLevel){
    try{
        fetch(`${serverurl}AccessCode`, {
            method: 'POST',
            body: JSON.stringify({
                access_code: accessCode,
                creator_id: user_id,
                created_at: createdAt,
                expired_at: expiredAt,
                authority_level: authorityLevel,
            }),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then((response) => response.json())
        .then((json) => {
            return json;
        })
    }catch(error){
        console.error(error);
        console.log(`Error retrieving data from server.\n${error}`)
        return ERROR;
    };
}



// ----------------------------------------------------------------- MENTEE FLAGGING
// fetch flags on a specific mentee
export async function fetchMenteeFlags(user_id){
    try{
        fetch(`${serverurl}menteeflags/${user_id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then((response) => response.json())
        .then((json) => {
            return json;
        })
    }catch(error){
        console.error(error);
        console.log(`Error retrieving data from server.\n${error}`)
        return ERROR;
    };
}

// post new mentee flag
export async function postMenteeFlag(mentee_id, mentor_id, flaggedAt, flagReason){
    try{
        fetch(`${serverurl}menteeflag`, {
            method: 'POST',
            body: JSON.stringify({
                mentee_id: mentee_id,
                flagged_by: mentor_id,
                flagged_at: flaggedAt,
                flag_reason: flagReason,
            }),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then((response) => response.json())
        .then((json) => {
            return json;
        })
    }catch(error){
        console.error(error);
        console.log(`Error retrieving data from server.\n${error}`)
        return ERROR;
    };
}

// patch mentee unflag
export async function patchMenteeUnflag(mentee_id, mentor_id, unflaggedAt, unflagReason){
    try{
        fetch(`${serverurl}menteeflag`, {
            method: 'POST',
            body: JSON.stringify({
                mentee_id: mentee_id,
                unflagged_by: mentor_id,
                unflagged_at: unflaggedAt,
                unflag_reason: unflagReason,
            }),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then((response) => response.json())
        .then((json) => {
            return json;
        })
    }catch(error){
        console.error(error);
        console.log(`Error retrieving data from server.\n${error}`)
        return ERROR;
    };
}

// ----------------------------------------------------------------- CHAT
// fetch all chat messages that contains a user
export async function fetchUserChatMessages(user_id){
    try{
        fetch(`${serverurl}MentorChats/${user_id}`,{
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then((response) => response.json())
        .then((json) => {
            return json;
        })
    }catch(error){
        console.error(error);
        console.log(`Error retrieving data from server.\n${error}`)
        return ERROR;
    };
}

// fetch all chat messages between two users
export async function fetchChatMessagesBetweenUsers(sender_id, reciever_id){
    try{
        fetch(`${serverurl}MessagesBetweenUsers/${sender_id}/${reciever_id}`,{
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then((response) => response.json())
        .then((json) => {
            if (json != null){
                return json;
            }
            return ERROR;
        })
    }catch(error){
        console.error(error);
        console.log(`Error retrieving data from server.\n${error}`)
        return ERROR;
    };
}

// post new message between two users
export async function postNewMessage(messageText, messageDate, sender_id, senderName, receiver_id){
    try{
        fetch(`${serverurl}Message`,{
            method: 'POST',
            body: JSON.stringify({
                message_text: messageText,
                message_date: messageDate,
                message_sender_id: sender_id,
                sender_name: senderName,
                message_reciver_id: receiver_id,
            }),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then((response) => response.json())
        .then((json) => {
            return json;
        })
    }catch(error){
        console.error(error);
        console.log(`Error retrieving data from server.\n${error}`)
        return ERROR;
    };
}


// delete message between two users
export async function deleteMessage(message_id){
    try{
        fetch(`${serverurl}Message/${message_id}`,{
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then((response) => response.json())
        .then((json) => {
            return json;
        })
    }catch(error){
        console.error(error);
        console.log(`Error retrieving data from server.\n${error}`)
        return ERROR;
    };
}