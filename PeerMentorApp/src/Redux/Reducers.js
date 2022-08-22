
// UserInfo
export default function UserInfoReducer(state = {}, action: any) {
    switch (action.type) {
      case "FETCH_USERINFO_START":
        return {
          items: [],
          loading: true,
          isError: false,
        };
      case "FETCH_USERINFO_SUCCESS":
        return {
          items: action.data,
          loading: false,
          isError: false,
        };
  
      case "FETCH_USERINFO_FAILURE":
        return {
          items: [],
          loading: false,
          isError: true,
          errorMessage: action.errorMessage
      };
      default:
        return state;
    }
  }
      
  