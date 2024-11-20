import {
    URL_API,
    RANKING
} from '../utils/api_constants';

export const getRanking = async () => {
    const response = await fetch(URL_API + RANKING, {
        method: 'GET'
    });

    const resp = await response.json();
    if (response.ok) {
        return resp;
    }
}