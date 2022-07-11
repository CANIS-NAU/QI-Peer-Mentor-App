import { serverurl } from '../../config';

// fetch all new data
export function fetchAllData(){
    fetchNewMoodReports()
    fetchNewUserInfo()
}

// MOOD REPORTS
// fetch all mood reports
export async function fetchNewMoodReports(){
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
        return -999;
    };
}


// USER INFO
// fetch all user info
// TO DO: CATCH FOR ERROR, RETURN ERROR CODE
export async function fetchNewMentees(){
    try{
        const response = await fetch(`${serverurl}userinfos`, {
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
        return -999;
    };
}

export async function fetchNewMentorUsers(){
    try{
        fetch(`${serverurl}mentoruserinfos`, {
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
        return -999;
    };
}

export async function fetchNewAccessCodes(){
    try{
        fetch(`${serverurl}accesscodes`, {
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
        return -999;
    };
}

export async function fetchNewMenteeFlags(){
    try{
        fetch(`${serverurl}menteeflags`, {
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
        return -999;
    };
}

export async function fetchNewChatMessages(){
    try{
        fetch(`${serverurl}chatmessages`,{
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
        return -999;
    };
}

export async function postMentorUserInfo(data){
    try{
        fetch(`${serverurl}postuserinfos`, {
            method: 'POST',
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
        return -999;
    };
}

export async function postAccessCodes(){
    try{
        fetch(`${serverurl}postaccesscodes`, {
            method: 'POST',
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
        return -999;
    };
}

export function pushAllData(){  
    // TO DO: IMPLEMENT put calls for peer mentor app data to the arora server
    pushUserInfo()
    pushMoodReports()
}