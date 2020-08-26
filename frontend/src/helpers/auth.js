import axios from 'axios';

export const login = async (email, password) => {
    let res;
    try {
        res = (await axios.post('/api/user/signin', { email, password })).data;
    } catch (err) {
        res = err.response.data;
    }
    if (res.ok) {
        const token = res.response;
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        return { success: true };
    }
    return { success: false, error: res.error.reason };
}

export const register = async (email, password) => {
    let res;
    try {
        res = (await axios.post('/api/user/signup', { email, password })).data;
    } catch (err) {
        res = err.response.data;
    }
    if (res.ok) {
        return { success: true };
    }
    return { success: false, error: res.error.reason };
}