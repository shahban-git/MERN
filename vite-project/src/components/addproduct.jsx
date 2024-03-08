

import React, { useState } from 'react';
import { TextField, Button, makeStyles } from '@material-ui/core';

import {addProduct} from '../services/services'

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    maxWidth: '300px',
    margin: '0 auto',
  },
  error: {
    color: 'red',
  },
}));

export default function AddProduct() {
  const classes = useStyles();

  const [productname, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [company, setCompany] = useState('');
  const [errors, setErrors] = useState({
    productname: false,
    price: false,
    category: false,
    company: false,
  });


  const addThisProduct = async () => {
    try {
      const productData = { productname, price, category, company };
      const result = await addProduct(productData);
      console.log('Result================:', result);
      alert(`${productname} added successfully`);
    } catch (error) {
      console.error('Error:', error.message);
      // Handle the error, e.g., show an error message to the user
    }
  };



  return (
    <div className='signup' style={{textAlign:"center", marginLeft:"90px"}}>
      <h1 style={{textAlign:"center"}}>add Product</h1>
      <form className={classes.form} noValidate autoComplete="off">
        <TextField
          label="Name"
          variant="outlined"
          error={errors.productname}
          helperText={errors.productname && <span className={classes.error}>Please enter a product name.</span>}
          value={productname}
          onChange={(e) => setProductName(e.target.value)}
        />
        <TextField
          label="Price"
          variant="outlined"
          error={errors.price}
          helperText={errors.price && <span className={classes.error}>Please enter a price.</span>}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <TextField
          label="Category"
          variant="outlined"
          error={errors.category}
          helperText={errors.category && <span className={classes.error}>Please enter a category.</span>}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <TextField
          label="Company"
          variant="outlined"
          error={errors.company}
          helperText={errors.company && <span className={classes.error}>Please enter a company.</span>}
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={addThisProduct}
          className={classes.signupButton}
        >
          Add Product
        </Button>
      </form>
    </div>
  );
}

