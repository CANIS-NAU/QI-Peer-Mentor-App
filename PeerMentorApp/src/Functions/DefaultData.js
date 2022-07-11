
// async key: "access codes"
export const accessCodesExample = [
  {
    code: "12345",
    authority: "mentor",
    createdBy: "admin" // username of mentor/supervisor who created
  }
]

// async key: "mentees"
export const menteeDataExample = [
  {
    last_login: null,
    username: "danielsanchez",
    first_name: "Daniel",
    last_name: "Sanchez",
    is_staff: false,
    is_active: false,
    date_joined: null,
    UserInfoId: null,
    UserCurrentMoodUpdated: null,
    UserCreatedAt: null,
    UserId: 1,
    email: "danielsanchez@gmail.com"
  },
  {
    last_login: null,
    username: "emiliaclark",
    first_name: "Emilia",
    last_name: "Clark",
    is_staff: false,
    is_active: true,
    date_joined: null,
    UserInfoId: 2,
    UserCurrentMoodUpdated: null,
    UserCreatedAt: null,
    UserId: 2,
    email: "emiliaclark@gmail.com"
  },
  {
    last_login: null,
    username: "jeremysmith",
    first_name: "Jeremy",
    last_name: "Smith",
    is_staff: false,
    is_active: true,
    date_joined: null,
    UserInfoId: 3,
    UserCurrentMoodUpdated: null,
    UserCreatedAt: null,
    UserId: null,
    email: "jeremysmith@gmail.com"
  },
]

// async key: "mentors"
export const mentorDataExample = [
  {
    userId: 1,
    firstname: "Ashleea",
    lastname: "Holloway",
    username: "ashleea",
    password: "ashleea",
    email: "amh999@nau.edu",
    authority: "mentor",
    menteeIds: [1, 2, 3],
  }
]

// async key: "mood reports"
export const moodReportData = [
  {
    MoodReportId: null,
    MoodReportCreatedAt: null,
    Q1MoodResponse: null,
    Q2MoodResponse: null,
    UserId: null,
  }
]

// async key: "mentee flags"
export const menteeFlags = [
  {
    menteeFlagged: null,
    flaggedBy: null,
    date: null,
  }
]

// async key: "chat messages"
export const chatMessages = [
  {
    convoId: null,
    messages: [],
  }
]

// async key: "current user"
// starts off non existent until login, only holds locally NO SERVER ACCESS