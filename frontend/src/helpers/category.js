import axios from 'axios';

export const getNames = async () => {
    const res = await axios.get('/api/category/names');
    return res.data.response;
}

export const getArticles = async (name) => {
    let res;
    try {
        res = (await axios.post('/api/category/articles', { name })).data;
    } catch (err) {
        res = err.response.data;
    }
    if (res.ok) {
        return { success: true, articles: res.response };
    }
    return { success: false, error: res.error.reason };
}