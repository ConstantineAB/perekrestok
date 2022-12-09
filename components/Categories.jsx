import React from 'react';
import PropTypes from 'prop-types';

const Categories = ({ activeCategory, items, onClickCategory }) => {
  return (
    <div className="categories">
      <span
        className={activeCategory === null ? 'activeItem' : ''}
        onClick={() => onClickCategory(null)}>
        Все
      </span>
      {items &&
        items.map((name, index) => (
          <span
            className={activeCategory === index ? 'activeItem' : ''}
            onClick={() => onClickCategory(index)}
            key={`${name}_${index}`}>
            {name}
          </span>
        ))}
    </div>
  );
};

Categories.propTypes = {
  activeCategory: PropTypes.oneOf([PropTypes.number, null]),
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClickCategory: PropTypes.func.isRequired,
};

Categories.defaultProps = { activeCategory: null, items: [] };

export default Categories;
