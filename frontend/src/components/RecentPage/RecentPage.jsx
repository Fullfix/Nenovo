import React, { useEffect } from 'react';
import { useReducer } from 'react';
import ReactLoading from 'react-loading';
import Article from '../Article/Article';
import './RecentPage.css';

const recentReducer = (state, action) => {
    switch (action.type) {
        case 'finishLoading': return {
            ...state,
            isLoading: false,
            articles: action.articles,
        }
        default: return state;
    }
}

const RecentPage = (props) => {
    const initialState = {
        isLoading: true,
        articles: null,
    }
    const [state, dispatch] = useReducer(recentReducer, initialState);

    useEffect(() => {
        const getArticles = async () => {
            
        }
    })

    if (state.isLoading) return <ReactLoading 
    className="loading-recent"
    type="spin" color="#61C9A8"
    height="100px" width="100px" />

    return (
        <div className="recent-page">
            <div className="recent-title">Дичь новая</div>
            <div className="recent-articles">
                {state.articles.map(article => <Article key={article._id} {...article}/>)}
            </div>
        </div>
    )
}

export default RecentPage;