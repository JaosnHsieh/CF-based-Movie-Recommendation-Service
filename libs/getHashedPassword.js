import crypto from 'crypto';

module.exports = (password, salt = null) => {
  if (!salt) {
      salt = crypto.randomBytes(6).toString('base64');
  }
  let hmac = crypto.createHmac('sha1', salt);
  hmac.end(password);
  let hex = hmac.read().toString('hex');
  return `${salt}$${hex}`;
};
