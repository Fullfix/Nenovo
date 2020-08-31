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
import { useRef, useCallback } from 'react';

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
        case 'selectType': {
            const articleslList = document.querySelector('.category-articles');
            articleslList.scrollTop = 0;
            return {
                ...state,
                articleType: action.articleType,
                isLoadingArticles: true,
                items: null,
            }
        }
        case 'getArticles': {
            if (!action.ok) return { ...state, isLoadingArticles: false };
            return {
                ...state,
                articles: action.articles,
                items: action.articles.length >= 10 ? 
                action.articles.slice(0, 10) : action.articles,
                hasNextPage: action.articles.length >= 10,
                isLoadingArticles: false,
            }
        }
        // CATEGORY
        case 'selectCategory': {
            const articleslList = document.querySelector('.category-articles');
            articleslList.scrollTop = 0;
            if (action.category === state.selectedCategory) return state;
            return {
                ...state, 
                selectedCategory: action.category,
                isLoadingArticles: true,
                items: null,
            }
        }
        // SCROLL
        case 'loadMore': {
            if (!state.items || !state.articles) return;
            if (state.items.length <= state.articles.length - 10) {
                return {
                    ...state,
                    items: [
                        ...state.items, 
                        ...state.articles.slice(state.items.length, state.items.length+10)
                    ],
                    hasNextPage: true,
                }
            }
            else {
                return {
                    ...state,
                    items: [
                        ...state.items,
                        ...state.articles.slice(state.items.length, state.articles.length)
                    ],
                    hasNextPage: false,
                }
            }
        }
        default: return state;
    }
}

const ArticlePage = () => {
    const initialState = {
        // MAIN
        articleType: 'category',
        isLoadingArticles: true,
        articles: null,
        // CATEGORY
        selectedCategory: 'politics',
        // SCROLL
        items: null,
        hasNextPage: true,
    }
    const [state, dispatch] = useReducer(articleReducer, initialState);
    const observer = useRef();

    const lastArticleRef = useCallback(node => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && state.hasNextPage) {
                dispatch({ type: 'loadMore' });
            }
        })
        if (node) observer.current.observe(node);
    }, [state.hasNextPage])
    
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
            onSelect={(category) => {       
                dispatch({ type: 'selectCategory', category });
            }}/>
            <div className="article-content">
                <TypeSelect
                articleTypes={articleTypes}
                selected={state.articleType}
                onSelect={(articleType) => {       
                    dispatch({ type: 'selectType', articleType });
                }}/>
                <ArticleList
                lastArticleRef={lastArticleRef}
                categoryOpen={state.articleType === 'category'}
                loading={state.isLoadingArticles}
                items={state.items}
                articles={state.articles} />
            </div>
        </div>
    )
}
export default ArticlePage;