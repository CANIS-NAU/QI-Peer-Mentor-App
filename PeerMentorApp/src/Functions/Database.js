import { fetchNewMoodReports, fetchNewUserInfo } from './ARORAServer';
import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

// NO LONGER IN USE, SAVED FOR REFERENCE.



// mentee
const userInfoInsertInto = 'INSERT OR IGNORE INTO UserInfos_userinfo (password, last_login, is_superuser, username, first_name '
                                + 'last_name, is_staff, is_active, date_joined, UserInfoId, UserCurrentMoodUpdated '
                                + 'UserCreatedAt, UserCatchingDate, UserNameOfStrength, UserCurrentMood, UserId, '
                                + 'UserB0Count, UserB1Count, UserB2Count, UserB3Count, UserB4Count '
                                + 'UserCurrentLocationLat, UserCurrentLocationLong, UserCurrentLocationUpdated, '
                                + 'UserCurrentButterfly, UserPollen, email) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';

const userInfoSelectById = 'SELECT 1 from UserInfos_userinfo WHERE UserId = (?)';

const userInfoSelectAll = 'SELECT * FROM UserInfos_userinfo';

// mentors
const mentorUserInfoInsertInto = 'INSERT OR IGNORE INTO PeerMentor_UserInfo (firstname, lastname, username, password, email, authority'
                            + ') VALUES (?,?,?,?,?,?)';

const mentorUserInfoSelectByUsername = 'SELECT 1 from PeerMentor_UserInfo WHERE username = (?)';

const mentorUserInfoSelectAll = 'SELECT * FROM PeerMentor_UserInfo';

// mood reports
const moodReportInsertInto = 'INSERT OR IGNORE INTO MoodReports_moodreport (MoodReportId, MoodReportCreatedAt, Q1MoodResponse, '
                                + 'Q2MoodResponse, UserId) VALUES (?,?,?,?,?)';

const moodReportSelectAllById = 'SELECT * from MoodReports_moodreport WHERE UserId = (?)';

const moodReportsSelectAll = 'SELECT * from MoodReports_moodreport';

// path to database in folder
var pathToDatabaseFile = './peermentordb.sqlite3';

//var db = SQLite.openDatabase({name: "peermentordb", createFromLocation: "~db/peermentordb.sqlite3"}, "ok.", "error.");
// TO DO: database needs to be of global use

async function openDatabase(){
    
    const database = SQLite.openDatabase("peermentordb.sqlite3")
    database._db.close()

    if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
      await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
    }
    await FileSystem.downloadAsync(
      Asset.fromModule(require('./peermentordb.sqlite3')).uri,
      FileSystem.documentDirectory + 'SQLite/peermentordb.sqlite3'
    );
    return SQLite.openDatabase('peermentordb.sqlite3');
}

// everytime a component is rendered, call to get data from server and store
export async function updateData(){
    getAllUserInfo();
    getAllUserMoodReports();
}

// store mood reports in database
export async function storeMoodReportData(json){
    // check for invalid json call (all columns present?)
    const db = await openDatabase();
    console.log(json)
    try{
        json.forEach( moodReport => {
            db.transaction( txn => {
                txn.executeSql(`${moodReportInsertInto}`, 
                [
                    moodReport.MoodReportId,
                    moodReport.MoodReportCreatedAt,
                    moodReport.Q1MoodResponse,
                    moodReport.Q2MoodResponse,
                    moodReport.UserId
                ], 
                (txn, results) => {
                    console.log("Mood Reports stored successfully!")
                },
                (_, err) => {
                    console.log(err)
                });
            });
        })
    }
    catch(error){
        console.log(`Error occurred while inserting into mood reports table.\n${error}`)
    };
}

// store mood reports in database
export async function storeUserInfoData(json){
    // check for invalid json call (all columns present?)
    const db = await openDatabase();
    try{
        db.transaction( txn => {
            json.forEach( userInfo => {
                txn.executeSql(`${userInfoInsertInto}`, 
                [
                    userInfo.password,
                    userInfo.last_login,
                    userInfo.is_superuser,
                    userInfo.username,
                    userInfo.first_name,
                    userInfo.last_name,
                    userInfo.is_staff,
                    userInfo.is_active,
                    userInfo.date_joined,
                    userInfo.UserInfoId,
                    userInfo.UserCurrentMoodUpdated,
                    userInfo.UserCreatedAt,
                    userInfo.UserCatchingDate,
                    userInfo.UserNameOfStrength,
                    userInfo.UserCurrentMood,
                    userInfo.UserId,
                    userInfo.UserB0Count,
                    userInfo.UserB1Count,
                    userInfo.UserB2Count,
                    userInfo.UserB3Count,
                    userInfo.UserB4Count,
                    userInfo.UserCurrentLocationLat,
                    userInfo.UserCurrentLocationLong,
                    userInfo.UserCurrentLocationUpdated,
                    userInfo.UserCurrentButterfly,
                    userInfo.UserPollen,
                    userInfo.email
                ], 
                (txn, results) => {
                    console.log(`User Info stored successfully!`);
                    return results;
                })
            })
        })
    }catch(error){
        console.log(`Error occurred while inserting into user info table.\n${error}`)
    };
}

