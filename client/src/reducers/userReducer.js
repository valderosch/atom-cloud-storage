const SET_USER = "SET_USER";
const SET_USER_DATA = "SET_USER_DATA";
const LOGOUT = "LOGOUT";

const defaultState = {
    currentUser: {},
    userData: null,
    isAuthorised: false
}
export default function userReducer(state = defaultState,  action){
    switch (action.type){
        case SET_USER:
            return {
                ...state,
                currentUser: action.payload.user,
                isAuthorised: true
            }
        case SET_USER_DATA:
            return {
                ...state,
                userData: action.payload
            }
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                currentUser: {},
                userData: {},
                isAuthorised: false
            }
        default:
            return state;
    }
}

export const setUser = user => ({
    type: SET_USER,
    payload: user,
})

export const setUserData = (data) => ({
    type: SET_USER_DATA,
    payload: data,
})

export const logOut = () => ({
    type: LOGOUT
})