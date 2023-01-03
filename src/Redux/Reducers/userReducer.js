import * as types from "../Actions/actionTypes";

const initialState = {
    loading: false,
    currentUser: null,
    error: null,
}

const userReducer = (state = initialState, action) => {
    console.log('action.payload', action.payload)
    switch (action.type) {
        case types.REGISTER_START:
            return {
                ...state,
                loading: true,
            }
        case types.REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                currentUser: action.payload,
            }
        case types.REGISTER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export default userReducer;