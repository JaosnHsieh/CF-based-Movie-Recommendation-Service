import crypto from 'crypto';
import getHashedPassword from './getHashedPassword';

module.exports.checkPassword = (dbHashedPassword, password) => {
  let _ref = dbHashedPassword.split('$');
  let salt = _ref[0];
  let hashedPassword = getHashedPassword(password, salt);
  return (hashedPassword === dbHashedPassword);
};
