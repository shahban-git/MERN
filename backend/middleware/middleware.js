const { symmetricCrypto } = require("../common/common");
const { key, IV } = require("../config/config");



const encryptDecryptMiddleware = async (req, res, next) => {
  try {
    if (req.body.data) {
      const encryptedRequest = req.body.data;
      const decryptedBody = await symmetricCrypto('D', key, IV, encryptedRequest);
      const decryptedBodyParse = JSON.parse(decryptedBody);
      req.body = decryptedBodyParse;
      next(); 
    } else if (res.locals.responseBody) {
      const encryptedResponse = await symmetricCrypto('E', key, IV, res.locals.responseBody);
      
      res.send({ status_code: '00', status_desc: 'success', data: encryptedResponse });
    } else {
      next(); 
    }
  } catch (error) {
    console.error('Encryption/Decryption error:', error);
    res.status(500).send({ status_code: '01', status_desc: 'fail', message: 'Error processing request/response' });
  }
};


  module.exports = {
    encryptDecryptMiddleware
  }