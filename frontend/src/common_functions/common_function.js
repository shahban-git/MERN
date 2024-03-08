
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken')
const jwtkey = "e-com";


export function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    const context = this;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}




export function symmetricCrypto(type, key, IV, data) {
  return new Promise((resolve, reject) => {
    let result;  // Moved the variable declaration outside of the try block
    try {
      switch (type) {
        case 'E':
          const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key, {
            iv: IV,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
          });
          result = encrypted.toString();
          break;
        case 'D':
          const decrypted = CryptoJS.AES.decrypt(data, key, {
            iv: IV,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
          });
          result = decrypted.toString(CryptoJS.enc.Utf8);
          break;
        default:
          reject(new Error("Invalid type"));  // Added a default case for unexpected 'type' values
          return;
      }
      resolve(result);
    } catch (e) {
      console.error("symmetricCrypto - Exception:", e);
      reject(e);  // Changed the reject statement to pass the error object directly
    }
  });
};



const encryptDecrypt = (text, key, mode) => {
  const algorithm = 'aes-256-cbc';
  const iv = Buffer.alloc(16, 0); // IV of all zeros

  switch (mode) {
    case 'encrypt': {
      const cipher = crypto.createCipher(algorithm, key, iv);
      let encrypted = cipher.update(text, 'utf8', 'hex');
      encrypted += cipher.final('hex');
      return encrypted;
    } 
    case 'decrypt': {
      const decipher = crypto.createDecipher(algorithm, key, iv);
      let decrypted = decipher.update(text, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      return decrypted;
    }
    default: {
      throw new Error('Invalid mode. Mode must be "encrypt" or "decrypt".');
    }
  }
};



const enforceKeyLength = (key) => {
  const keyLength = 32; // 32 bytes for a 256-bit key
  const actualKeyLength = Buffer.byteLength(key, 'hex');
  console.log("actualKeyLength", actualKeyLength)
  
  if (actualKeyLength !== keyLength) {
    throw new Error(`Invalid key length. Key must be ${keyLength} bytes (${keyLength * 2} hex characters).`);
  }
};




const TokenValidator = (req, res, next) => {
  let token = req.headers['authorization'];
  if(token){
    token = token.split(' ')[1]
    console.log("token", token)
    jwt.verify(token, jwtkey, (err, valid)=>{
      if(err){
        res.status(401).send({result: "please provide  token in request header"})
      }else{
        next();
      }
    })
  }else{
     res.status(402).send({result: "please add token in request header"})
  }
}





