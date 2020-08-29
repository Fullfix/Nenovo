import axios from 'axios';

export const getRecent = async () => {
    const res = await axios.get('/api/article/recent');
    return res.data.response;
}

export const getRecommended = async () => {
    console.log(axios.defaults.headers.common)
    let res;
    try {
        res = (await axios.get('/api/article/recommended')).data;
    } catch (err) {
        res = err.response.data;
    }
    if (res.ok) {
        return { success: true, articles: res.response };
    }
    return { success: false, error: res.error.reason };
}

export const watchArticle = async (id) => {
    let res;
    try {
        res = (await axios.post('/api/article/watch'), { id }).data;
    } catch (err) {
        res = err.response.data;
    }
    if (res.ok) {
        return { success: true, articles: res.response };
    }
    return { success: false, error: res.error.reason };
}