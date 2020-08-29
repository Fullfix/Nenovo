import React from 'react';
import ReactLoading from 'react-loading';
import './ArticlePage.css';
import { useEffect } from 'react';
import * as catUtils from '../../helpers/category';
import * as utils from '../../helpers/article';
import { useReducer } from 'react';
import ArticleList from './ArticleList';
import CategoryList from './CategoryList';
import TypeSelect from './TypeSelect';

const articleTypes = [
    ["recent", "Недавние"],
    ["recommended", "Рекомендованные"],
    ["category", "По категориям"],
]

const categories = [
    ['politics', 'Политика'],
    ['economy', 'Экономика'],
    ['coronavirus', 'Коронавирус'],
    ['internet', 'Интернет'],
    ['society', 'Социум'],
    ['entertainment', 'Развлечения'],
]

const articleReducer = (state, action) => {
    switch (action.type) {
        // MAIN
        case 'selectType': return {
            ...state,
            articleType: action.articleType,
            isLoadingArticles: true,
        }
        case 'getArticles': {
            if (!action.ok) return { ...state, isLoadingArticles: false };
            return {
                ...state,
                articles: action.articles, 
                isLoadingArticles: false,
            }
        }
        // CATEGORY
        case 'selectCategory': {
            if (action.category === state.selectedCategory) return state;
            return { 
                ...state, 
                selectedCategory: action.category,
                isLoadingArticles: true,
            }
        }
        default: return state;
    }
}

const CategoryPage = () => {
    const initialState = {
        // MAIN
        articleType: 'category',
        isLoadingArticles: true,
        articles: null,
        // CATEGORY
        selectedCategory: 'politics',
    }
    const [state, dispatch] = useReducer(articleReducer, initialState);
    
    useEffect(() => {
        const getArticles = async () => {
            if (state.articleType === 'category') {
                const { success, articles } = 
                await catUtils.getArticles(state.selectedCategory);
                return dispatch({ 
                    type: 'getArticles',
                    ok: success,
                    articles,
                });
            }
            if (state.articleType === 'recent') {
                const articles = await utils.getRecent();
                return dispatch({ 
                    type: 'getArticles',
                    ok: true,
                    articles,
                });
            }
            if (state.articleType === 'recommended') {
                const { success, articles } = await utils.getRecommended();
                return dispatch({ 
                    type: 'getArticles',
                    ok: success,
                    articles,
                });
            }
        }
        if (state.isLoadingArticles) getArticles();
    }, [state.isLoadingArticles, state.selectedCategory, state.articleType]);

    return (
        <div className="article-page">
            <CategoryList
            active={state.articleType === 'category'} 
            categories={categories}
            selected={state.selectedCategory}
            onSelect={(category) => dispatch({ type: 'selectCategory', category })}/>
            <div className="article-content">
                <TypeSelect
                articleTypes={articleTypes}
                selected={state.articleType}
                onSelect={(articleType) => dispatch({ type: 'selectType', articleType })}/>
                <ArticleList
                loading={state.isLoadingArticles} 
                articles={state.articles} />
            </div>
        </div>
    )
}
export default CategoryPage;