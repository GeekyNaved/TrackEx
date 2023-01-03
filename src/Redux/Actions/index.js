import * as types from "./actionTypes";
import auth from '@react-native-firebase/auth';

const registerStart = () => ({
    type: types.REGISTER_START,
})

const registerSuccess = (user) => ({
    type: types.REGISTER_SUCCESS,
    payload: user,
})

const registerFail = () => ({
    type: types.REGISTER_FAIL,
    payload: error,
})


export const registerInitiate = (email, password, displayName) => {
    return function (dispatch) {
        dispatch(registerStart());
        auth().createUserWithEmailAndPassword(email, password)
        .then(({user}) => {
            console.log('user==>', user )
            user.updateProfile({displayName})
            dispatch(registerSuccess(user))
        })
        .catch(error => {
            console.log('error', error)
            dispatch(registerFail(error.message))
        })
    }
}







// export const incNumber = (num) => {
//     return {
//         type: 'INCREMENT',
//         payload: num
//     }
// }

// export const decNumber = () => {
//     return {
//         type: 'DECREMENT'
//     }
// };