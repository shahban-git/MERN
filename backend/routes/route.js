const express = require('express');
const router = express.Router();
const { TokenValidator } = require('../common/common');
const {userlogin} = require('../controllers/loginController');
const {UserRegister} = require('../controllers/RegisterContoller');
const {forgotPassword} = require('../controllers/ForgotPassword');
const { ChangePassword } = require('../controllers/ChangePassword');
const {encryptDecryptMiddleware} = require('../middleware/middleware')

const {  
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProduct
} = require('../controllers/productController')


  
// router.post('/register',encryptDecryptMiddleware, UserRegister, encryptDecryptMiddleware);
router.post('/register',encryptDecryptMiddleware, UserRegister, encryptDecryptMiddleware);
router.post('/login', encryptDecryptMiddleware, userlogin, encryptDecryptMiddleware);
router.get('/products',TokenValidator,encryptDecryptMiddleware, getAllProducts, encryptDecryptMiddleware);
router.post('/products', TokenValidator,encryptDecryptMiddleware, createProduct, encryptDecryptMiddleware);
router.delete('/product/:id', TokenValidator, deleteProduct);
router.get('/product/:id', TokenValidator,encryptDecryptMiddleware, getProductById, encryptDecryptMiddleware);
router.put('/product/:id', TokenValidator,encryptDecryptMiddleware, updateProduct, encryptDecryptMiddleware);
router.get('/search/:key', TokenValidator,encryptDecryptMiddleware, searchProduct, encryptDecryptMiddleware);
router.post('/forgotpassword', forgotPassword);
router.post('/ChangePassword', ChangePassword);

module.exports = router;
