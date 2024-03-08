

'use strict';

const jwt = require('jsonwebtoken');
const logger = require('../logger');
const crypto = require('crypto');

const { encryptDecrypt, enforceKeyLength } = require('../common/common');
const RegisterSchema = require('../models/Register');

const jwtKey = process.env.JWT_KEY || 'e-com'; // Use an environment variable for jwtkey

const UserRegister = async (req, res, next) => {


  const { name, email, password } = req.body;

  try {
    // Check if the email is already present in the database
    if(email === undefined || email === Null){
      return res.status(500).send({status_code: "01", status_desc: 'fail', error: 'invalid email id' });
    }
    const existingUser = await RegisterSchema.findOne({ email }).maxTimeMS(20000);
    if (existingUser) {
      logger.info(`${email} this Email already exists`, { route: '/Register' });
      return res.status(400).send({status_code: "01", status_desc: 'fail', error: 'Email already exists' });
    }
    // let user = new RegisterSchema({ name, email, password: encryptedPassword, encryptionKey: key });
    let user = new RegisterSchema({ name, email, password});
    let result = await user.save();
    result = result.toObject();
    logger.info(`result:${JSON.stringify(result)}`, { route: '/Register' });

    // Set expiration time to 60 seconds from the current time
    const expirationDate = new Date();
    expirationDate.setSeconds(expirationDate.getSeconds() + 60 * 60);

    // Generate JWT token using an asynchronous version of jwt.sign
    const token = await jwt.sign({ result, expirationDate }, jwtKey, { expiresIn: '60sec' });
    res.setHeader('Authorization', `Bearer ${token}`); // Set the JWT token in the Authorization header

    // res.status(200).send({ status_code: "00", status_desc: 'success', data: result });
    let  response_data = {data: result}

    res.locals.responseBody = response_data; // Setting response data for encryption
    next();
    
    logger.info('collectData', { route: '/Register' });
    console.log('************Registration is successful***********');
  } catch (err) {
    logger.error(`Error during user registration: ${err.message}`, { route: '/Register' });
    res.status(500).send({ status_code: "01", status_desc: 'fail', error: 'Something went wrong' });
  }
};

module.exports = {
  UserRegister
};
