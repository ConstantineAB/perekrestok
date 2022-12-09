import sendEmail from './../../lib/mail';

export default async function handler(req, res) {
	const message = {
		to: 'borativanoff@yandex.ru',
		subject: `Письмо с сайта krylevsky-test от ${req.body.name}`,
		text: `
			Ф.И.О покупателя: ${req.body.inputValue},
			Название товара: ${req.body.name},
			Цена: ${req.body.totalPrice},
			Количество: ${req.body.totalCount}
        `, 
	};
	sendEmail(message);
	console.log(message);
	res.send(`Спасибо за заявку, ${req.body.name}!`);
}