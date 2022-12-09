import mailer from 'nodemailer';

const smtpTransport = mailer.createTransport({
	host: 'smtp.yandex.ru',
	port: 465,
	secure: true,
	auth: {  
		user: 'borativanoff@yandex.ru',
		pass: 'NfEUvhVEwtx3dMc', 
	},
	tls: {rejectUnauthorized: false},
}, {
	from: 'borativanoff <borativanoff@yandex.ru>'
});

const sendEmail = (message) => {
    smtpTransport.sendMail(message, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent successfully", info);
        }
        smtpTransport.close();
    });
}

export default sendEmail;