import React from 'react';
import './Article.css';
import PropTypes from 'prop-types';

const Article = (props) => {
    const date = new Date(props.date);
    return (
        <a className="article" href={props.originSrc}
        ref={props.articleRef}
        style={{
        }}>
            <div className="article-image"
            style={{
                backgroundImage: `url(${props.imageSrc}), url('/public/notloaded.png')`
            }}>
                <div className="article-blur"
                style={{
                    backgroundImage: `url(${props.imageSrc})`
                }}></div>
            </div>
            <div className="article-title">
                {props.title}
            </div>
            <hr/>
            <div className="article-date">
                {date.toLocaleDateString()} {date.toLocaleTimeString()}
            </div>
            <div className="article-text">
                {props.text}
            </div>
        </a>
    )
}

Article.propTypes = {
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    originSrc: PropTypes.string.isRequired,
    articleRef: PropTypes.any,
}

export default Article;