// get specific users mood reports
export async function getAllUserMoodReports(){
    const db = await openDatabase();
    try{
        // update tables from server
        const json = await fetchNewMoodReports();
        const store = await storeMoodReportData(json);

        //proceed to send back information
        if (json != -999){
            db.transaction( txn => {
                txn.executeSql(`${moodReportsSelectAll}`, [], 
                (txn, results) => {
                    console.log(`Mood Report Info obtained successfully!`)
                    return results;
                })
            })
        }
        else{
            console.log("Error obtaining moodreports.")
            return json
        }
    }catch(error){
        console.log(`Error occurred while retrieving mood reports.\n${error}`)
    };
}

// get specific users info
export async function getAllUserInfo(){
    const db = await openDatabase();
    try{
        // update tables from server
        const json = await fetchNewUserInfo();
        const store = await storeUserInfoData(json);

        if (json != -999){
            //proceed to send back information
            db.transaction( txn => {
                txn.executeSql(`${userInfoSelectAll}`, [], 
                (txn, results) => {
                    console.log(`User Info obtained successfully!`)
                    return results.rows._array;
                })
            })
        }
        else{
            console.log("Error obtaining userinfo")
            return json
        }
    }catch(error){
        console.log(`Error occurred while retrieving user info.\n${error}`)
    };
}

// get async specific users mood reports
export async function getUserMoodReports(userId){
    const db = await openDatabase();
    try{
        // update tables from server
        const json = fetchNewMoodReports();
        storeMoodReportData(json)

        //proceed to send back information
        if (json != -999){
            db.transaction( txn => {
                txn.executeSql(`${moodReportSelectAllById}`, [userId], 
                (txn, results) => {
                    console.log(`Mood Report Info obtained successfully!\n`)
                    return results;
                })
            })
        }
        else{
            return json
        }
    }catch(error){
        console.log(`Error occurred while retrieving mood reports.\n${error}`)
    };
}

// get specific users info
export async function getUserInfo(userId){
    const db = await openDatabase();
    try{
        // update tables from server
        const json = fetchNewUserInfo();
        storeUserInfoData(json)

        if (json != -999){
            //proceed to send back information
            db.transaction( txn => {
                txn.executeSql(`${userInfoSelectById}`, [userId], 
                (txn, results) => {
                    console.log(`Specific User Info obtained successfully!\n`)
                    return results;
                })
            })
        }
        else{
            return json
        }
    }catch(error){
        console.log(`Error occurred while retrieving user info.\n${error}`)
    };
}

// get specific users info
export async function getMentorUserInfo(){
    const db = await openDatabase();
    try{
        // update tables from server
        //const json = fetchNewUserInfo();
        //storeUserInfoData(json)

        //proceed to send back information
        db.transaction( txn => {
            txn.executeSql(`${mentorUserInfoSelectAll}`, [], 
            (txn, results) => {
                console.log(`Mentor User Info Successfully Obtained!\n${results.rows._array}`)
                return results;
            })
        })

    }catch(error){
        console.log(`Error occurred while retrieving user info.\n${error}`)
    };
}

// check username and password input as valid account
export async function checkLogin(username, password){
    const db = await openDatabase();
    // attempt connection on internet, 
    // if not connected, check local accounts TO DO
    console.log('opened database')
    try{
        db.transaction( txn => {
            txn.executeSql(`${mentorUserInfoSelectByUsername}`, [username], 
            (txn, results) => {
                console.log(results)
                console.log(`Login Checked!\n${results.rows._array}`)
                // TO DO check for success
                if (results.rows.length == 1){
                    console.log("returning true")
                    return true;
                }
                console.log("returning false")
                return false;
            })
        })
        console.log('got past')
    }
    catch(error){
        console.log(error);
    }

}

export async function getUserObject(username){
    // make user object from data to pass around as params
    const db = await openDatabase();
    try{
        db.transaction( txn => {
            txn.executeSql(`${mentorUserInfoSelectByUsername}`, [username], 
            (txn, results) => {
                console.log(`User Info Object obtained successfully!\n${results.rows._array}`)
                return results.rows._array;
            })
        })
    }
    catch(error){
        console.log(error);
    }
}


export async function defaultUser(){
    const db = await openDatabase();
    try{
        db.transaction( txn => {
            txn.executeSql(`${mentorUserInfoInsertInto}`, ['Ashleea', 'Holloway', 'amh999', 'pass', 'amh999@nau.edu', "mentor"], 
            (txn, results) => {
                console.log(`Default mentor inserted successfully!`)
            })
        })
    }
    catch(error){
        console.log(error);
    }
}
  
