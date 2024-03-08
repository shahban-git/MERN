
import React, { useEffect, useState } from "react";
import { Button, Grid, TextField, makeStyles } from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    maxWidth: '300px',
    margin: '10px auto',
  },
  error: {
    color: 'red',
  },
}));

export default function UpdateProductPage() {
  const classes = useStyles();
  const [productname, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [errors, setErrors] = useState({});
  const params = useParams();
  const navigate = useNavigate();

  const updateProduct = async () => {
    console.log("Data:", productname, price, category, company);
    let result = await fetch(`http://localhost:3005/product/${params.id}`, {
      method: "PUT",
      body: JSON.stringify({ productname, price, category, company }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    console.log("UpdateProduct result", result);
    navigate("/");
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    console.warn("params,", params);
    let result = await fetch(`http://localhost:3005/product/${params.id}`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    console.warn("result,", result);
    setProductName(result.data.productname);
    setPrice(result.data.price);
    setCategory(result.data.category);
    setCompany(result.data.company);
  };

  return (
    <div className='signup' style={{textAlign:"center", marginLeft:"90px"}}>
      <h1>Update Product</h1>
      <form className={classes.form} noValidate autoComplete="off">
          <TextField
            className={classes.inputBox}
            type="text"
            value={productname}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Name"
            variant="outlined"
            fullWidth
            error={!!errors.productname}
            helperText={errors.productname && "Please enter a product name."}
          />
      
       
          <TextField
            className={classes.inputBox}
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            variant="outlined"
            fullWidth
            error={!!errors.price}
            helperText={errors.price && "Please enter a price."}
          />
 
          <TextField
            className={classes.inputBox}
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category"
            variant="outlined"
            fullWidth
            error={!!errors.category}
            helperText={errors.category && "Please enter a category."}
          />
      
          <TextField
            className={classes.inputBox}
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Company"
            variant="outlined"
            fullWidth
            error={!!errors.company}
            helperText={errors.company && "Please enter a company."}
          />
  
      <Button
        type="button"
        onClick={updateProduct}
        variant="contained"
        color="primary"
        style={{ marginTop: "10px" }}
      >
        Update Product
      </Button>
      </form>
    </div>
  );
}
