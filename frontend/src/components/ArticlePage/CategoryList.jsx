import React from 'react';
import './CategoryList.css';
import PropTypes from 'prop-types';

const CategoryList = (props) => {
    return (
        <div className={`category-list ${props.active ? 'category-active' : ''}`}>
            {props.categories.map(cat => 
            <button className={`category ${props.selected === cat[0] ? 'selected' : ''}`}
            key={cat[0]}
            onClick={() => {
                if (props.selected !== cat[0]) props.onSelect(cat[0]);
            }}>
                {cat[1]}
            </button>)}
        </div>
    )
}

CategoryList.propTypes = {
    active: PropTypes.bool,
    categories: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string).isRequired),
    selected: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
}

export default CategoryList;