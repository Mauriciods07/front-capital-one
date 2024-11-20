import {
    URL_API,
    PROFILE,
    UPDATE_PROFILE
} from '../utils/api_constants';

export const getProfile = async (profile_id) => {
    const response = await fetch(URL_API + PROFILE + profile_id, {
        method: 'GET'
    });

    const resp = await response.json();
    if (response.ok) {
        return resp;
    }
}

export const updateProfile = async (user) => { // profile_photo
    const form = new FormData();
    form.append('profile_id', user['profileId']);
    form.append('name', user['name']);
    form.append('description', user['description']);
    console.log(Object.keys(user['profilePhoto']).length !== 0 && user['profilePhoto'].constructor === Object);
    
    if (Object.keys(user['profilePhoto']).length !== 0 && user['profilePhoto'].constructor === Object) {
        const imageData2 = {
            uri: user['profilePhoto'].uri,
            name: user['profilePhoto'].fileName,
            type: user['profilePhoto'].type,
        }
        form.append('profile_photo', imageData2)
    }
    console.log('Datos de registro: ', form);

    const response = await fetch(URL_API + UPDATE_PROFILE, {
        method: 'PATCH', 
        body: form,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    resp = await response.json();
    console.log(resp);
    return resp;
}