import React, { useEffect, useCallback } from 'react';
import './ArticleList.css';
import ReactLoading from 'react-loading';
import Article from '../Article/Article';
import { useState } from 'react';
import { useRef } from 'react';

const ArticleList = (props) => {
    if (props.loading || !props.items) return (
        <div className="category-articles">
            <ReactLoading type="spin" className="cat-articles-load"
            color="#61C9A8"/>
        </div>
    )

    return (
        <div className="category-articles scrollbar"
        style={{
            height: props.categoryOpen ? 'calc(100vh - 60px - 5.6em)' : 'calc(100vh - 60px)'
        }}>
            {props.items.map((article, i) => <Article 
            key={article._id}
            articleRef={i === props.items.length - 1 ? props.lastArticleRef : null}
            {...article} />)}
        </div>
    )
}

export default ArticleList;