import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT
} from './actionTypes';

const initialState = {
    isProcessing: false,
    userDetails: null,
    accessToken: null,
    loginError: false,
}

export default function (state = initialState, action) {
    switch(action.type) {
        case LOGIN:
            return {
                ...state,
                isProcessing: true,
                loginError: false,
                userDetails: null,
                accessToken: null,
            }
        case LOGIN_SUCCESS:
            const { details, accessToken, refreshToken } = action.payload 
            return {
                ...state,
                isProcessing: false,
                loginError: false,
                userDetails: details,
                accessToken,
            }
        case LOGIN_FAILED:
            return {
                ...state,
                isProcessing: false,
                loginError: action.payload,
                userDetails: null,
                accessToken: null
            }
        case LOGOUT:
            return {
                ...state,
                isProcessing: false,
                loginError: false,
                userDetails: null,
                accessToken: null
            }
        default:
            return state
    }
}