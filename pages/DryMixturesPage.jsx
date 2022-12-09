import { useDispatch, useSelector } from 'react-redux';
import SortPopup from '../components/SortPopup';
import ProductBlock from '../components/ProductBlock';

import { setSortBy } from '../store/actions/filters';
import { useCallback, useEffect } from 'react';
import Header from '../components/Header';
import Futter from '../components/Futter';
import Head from 'next/head';
import React from 'react';
import axios from 'axios';
import { useState } from 'react';

const sortItems = [
  { name: 'популярности', type: 'popular', order: 'desc' },
  { name: 'цене', type: 'price', order: 'desc' },
  { name: 'алфавит', type: 'name', order: 'asc' },
];

const DryMixturesPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(({ cart }) => cart.items);
  const { category, sortBy } = useSelector(({ filters }) => filters);

  useEffect(() => {
    dispatch(fetchProducts(sortBy, category));
  }, [category, sortBy]);

  const onSelectSortType = useCallback((type) => {
    dispatch(setSortBy(type));
  }, []);

  const handleAddProductToCart = (obj) => {
    dispatch({
      type: 'ADD_PRODUCT_CART',
      payload: obj,
    });
  };

  const fetchProducts = (sortBy) => (dispatch) => {
    axios
      .get('https://perekrostok-backend-production-6738.up.railway.app/api/products?category=0')
      .then(({ data }) => {
        setProductsData(data);
      });
  };

  const [productData, setProductsData] = useState([]);

  return (
    <>
      <Head>
        <title>Перекресток Лысково сухие смеси</title>
        <meta name="description" content="Магазин 'Перекресток' сухие смеси" />
        <meta property="og:title" content="Сухие смеси магазина 'Перекресток'" />
      </Head>
      <Header />
      <section className="section__products __container">
        <div className="section__products__container">
          <div className="section__products__nav__top">
            <span className="section__products__nav__top__left">
              <span className="section__products__nav__top__left-title">Сухие смеси</span>
            </span>
            <span className="section__products__nav__top__see-all">
              {
                <SortPopup
                  activeSortType={sortBy.type}
                  items={sortItems}
                  onClickSortType={onSelectSortType}
                />
              }
            </span>
          </div>
          <div className="section__products__cards__container">
            {productData.map((obj) => (
              <ProductBlock
                onClickAddProducts={handleAddProductToCart}
                key={obj.id}
                addedCount={cartItems[obj.id] && cartItems[obj.id].items.length}
                {...obj}
              />
            ))}
          </div>
        </div>
      </section>
      <Futter />
    </>
  );
};
export default DryMixturesPage;
