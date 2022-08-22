import React, { Component, useState, useEffect } from 'react';
import {styles} from '../stylesheet';
import { StyleSheet, View, Text, TextInput, Button, Pressable, Image, FlatList, RefreshControl } from 'react-native';
import { getUserMoodReports } from '../Functions/AsyncDatabase';

// Class to retreive mentee mood report and user info data from the ARORA server.
export default function MenteeMoodReports({navigation, mentee}){

    // TO DO: implement system to regularly call to fetch new data
    const [moodreports, setMoodReports] = React.useState([])
    const [searchMoodReports, setSearchMoodReports] = React.useState([])

    useEffect(() => {
        // get mood report data for user
        getUserMoodReports(mentee.user_id).then( results => {
            setMoodReports(results);
            setSearchMoodReports(results);
        })
    }, []);


    const searchQueryMoodReports = (query) => {
        if (query == ''){
            setSearchMoodReports(moodreports)
        }
        else{
            let queryMoodReports = []
            for (let moodreport of moodreports ){
                if (JSON.stringify(moodreport.mood_report_created_at).includes(query) 
                    || moodreport.q1_response.includes(query.toLowerCase())
                    || moodreport.q2_response.includes(query.toLowerCase())){
                queryMoodReports.push(moodreport)
                }
            }
            setSearchMoodReports(queryMoodReports)
        }
    }

    const MoodReportItem = ({moodreport}) => (
        <View style={styles.moodreport}>
                <Text style={styles.moodreporttext}>Date: {moodreport.mood_report_created_at}</Text>
                <Text style={styles.moodreporttext}>Mood: {moodreport.q1_response}</Text>
                <Text style={styles.moodreporttext}>Stress Level: {moodreport.q2_response}</Text>
        </View>
    )
    
    const renderMoodReport = ({ item: moodreportitem }) => (
        <MoodReportItem moodreport = {moodreportitem} />
    )
    
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    
    const [refreshing, setRefreshing] = React.useState(false);
    
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    return(
        <View>
            <TextInput style={styles.logininput}
                placeholder="Search"
                onChangeText = {searchQuery => searchQueryMoodReports(searchQuery)}
            />

            <Text>Mentee Mood Reports</Text>
            <FlatList
                contentContainerStyle={{flexGrow:1}}
                data={searchMoodReports}
                keyExtractor={(item, index) => index}
                renderItem={renderMoodReport}
                refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
                }
            />
        </View>
    )
}