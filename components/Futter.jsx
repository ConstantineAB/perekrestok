import Image from 'next/image';
import Link from 'next/link';
import logo from '../public/img/perekrestok-logo.png';
import { motion } from 'framer-motion';

const Futter = () => {
  return (
    <div className="color__wrapper">
      <div className="footer">
        <div className="footer__description">
          <div className="footer__description__logo">
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{
                scale: 1.4,
              }}>
              <Link href="/">
                <Image src={logo} />
              </Link>
            </motion.div>
          </div>
          <div className="footer__description__subtitle"></div>
        </div>
        <div className="footer__useful-links">
          <p className="footer__useful-links__title">Полезные ссылки</p>
          <ul className="footer__useful-links__column1">
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{
                scale: 1.4,
              }}>
              <Link href="/contacts">
                <li className="footer__useful-links__column1__item">Наши контакты</li>
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{
                scale: 1.4,
              }}>
              <Link href="/howToOrder">
                <li className="footer__useful-links__column1__item">Как заказать товар?</li>
              </Link>
            </motion.div>
          </ul>
        </div>
        <div className="footer__support-links">
          <p className="footer__useful-links__title">Наш адрес</p>

          <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 1.4 }}>
            <Link href="https://yandex.ru/maps/20047/lyskovo/?ll=45.048400%2C56.026200&mode=poi&poi%5Bpoint%5D=45.047714%2C56.027035&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D1741830538&z=17">
              <ul>
                <li className="footer__useful-links__column1__item">пер. Грачёва, 1А, Лысково</li>
              </ul>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Futter;
