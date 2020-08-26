import React from 'react';
import './CategoryArticles.css';
import ReactLoading from 'react-loading';

const CategoryArticles = (props) => {
    if (!props.active) return <div className="category-articles"></div>
    if (props.loading) return (
        <div className="category-articles">
            <ReactLoading type="spin" className="cat-articles-load"
            color="#61C9A8"/>
        </div>
    )
    console.log(props.articles);
    return (
        <div className="category-articles">
            ARTICLES HERE BLYAT
        </div>
    )
}

export default CategoryArticles;