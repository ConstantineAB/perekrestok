import { motion } from 'framer-motion';
import images from '../public/img/images';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductBlock from '../components/ProductBlock';
import axios from 'axios';

import img1 from '../public/img/Product_img/cley/ek-3000.jpg';
import img2 from '../public/img/Product_img/shpaclevka/k-200.jpg';
import img3 from '../public/img/Product_img/shtucaturka/tg-40.jpg';
import img4 from '../public/img/Product_img/smesy/400.jpg';
import Link from 'next/link';
import Futter from './Futter';

export const Home = () => {
  const [widthRating, setWidthRating] = useState(0);

  const carouselRating = useRef();

  const dispatch = useDispatch();
  const { category, sortBy } = useSelector(({ filters }) => filters);
  const cartItems = useSelector(({ cart }) => cart.items);

  useEffect(() => {
    setWidthRating(carouselRating.current.scrollWidth - carouselRating.current.offsetWidth);
  });

  useEffect(() => {
    dispatch(fetchProducts(sortBy, category));
  }, [category, sortBy]);

  const handleAddProductToCart = (obj) => {
    dispatch({
      type: 'ADD_PRODUCT_CART',
      payload: obj,
    });
  };

  const fetchProducts = (sortBy) => (dispatch) => {
    axios
      .get('https://perekrostok-backend-production-6738.up.railway.app/api/products?rating=2')
      .then(({ data }) => {
        setRating(data);
      });
  };

  const [ratingData, setRating] = useState([]);

  return (
    <div>
      <div className="section__clients __container__main">
        <div className="section__clients-container">
          <div className="section__clients-container__title">"Перекрёсток" это</div>
          <div className="section__clients-container__images">
            <p>Быстрая доставка</p>
            <p>Гарантия качества</p>
            <p>Более 21-го года опыта на рынке</p>
          </div>
        </div>
      </div>

      <div className="section__gallery __container__main">
        <div className="section__gallery-container">
          <div className="section__gallery-container__1">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 1.2 }}>
              <Link href="/GluePage">
                <div className="section__gallery-container__1__img-1">
                  <Image src={img1} />
                  <p>Клеи</p>
                </div>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 1.2 }}>
              <Link href="/PlasterPage">
                <div className="section__gallery-container__1__img-2">
                  <Image src={img2} />
                  <p>Штукатурка</p>
                </div>
              </Link>
            </motion.div>
          </div>

          <div className="section__gallery-container__2">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 1.2 }}>
              <Link href="/PuttyPage">
                <div className="section__gallery-container__2__img-3">
                  <Image src={img3} />
                  <p>Шпаклевка</p>
                </div>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 1.2 }}>
              <Link href="/DryMixturesPage">
                <div className="section__gallery-container__2__img-4">
                  <Image src={img4} />
                  <p>Сухие смеси</p>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="section__categories __container__main">
        <p className="section__categories__title">Самые популярные товары</p>
        <motion.div
          ref={carouselRating}
          className="carousel__products"
          whileTap={{ cursor: 'grabbing' }}>
          <motion.div
            drag="x"
            dragConstraints={{ right: 0, left: -widthRating }}
            className="inner-carousel__products">
            {ratingData.map((obj) => (
              <motion.div>
                <ProductBlock
                  onClickAddProducts={handleAddProductToCart}
                  key={obj.id}
                  addedCount={cartItems[obj.id] && cartItems[obj.id].items.length}
                  {...obj}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
      <Futter />
    </div>
  );
};

export default Home;
