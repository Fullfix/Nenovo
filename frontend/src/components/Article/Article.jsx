import React from 'react';
import './Article.css';
import PropTypes from 'prop-types';

const Article = (props) => {
    return (
        <a className="article" href={props.originSrc}>
            <img src={props.imageSrc} alt="articleImage"/>
            <div className="article-title">
                {props.title}
            </div>
            <div className="article-date">
                {props.date}
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
}

export default Article;