import { createContext } from 'react';

const UserContext = createContext({
    user: null,
    watchArticle: () => {},
    changeKeywords: () => {},
});

export default UserContext;