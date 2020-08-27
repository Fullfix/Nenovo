import React from 'react';
import './CategoryArticles.css';
import ReactLoading from 'react-loading';
import Article from '../Article/Article';

const CategoryArticles = (props) => {
    if (!props.active) return <div className="category-articles"></div>
    if (props.loading) return (
        <div className="category-articles">
            <ReactLoading type="spin" className="cat-articles-load"
            color="#61C9A8"/>
        </div>
    )
    return (
        <div className="category-articles scrollbar">
            {props.articles.map(article => <Article key={article._id} {...article} />)}
        </div>
    )
}

export default CategoryArticles;