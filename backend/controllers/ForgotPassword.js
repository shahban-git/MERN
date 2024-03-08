
const ForgotPassSchema = require('../models/forgotpassword');
const RegisterSchema = require('../models/Register');
const logger = require('../logger');


const forgotPassword = async (req, res) => {
    try {
        console.log("forgot");

        const { email, Otp } = req.body;

        if (!email || !Otp) {
            return res.status(400).send({ status_code: "01", status_desc: 'fail', error: 'Email password is required' });
        }
        const existingUser = await RegisterSchema.findOne({ email }).maxTimeMS(20000);;
        const hardcodedOTP = "1111";
        if (existingUser) {
          if (Otp !== hardcodedOTP) {
               logger.info(`${email} Incorrect OTP`, { route: '/forgotPassword' });
               return res.status(400).send({ status_code: "01", status_desc: 'fail', error: 'Incorrect OTP' });
           }
            // const user = new ForgotPassSchema({ email, Otp });
            const user = new ForgotPassSchema({ email, Otp });
            const result = await user.save();
            logger.info(`result:${JSON.stringify(result)}`, { route: '/forgotPassword' });
            return res.status(200).send({ status_code: "00", status_desc: 'success', message: 'Password reset request submitted' });
        } else {
            logger.info(`${email} this Email does not exist`, { route: '/forgotPassword' });
            return res.status(400).send({ status_code: "01", status_desc: 'fail', error: 'Email does not exist' });
        }

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ status_code: "01", status_desc: 'fail', error: 'Internal server error' });
    }
};


module.exports = {
    forgotPassword
};
