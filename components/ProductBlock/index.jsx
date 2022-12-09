import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import { motion } from 'framer-motion';



const ProductBlock = ({ id, name, price, imageUrl, types, onClickAddProducts, addedCount }) => {

const availableTypes = ['тонкое', 'традиционное'];
const availableColors = ['красный', 'синий', 'зеленый'];
  
const [activeType, setActiveType] = React.useState(types[0]);
const [activeSize, setActiveSize] = React.useState(0);
  
const onSelectType = (index) => {
    setActiveType(index);
};
  
const onSelectSize = (index) => {
    setActiveSize(index);
};

const onAddProduct = () => {
    const obj = {
        id,
        name,
        imageUrl,
        price,
        color: availableColors[activeSize],
        type: availableTypes[activeType],
    };
    onClickAddProducts(obj);
};

return ( 
    <div className="section__products__cards">
        <motion.div
            whileHover={{ scale: 1.2 }}
                whileTap={{
                    scale: 1.3,
                    rotate: -7
                }}
        >
            <Button onClick={onAddProduct} className="section__products__cards__button" outline>
                <p>В корзину</p>
                <div className="section__products__cards__basket-img" >
                    {addedCount && <i>{addedCount}</i>}
                </div>
            </Button>
        </motion.div>
        <div className="section__products__cards__title">
            <p>{name}</p>
        </div>
        <div className="section__products__cards__price">
            <span>{price}р</span>
        </div>
        <div className="section__products__cards__img">
            <img src={imageUrl} />
        </div>
    </div>
  )
}

ProductBlock.propTypes = {
    name: PropTypes.string,
    imageUrl: PropTypes.string,
    price: PropTypes.number,
    types: PropTypes.arrayOf(PropTypes.number),
    sizes: PropTypes.arrayOf(PropTypes.number),
    onAddProduct: PropTypes.func,
    addedCount: PropTypes.number
};
  
ProductBlock.defaultProps = {
    name: '---',
    price: 0,
    types: [],
    sizes: [],
};

export default ProductBlock;