
const productschema = require('../models/Product');

const logger = require('../logger');


const getAllProducts = async (req, res) => {
  try {
    const products = await productschema.find();
    logger.info(`products :${JSON.stringify(products)}`, { route: '/getAllProducts' });

  res.locals.responseBody = products; // Setting response data for encryption
  next(); 
    // res.status(200).json({ status_code: "00", status_desc: "success", data: products });
  } catch (error) {
    console.error('Error in getAllProducts:', error);
    res.status(500).json({ status_code: "01", status_desc: "fail", error: 'Server error' });
  }
};

const getProductById = async (req, res) => {
  const productId = req.params.id;
  logger.info(`productId :${JSON.stringify(productId)}`, { route: '/getProductById' });

  try {
    const product = await productschema.findById(productId);

    logger.info(`product :${JSON.stringify(product)}`, { route: '/getProductById' });

    if (!product) {
      return res.status(404).json({ status_code: "01", status_desc: "fail", error: 'Product not found' });
    }

    
  res.locals.responseBody = product; // Setting response data for encryption
  next(); 

    // res.status(200).json({ status_code: "00", status_desc: "success", data: product });
  } catch (error) {
    console.error('Error in getProductById:', error);
    res.status(500).json({ status_code: "01", status_desc: "fail", error: 'Server error' });
  }
};

const createProduct = async (req, res) => {
  const { productName, price, category, company } = req.body;

  try {
    const product = new productschema({ productName, price, category, company });
    await product.save();
    logger.info(`product :${JSON.stringify(product)}`, { route: '/createProduct' });
    

  res.locals.responseBody = product; // Setting response data for encryption
  next(); 

    // res.status(201).json({ status_code: "00", status_desc: "success", data: product });
  } catch (error) {
    console.error('Error in createProduct:', error);
    res.status(500).json({ status_code: "01", status_desc: "fail", error: 'Server error' });
  }
};

const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const updates = req.body;

  try {
    const product = await productschema.findByIdAndUpdate(productId, updates, { new: true });
    logger.info(`product :${JSON.stringify(product)}`, { route: '/updateProduct' });

    if (!product) {
      return res.status(404).json({ status_code: "01", status_desc: "fail", error: 'Product not found' });
    }

    
  res.locals.responseBody = product; // Setting response data for encryption
  next(); 

    // res.status(200).json({ status_code: "00", status_desc: "success", data: product });
  } catch (error) {

    console.error('Error in updateProduct:', error);
    res.status(500).json({ status_code: "01", status_desc: "fail", error: 'Server error' });
  }
};



const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await productschema.findByIdAndDelete(productId);
    logger.info(`product :${JSON.stringify(product)}`, { route: '/deleteProduct' });

    if (!product) {
      return res.status(404).json({ status_code: "01", status_desc: "fail", error: 'Product not found' });
    }
    res.status(200).json({ status_code: "00", status_desc: "success", message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error in deleteProduct:', error);
    res.status(500).json({ status_code: "01", status_desc: "fail", error: 'Server error' });
  }
};

const searchProduct = async (req, res, next) => {
  const key = req.params.key;
  const regex = new RegExp(key, 'i');
  let result = await productschema.find({
    $or: [
      { productname: { $regex: regex } },
      { company: { $regex: regex } },
      { category: { $regex: regex } }
    ]
  });

  logger.info(`result :${JSON.stringify(result)}`, { route: '/searchProduct' });

  res.locals.responseBody = result; // Setting response data for encryption
  next(); 

  // res.status(200).json({ status_code: "00", status_desc: "success", data: result });
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
  // Export other controller methods
};
