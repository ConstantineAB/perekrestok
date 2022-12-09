import Link from 'next/link';
import { useSelector } from 'react-redux';
import { Menu } from "@headlessui/react";
import { motion } from "framer-motion";
import Image from 'next/image';
import logo from '../public/img/perekrestok-logo.png'

const Header = () => {
  const { totalPrice, totalCount } = useSelector(({ cart }) => cart);

  return (
    <header className="header">
        <div className="nav">
          <div className="nav__container">
            <div className="top-nav">
                <ul className="nav-list nav__container">
                  <motion.div
                      whileHover={{ scale: 1.2 }}
                          whileTap={{
                            scale: 1.4
                          }}
                  >
                    <Link href="/"><li className="nav-list_item">Главная</li></Link>
                  </motion.div>
                  <motion.div
                      whileHover={{ scale: 1.2 }}
                          whileTap={{
                            scale: 1.4
                          }}
                  >
                    <Link href="/howToOrder"><li className="nav-list_item">Как заказать товар?</li></Link>
                  </motion.div>
                  <motion.div
                      whileHover={{ scale: 1.2 }}
                          whileTap={{
                            scale: 1.4
                          }}
                  >
                    <Link href="/allProducts"><li className="nav-list_item__products">Все товары</li></Link>
                  </motion.div>
                  <div className="nav-list_item nav-list_item_dropdown">
                    <Menu>
                      {({ open }) => (
                        <>
                          <Menu.Button className="nav-list_item_dropdown_button">
                            <motion.div
                              whileHover={{ scale: 1.2 }}
                            >
                              Меню
                            </motion.div>
                          </Menu.Button>
                          {open && (
                            <motion.div
                            >
                              <Menu.Items
                                as={motion.div}
                                static
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                transition={{ duration: 0.15 }}
                                className="nav-list_item_dropdown_items"
                              >
                                <Menu.Item>
                                  {({ active }) => (
                                    <motion.div
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 1.2 }}
                                    >
                                      <Link href="/GluePage">
                                        Клеи
                                      </Link>
                                    </motion.div>
                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => (
                                    <motion.div
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 1.2 }}
                                    >
                                      <Link href="/DryMixturesPage">
                                        Сухие смеси
                                      </Link>
                                    </motion.div>
                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => (
                                    <motion.div
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 1.2 }}
                                    >
                                      <Link href="/MetalScrewsPage">
                                        Саморезы по металлу
                                      </Link>
                                    </motion.div>
                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => (
                                    <motion.div
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 1.2 }}
                                    >
                                      <Link href="/WoodScrewsPage">
                                        Саморезы по дереву  
                                      </Link>
                                    </motion.div>
                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => (
                                    <motion.div
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 1.2 }}
                                    >
                                      <Link href="/PlasterPage">
                                        Штукатурка
                                      </Link>
                                    </motion.div>
                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => (
                                    <motion.div
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 1.2 }}
                                    >
                                      <Link href="/PuttyPage">
                                        Шпаклевка
                                      </Link>
                                    </motion.div>
                                  )}
                                </Menu.Item>
                                <p>--------------------</p>
                                <Menu.Item>
                                  {({ active }) => (
                                    <motion.div
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 1.2 }}
                                    >
                                      <Link href="/contacts">
                                        Наши контакты
                                      </Link>
                                    </motion.div>
                                  )}
                                </Menu.Item>
                              </Menu.Items>
                            </motion.div>
                          )}
                        </>
                      )}
                    </Menu>
                  </div>
                </ul>
                <div className="icon-nav nav__container">
                    <div className="basket">
                      <Link href="/cartPage">
                          <div>
                            <span>{totalPrice} р</span>
                            <span className="basket__number">
                              {totalCount}
                            </span>
                            <img src="img/basket.svg" />
                          </div>
                      </Link>
                    </div>
                    <motion.div
                          whileHover={{ scale: 1.2 }}
                          whileTap={{
                            scale: 1.3,
                            borderRadius: "100%",
                            delay: 10
                          }}
                        > 
                    </motion.div>
                </div>
            </div>
          </div>
        </div>
        
      <div className="header__container">
        <div className="header__main">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1.2 }}
            >
              <Link href="/">
                <div className="logo__img">
                  <Image src={logo} />
                </div>
              </Link>
            </motion.div>
            <div className="header__main__telephone">
              <p>+7 800 555 3535</p>
              <p>Звонок бесплатный 09:00 – 16:00</p>
            </div>
        </div>
      </div>
    </header>
  )
}

export default Header