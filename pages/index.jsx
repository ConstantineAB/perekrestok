import Head from 'next/head';
import Futter from '../components/Futter';
import Header from '../components/Header';
import Home from '../components/Home';

const index = () => {
  return (
    <div className="wrapper">
      <Head>
        <title>Перекресток Лысково</title>
        <meta
          name="description"
          content="Торговый дом 'Перекресток' город Лысково Нижегородская область"
        />
        <meta property="og:title" content="Перекресток магазин стройматериалов" />
        <meta name="yandex-verification" content="20a6ec7bf331f1ed" />
        <meta
          name="google-site-verification"
          content="snwZwRyQbBpXYDFEHdlaRGR1v-tspvHi9A23ySF9YOk"
        />
      </Head>
      <Header />
      <Home />
    </div>
  );
};

export default index;

/*import React from 'react'

const index = () => {
  return (
    <div>index</div>
  )
}

export default index*/
