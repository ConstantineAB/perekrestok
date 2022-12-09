import Futter from '../components/Futter';
import Header from '../components/Header';
import Head from 'next/head';

const Contacts = () => {
  return (
    <div>
      <Header />
      <div className="__container">
        <Head>
          <title>Наши контакты</title>
          <meta name="description" content="'Перекресток' контакты магазина" />
          <meta property="og:title" content="Телефон: ...'" />
        </Head>
        <div className="contacts">
          <h1 className="contacts__title">Наши контакты</h1>
          <p>Телефон: +790084447777</p>
          <p>Адрес: пер. Грачёва, 1А, Лысково</p>
        </div>
      </div>
      <Futter />
    </div>
  );
};

export default Contacts;
