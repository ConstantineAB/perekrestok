import sendEmail from './../../lib/mail';

export default async function handler(req, res) {
	const message = {
		to: 'borativanoff@yandex.ru',
		subject: `Письмо с сайта krylevsky-test от ${req.body.customerName}`,
		raw: `
			Товары: 
			${req.body.mailList}

			Oбщяя цена: ${req.body.totalPrice}руб
			Общее количество: ${req.body.totalCount}шт

			Ф.И.О покупателя: ${req.body.customerName}
        	Телефон: ${req.body.phone}
        `, 
	};
	sendEmail(message);
	res.send(`Спасибо за заявку, ${req.body.name}!`);
}