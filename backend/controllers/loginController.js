const jwt = require('jsonwebtoken');
const jwtkey = 'e-com';
const loginSchema = require('../models/Login');
const RegisterSchema = require('../models/Register');
const logger = require('../logger');


const userlogin = async (req, res, next) => {
  try {
    if (req.body.password && req.body.email) {
      const user = await RegisterSchema.findOne({ email: req.body.email }).maxTimeMS(20000).limit(1).catch((err) => {
        console.error('Error fetching user:', err);
        return res.status(500).send({ status_code: '01', status_desc: 'fail', message: 'Error fetching user' });
      });

      if (!user || user.length === 0) {
        return res.status(404).send({ status_code: '01', status_desc: 'fail', message: 'User is not registered' });
      }

      if (user.password !== req.body.password) {
        return res.status(401).send({ status_code: '01', status_desc: 'fail', message: 'Invalid password' });
      }

      jwt.sign({ user }, jwtkey, { expiresIn: '1hr' }, async (err, token) => {
        if (err) {
          return res.status(500).send({ status_code: '01', status_desc: 'fail', message: 'Something went wrong' });
        } else {
          const loginData = {
            email: req.body.email,
            password: req.body.password,
            loginTime: new Date(),
          };

          await loginSchema.findOneAndUpdate({ email: req.body.email }, loginData, { upsert: true }).maxTimeMS(20000);;

          const result = { user, auth: token, loginTime: loginData.loginTime };
          res.locals.responseBody = result; // Setting response data for encryption
          next(); // Continue to the next middleware
        }
      });
    } else {
      res.status(400).send({ status_code: '01', status_desc: 'fail', message: 'Invalid request. Missing email or password' });
    }
  } catch (error) {
    console.error('Error in userlogin:', error);
    res.status(500).send({ status_code: '01', status_desc: 'fail', message: 'Internal server error' });
  }
};



module.exports = {
  userlogin
};

