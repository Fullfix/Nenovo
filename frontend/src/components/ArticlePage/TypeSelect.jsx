import React from 'react';
import PropTypes from 'prop-types';
import './TypeSelect.css';

const TypeSelect = (props) => {
    return (
        <div className="type-select">
            {props.articleTypes.map(type => 
            <button className={`article-type ${type[0] === props.selected ? 'type-selected': ''}`}
            key={type[0]}
            onClick={() => {
                if (props.selected !== type[0]) props.onSelect(type[0]);
            }}>{type[1]}</button>)}
        </div>
    )
}

TypeSelect.propTypes = {
    articleTypes: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
    selected: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
}

export default TypeSelect;