import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import config from 'config';
const smtpConfig = config.get('smtp');

module.exports = ({ from = smtpConfig.auth.user, to, subject, html }) => {
    const transporter = nodemailer.createTransport(smtpTransport(smtpConfig));
    const mailInfo = { from, to, subject, html };
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailInfo, (err, info) => {
            if(err){
                return reject(err);
            }
            console.log(info);
            return resolve(info);
        });
    });
}
