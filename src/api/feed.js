import {
    URL_API,
    FEED
} from '../utils/api_constants';

export const getRecommendations = async (profile_id) => {
    const response = await fetch(URL_API + FEED, {
        method: 'POST',
        body: JSON.stringify({
            profile_id: profile_id,
            min_num_recommendations: 2
        }),
        headers: {
            'Content-type': 'application/json'
        }
    });

    const token = await response.json();
    console.log(token);
    if (!response.ok || token.recommendations.length == 0) {
        return {
            success: false,
            msg: 'No se han encontrado resultados :('
        }
    }

    return token;
}