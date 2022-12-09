import { useDispatch, useSelector } from 'react-redux';
import CartItem from './CartItem';
import Modal from 'react-modal';

import { clearCart, removeCartItem, plusCartItem, minusCartItem } from '../store/actions/cart';
import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios';

const cart = () => {
  const dispatch = useDispatch();
  const { totalPrice, totalCount, items } = useSelector(({ cart }) => cart);

  const addedProducts = Object.keys(items).map((key) => {
    return items[key].items[0];
  });

  const onClearCart = () => {
    if (window.confirm('Вы действительно хотите очистить корзину?')) {
      dispatch(clearCart());
    }
  };

  const onRemoveItem = (id) => {
    if (window.confirm('Вы действительно хотите удалить?')) {
      dispatch(removeCartItem(id));
    }
  };

  const onPlusItem = (id) => {
    dispatch(plusCartItem(id));
  };

  const onMinusItem = (id) => {
    dispatch(minusCartItem(id));
  };

  const [step, setStep] = useState(0);

  const [price, setPrice] = useState(totalPrice);
  const [count, setCount] = useState(totalCount);

  const [customerName, setCustomerName] = useState('');

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+7');
  const [cartNumber, setCartNumber] = useState('');
  const [message, setMessage] = useState('');

  const itemOrderPriceMaping = addedProducts.map((obj) => {
    return {
      price: items[obj.id].totalPrice,
    };
  });
  const itemOrderPrice = itemOrderPriceMaping.map((itemPrice) => {
    return String(itemPrice.price);
  });

  const itemOrderCountMaping = addedProducts.map((obj) => {
    return {
      count: items[obj.id].items.length,
    };
  });
  const itemOrderCount = itemOrderCountMaping.map((itemCount) => {
    return String(itemCount.count);
  });

  const itemOrderNameMaping = addedProducts.map((obj) => {
    return {
      name: obj.name,
    };
  });
  const itemOrderName = itemOrderNameMaping.map((itemName) => {
    return String(itemName.name);
  });

  let size = 1;
  let subarray = [];

  for (let i = 0; i < Math.ceil(itemOrderCount.length / size); i++) {
    subarray[i] = String(itemOrderCount.slice(i * size, i * size + size));
  }

  const mailList = subarray.map((item) => {
    return `
        ----------
        ${itemOrderName.shift(item)}
        ${itemOrderCount.shift(item)}шт
        ${itemOrderPrice.shift(item)}руб
        ----------
      `;
  });

  async function handleOnSubmit(e) {
    e.preventDefault();
    const formData = {};
    Array.from(e.currentTarget.elements).forEach((field) => {
      if (!field.name) return;
      formData[field.name] = field.value;
    });
    fetch('/api/mail', {
      method: 'post',
      body: JSON.stringify(formData),
    });
    console.log(formData);
  }

  function OpenModal({ action, step, close }) {
    if (step == 1) {
      return (
        <div className="contact__form">
          <button className="go__button" onClick={action}>
            Отправить заявку
          </button>
          <button className="close__button" onClick={close}>
            Закрыть
          </button>
        </div>
      );
    } else if (step == 2) {
      return (
        <div>
          <button className="close__button" onClick={close}>
            Закрыть
          </button>
          <p className="go__button">Идет отправка!</p>
        </div>
      );
    } else if (step == 3) {
      return (
        <div>
          <button className="close__button" onClick={close}>
            Закрыть
          </button>
          <p className="go__button">Письмо отправлено!</p>
        </div>
      );
    } else if (step == 4) {
      return (
        <div>
          <button className="close__button" onClick={close}>
            Закрыть
          </button>
          <p>Произошла ошибка</p>
        </div>
      );
    } else {
      return null;
    }
  }

  function closeModal() {
    setStep(0);
  }

  async function sendForm() {
    try {
      setStep(2);

      await axios.post('/api/send-main-request', {
        totalPrice,
        totalCount,
        phone,
        mailList,
        customerName,
      });

      setStep(3);

      setPrice('');
      setCount('');

      setCustomerName('');

      setName('');
      setPhone('+7');
      setMessage('');
      setCartNumber('');

      dispatch({ type: 'SHIPMENT_CLICK', payload: 5 });
    } catch (error) {
      setStep(4);

      console.log('Sending error', error);
    }
  }

  return (
    <div className="__container">
      <div className="cart-wrapper">
        <div className="header">
          <div className="container">
            <div className="header__cart">
              <div className="button button--cart">
                <div className="button__delimiter"></div>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="container container--cart">
            {totalCount ? (
              <div className="cart">
                <div className="cart__top">
                  <h2 className="content__title">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
                        stroke="white"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
                        stroke="white"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
                        stroke="white"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Корзина
                  </h2>
                  <div className="cart__clear">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M2.5 5H4.16667H17.5"
                        stroke="#B6B6B6"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6.66663 5.00001V3.33334C6.66663 2.89131 6.84222 2.46739 7.15478 2.15483C7.46734 1.84227 7.89127 1.66667 8.33329 1.66667H11.6666C12.1087 1.66667 12.5326 1.84227 12.8451 2.15483C13.1577 2.46739 13.3333 2.89131 13.3333 3.33334V5.00001M15.8333 5.00001V16.6667C15.8333 17.1087 15.6577 17.5326 15.3451 17.8452C15.0326 18.1577 14.6087 18.3333 14.1666 18.3333H5.83329C5.39127 18.3333 4.96734 18.1577 4.65478 17.8452C4.34222 17.5326 4.16663 17.1087 4.16663 16.6667V5.00001H15.8333Z"
                        stroke="#B6B6B6"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.33337 9.16667V14.1667"
                        stroke="#B6B6B6"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M11.6666 9.16667V14.1667"
                        stroke="#B6B6B6"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span onClick={onClearCart}>Очистить корзину</span>
                  </div>
                </div>
                <div className="content__items">
                  {addedProducts.map((obj) => (
                    <CartItem
                      key={obj.id}
                      id={obj.id}
                      name={obj.name}
                      img={obj.imageUrl}
                      type={obj.type}
                      size={obj.size}
                      totalPrice={items[obj.id].totalPrice}
                      totalCount={items[obj.id].items.length}
                      onRemove={onRemoveItem}
                      onMinus={onMinusItem}
                      onPlus={onPlusItem}
                    />
                  ))}
                </div>
                <div className="cart__bottom">
                  {step == 0 && (
                    <button className="modal__button" onClick={() => setStep(1)}>
                      Купить без регистрации
                    </button>
                  )}
                  <Modal isOpen={step != 0} onRequestClose={closeModal} className="contact__modal">
                    <div className="contact__form">
                      <h2>Данные о заказе</h2>
                      <h4>Общая цена</h4>
                      <p>{totalPrice}руб</p>
                      <h4>Общее количество</h4>
                      <p>{totalCount}шт</p>

                      <h2>Данные о вас</h2>
                      <p>Ваше Ф.И.О</p>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(event) => setCustomerName(event.target.value)}
                      />
                      <p>Телефон</p>
                      <input
                        type="text"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                      />
                    </div>
                    <OpenModal action={sendForm} step={step} close={() => setStep(0)} />
                  </Modal>
                  <div className="cart__bottom-details">
                    <span>
                      Всего товаров: <b>{totalCount} шт.</b>
                    </span>
                    <span>
                      Сумма заказа: <b>{totalPrice} ₽</b>
                    </span>
                  </div>
                  <div className="cart__bottom-buttons">
                    <Link
                      href="/allProducts"
                      className="button button--outline button--add go-back-btn">
                      <div>
                        <svg
                          width="8"
                          height="14"
                          viewBox="0 0 8 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M7 13L1 6.93015L6.86175 1"
                            stroke="#D3D3D3"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>Вернуться назад</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="cart cart--empty">
                <div>Корзина пустая</div>
                <p>
                  Вероятней всего, вы не заказывали ещё товар.
                  <br />
                  Для того, чтобы заказать товар, перейди на главную страницу.
                </p>
                <Link href="/allProducts" className="button button--black">
                  <span>Вернуться назад</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default cart;
