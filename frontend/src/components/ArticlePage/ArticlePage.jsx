import React from 'react';
import ReactLoading from 'react-loading';
import './ArticlePage.css';
import { useEffect } from 'react';
import * as utils from '../../helpers/category';
import { useReducer } from 'react';
import CategoryArticles from './ArticleList';
import CategoryList from './CategoryList';
import TypeSelect from './TypeSelect';

const articleTypes = [
    ["recent", "Недавние"],
    ["recommended", "Рекомендованные"],
    ["category", "По категориям"],
]

const articleReducer = (state, action) => {
    switch (action.type) {
        case 'getCategories': return { 
            ...state, 
            isLoading: false,
            isLoadingArticles: true,
            categories: action.names, 
        };
        case 'selectCategory': {
            if (action.category === state.selectedCategory) return state;
            return { 
                ...state, 
                selectedCategory: action.category,
                isLoadingArticles: true,
            }
        }
        case 'getArticles': return { 
            ...state,
            articles: action.articles, 
            isLoadingArticles: false,
        }
        default: return state;
    }
}

const CategoryPage = () => {
    const initialState = {
        isLoading: true,
        isLoadingArticles: false,
        categories: null,
        articles: null,
        selectedCategory: null,
    }
    const [state, dispatch] = useReducer(articleReducer, initialState);
    
    useEffect(() => {
        const getCategories = async () => {
            const names = await utils.getNames();
            dispatch({ type: 'getCategories', names });
        }
        if (state.isLoading) getCategories();
    }, [state.isLoading]);
    useEffect(() => {
        const getArticles = async () => {
            const { success, articles } = await utils.getArticles(state.selectedCategory);
            dispatch({ 
                type: 'getArticles',
                ok: success,
                articles,
            });
        }
        if (state.isLoadingArticles && state.selectedCategory) getArticles();
    }, [state.isLoadingArticles, state.selectedCategory]);

    if (state.isLoading) return <ReactLoading 
    className="loading-category"
    type="spin" color="#61C9A8" 
    height="100px" width="100px" />

    console.log(state.categories);

    const categoryDivs = state.categories.map(category => {
        return <button key={category[0]}
        className={`category-btn ${category[0] === state.selectedCategory ? 
        'category-selected' : ''}`}
        onClick={() => dispatch({ type: 'selectCategory', category: category[0] })}>
            {category[1]}
        </button>
    })

    return (
        <div className="category-page">
            <CategoryList
            active={true} 
            categories={state.categories}
            selected={state.selectedCategory}
            onSelect={(category) => dispatch({ type: 'selectCategory', category })}/>
            <div className="article-content">
                <TypeSelect
                articleTypes={articleTypes}
                selected={'category'}
                onSelect={(articleType) => dispatch({ type: 'selectType', articleType })}/>
                <CategoryArticles
                active={state.categories && state.selectedCategory}
                loading={state.isLoadingArticles} 
                articles={state.articles} />
            </div>
        </div>
    )
}
export default CategoryPage;