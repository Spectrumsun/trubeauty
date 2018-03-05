import nodemailer from 'nodemailer';
import pug from 'pug';
import juice from 'juice'
import htmlToText from 'html-to-text';

require('dotenv').config({ path: '.env' });

const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});


const generateHTML = (filename, options = {}) => {
  const html = pug.renderFile(`${__dirname}/../views/email/orderproduct.pug`, options);
  const inlined = juice(html);
  return inlined;
};

exports.send = async (options, callback) => {
    console.log('about to send')
  const html = generateHTML(options.filename, options);
  const text = htmlToText.fromString(html);
  callback('Hello there')

//   const mailOptions = {
//     from: `Tru Beauty <noreply@truebeauty.com>`,
//     to: options.user.email,
//     subject: options.subject,
//     html,
//     text
//   };
//   transport.sendMail(mailOptions, (error, info) => {
//       console.log(' am sending')
//         if (error) {
//             return console.log(error);
//         }

//         console.log('Message sent: %s', info.messageId);
//         console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
//         return callback(info.messageId)
//     });
};
