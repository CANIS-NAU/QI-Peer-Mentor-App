
// async key: "access codes"
export const accessCodesExample = [
  {
    access_code: null,
    creator_id: null,
    created_at: null,
    expired_at: null,
    authority_level: null,
  }
]

// async key: "users"
export const userDataExample = [
  {
    user_info_id: 1,
    user_current_mood_updated: "1979-12-31T00:00:00Z",
    user_current_mood: 0,
    user_id: -1,
    user_name: "supervisor",
    password: "supervisor",
    first_name: "The",
    last_name: "Supervisor",
    email: "supervisor@nau.edu",
    mentor_id: null,
    user_b0_count: 0,
    user_b1_count: 0,
    user_b2_count: 0,
    user_b3_count: 0,
    user_b4_count: 0,
    user_current_butterfly: 0,
    user_pollen: 0
},
  {
      user_info_id: 1,
      user_current_mood_updated: "1979-12-31T00:00:00Z",
      user_current_mood: 0,
      user_id: 2147483648,
      user_name: "amh999",
      password: "amh999",
      first_name: "Ashleea",
      last_name: "Holloway",
      email: "amh999@nau.edu",
      mentor_id: -1,
      user_b0_count: 0,
      user_b1_count: 0,
      user_b2_count: 0,
      user_b3_count: 0,
      user_b4_count: 0,
      user_current_butterfly: 0,
      user_pollen: 0
  },
  {
      user_info_id: 2,
      user_current_mood_updated: "1979-12-31T00:00:00Z",
      user_current_mood: 0,
      user_id: 2,
      user_name: "ameliafoster",
      password: "amelia",
      first_name: "Amelia",
      last_name: "Foster",
      email: "af82@nau.edu",
      mentor_id: 2147483648,
      user_b0_count: 0,
      user_b1_count: 0,
      user_b2_count: 0,
      user_b3_count: 0,
      user_b4_count: 0,
      user_current_butterfly: 0,
      user_pollen: 0
  },
  {
      user_info_id: 4,
      user_current_mood_updated: "1979-12-31T00:00:00Z",
      user_current_mood: 0,
      user_id: 3,
      user_name: "adamheart",
      password: "adamheart",
      first_name: "Adam",
      last_name: "Heart",
      email: "ah876@nau.edu",
      mentor_id: 2147483648,
      user_b0_count: 0,
      user_b1_count: 0,
      user_b2_count: 0,
      user_b3_count: 0,
      user_b4_count: 0,
      user_current_butterfly: 0,
      user_pollen: 0
  },
  {
      user_info_id: 5,
      user_current_mood_updated: "1979-12-31T00:00:00Z",
      user_current_mood: 0,
      user_id: 4,
      user_name: "angelasmith",
      password: "angelasmith",
      first_name: "Angela",
      last_name: "Smith",
      email: "as900@nau.edu",
      mentor_id: 2147483648,
      user_b0_count: 0,
      user_b1_count: 0,
      user_b2_count: 0,
      user_b3_count: 0,
      user_b4_count: 0,
      user_current_butterfly: 0,
      user_pollen: 0
  }
]


// async key: "mood reports"
export const moodReportsExample = [
  {
    mood_report_created_at: new Date(),
    mood_report_id: 1,
    q1_response: 1,
    q2_response: 1,
    user_id: 2,
  },
  {
    mood_report_created_at: new Date(),
    mood_report_id: 2,
    q1_response: 2,
    q2_response: 2,
    user_id: 2,
  },
  {
    mood_report_created_at: new Date(),
    mood_report_id: 3,
    q1_response: 1,
    q2_response: 1,
    user_id: 3,
  },
  {
    mood_report_created_at: new Date(),
    mood_report_id: 4,
    q1_response: 2,
    q2_response: 1,
    user_id: 3,
  },
  {
    mood_report_created_at: new Date(),
    mood_report_id: 5,
    q1_response: 1,
    q2_response: 2,
    user_id: 3,
  },
  {
    mood_report_created_at: new Date(),
    mood_report_id: 6,
    q1_response: 2,
    q2_response: 2,
    user_id: 4,
  },
  {
    mood_report_created_at: new Date(),
    mood_report_id: 7,
    q1_response: 2,
    q2_response: 2,
    user_id: 4,
  },
]

// async key: "mentee flags"
export const menteeFlags = [
  {
    menteeFlagged: null,
    flaggedBy: null,
    date: null,
  }
]

// TO DO: change parameters to be correct when pulling and sending data to server
// async key: "chat messages"
export const chatMessagesExample = [
  {
    message_id: 1,
    convo_id: 1,
    message_text: "Hello!", // message_text when sending to the server
    message_date: new Date(),
    message_sender_id: 2147483648,
    message_reciver_id: 2,
    sender_name: 'amh999',
  },
  {
    message_id: 2,
    convo_id: 1,
    message_text: "How are you?",
    message_date: new Date(),
    message_sender_id: 2147483648,
    message_reciver_id: 2,
    sender_name: 'amh999',
  },
  {
    message_id: 3,
    convo_id: 1,
    message_text: "I'm good.",
    message_date: new Date(),
    message_sender_id: 2,
    message_reciver_id: 2147483648,
    sender_name: 'ameliafoster',
  },
  {
    message_id: 4,
    convo_id: 2,
    message_text: "I have a question",
    message_date: new Date(),
    message_sender_id: 3,
    message_reciver_id: 2147483648,
    sender_name: 'adamheart',
  },
  {
    message_id: 5,
    convo_id: 3,
    message_text: "I'm in need of some guidance",
    message_date: new Date(),
    message_sender_id: 4,
    message_reciver_id: 2147483648,
    sender_name: 'angelasmith',
  }
]

// async key: "current user"
// starts off non existent until login, only holds locally NO SERVER ACCESS