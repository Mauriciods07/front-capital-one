import {
    URL_API,
    LOGIN,
    SIGNUP
} from '../utils/api_constants';
import strings from '../utils/strings';

export const login = async (email, password) => {
    const response = await fetch(URL_API + LOGIN, {
        method: 'POST',
        body: JSON.stringify({
            email: email,
            password: password
        }),
        headers: {
            'Content-type': 'application/json'
        }
    });

    const token = await response.json();
    if (token && response.ok) {
        return token;
    } else {
        return {
            success: false,
            error: strings.wrongPassword
        };
    }
}

export const signup = async (user) => {
    const response = await fetch(URL_API + SIGNUP, {
        method: 'POST',
        body: JSON.stringify({
            email: user['email'],
            password: user['password'],
            name: user['name']
        }),
        headers: {
            'Content-type': 'application/json'
        }
    });

    const token = await response.json();
    if (token && response.ok) {
        return token;
    } else {
        return {
            success: false,
            error: strings.emailAlreadyUsed
        }
    }
}