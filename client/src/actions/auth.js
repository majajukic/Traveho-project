import {AUTH} from '../const/actionTypes.js';
import * as api from '../api/index.js';

export const signin = (formData, history) => async(dispatch) => {
    try {
        //login the user:
        const { data } = await api.singnIn(formData);

        //dispatch an action:
        dispatch({ type: AUTH, data});

        //navigate to the homepage with history:
        history.push("/");

    } catch (error) {
        // the error needs to be spread in order to keep all the relevant values
        return {...error};
    }
};

export const signup = (formData, history) => async(dispatch) => {
    try {
        //signup the user:
        const { data } = await api.singnUp(formData);
        
        dispatch({ type: AUTH, data});

        history.push("/");

    } catch (error) {
        console.log(error);
    }
};