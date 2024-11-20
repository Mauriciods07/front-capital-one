import {
    URL_API,
    CHAT
} from '../utils/api_constants';

export const getChatMessage = async (message) => {
    const response = await fetch(URL_API + CHAT, {
        method: 'POST',
        body: JSON.stringify({
            message: message
        }),
        headers: {
            'Content-type': 'application/json'
        }
    });

    const resp = await response.json();
    if (response.ok) {
        return resp;
    }
}