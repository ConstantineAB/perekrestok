import Futter from '../components/Futter';
import Header from '../components/Header';
import Head from 'next/head';

const howToOrder = () => {
  return (
    <div>
      <Header />
      <div className="__container">
        <Head>
          <title>Как заказать товар на нашем сайте</title>
          <meta name="description" content="Магазин 'Перекресток' Лысково как заказать товар" />
          <meta property="og:title" content="Как заказать товар в магазине 'Перекресток'" />
        </Head>
        <h1 className="how__to__order__title">Как заказать товар на нашем сайте?</h1>
        <p className="how__to__order">1. Добавьте товар в корзину</p>
        <p className="how__to__order">2. Перейдите в корзину</p>
        <p className="how__to__order">3. Заполните форму под заголовком "Данные о вас"</p>
        <p className="how__to__order">4. Нажмите кнопку "Отправить"</p>
        <p className="how__to__order">5. Ждите звонка</p>
        <h3 className="how__to__order__subtitle">
          Если у вас остались вопросы или возникли трудности, вы можете позвонить по номеру
          +790084447777
        </h3>
      </div>
      <Futter />
    </div>
  );
};

export default howToOrder;
