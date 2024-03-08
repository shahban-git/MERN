
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TablePagination from '@mui/material/TablePagination';

import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Button, makeStyles } from "@material-ui/core";

import {debounce} from  '../common_functions/common_function'

const useStyles = makeStyles((theme) => ({
  searchInput: {
    marginBottom: theme.spacing(2),
  },
  tableContainer: {
    marginTop: theme.spacing(2),
    marginLeft: "70px"
  },
}));


export default function ProductList() {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    getProducts();
  }, []);


  const getProducts = async () => {
    let result = await fetch("http://localhost:3005/products", {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });

    result = await result.json();
    console.log("rsult************", result.data)
    setProducts(result.data);
  };

  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:3005/product/${id}`, {
      method: "delete",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    if (result) {
      getProducts();
      alert("Record deleted successfully.");
    }
  };
  
  const throttledSearchHandle = debounce(searchHandle, 1000);
  
  async function searchHandle  (e)  {
    let key = e.target.value;
    if (key) {
      let result = await fetch(`http://localhost:3005/search/${key}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      if (result) {
        setProducts(result.data);
      }
    } else {
      getProducts();
    }
  }
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };


  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  

  return (
    <div className="product-List" style={{marginBottom:"20px", marginTop:"-10px"}}>
      <h1>Product List</h1>
      <TextField
        className={classes.searchInput}
        placeholder="Search"
        type="text"
        // onChange={searchHandle}
        onChange={throttledSearchHandle}
      />

      {products.length > 0 ? (
        <><TableContainer className={classes.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sr. No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
              <TableRow key={item._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.productname}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.company}</TableCell>
                <TableCell>
                  <Button onClick={() => deleteProduct(item._id)} variant="contained" color="secondary">Delete</Button>
                  <Button component={Link} to={`/update/${item._id}`} variant="contained" color="primary">Update</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  <TablePagination
  rowsPerPageOptions={[5, 10, 25]}
  component="div"
  count={products.length}
  rowsPerPage={rowsPerPage}
  page={page}
  onPageChange={handleChangePage}
  onRowsPerPageChange={handleChangeRowsPerPage}
/>
</>
      ) : (
        <p>Loading..............</p>
      )}

    </div>
  );
}




// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import TablePagination from '@mui/material/TablePagination';

// import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Button, makeStyles } from "@material-ui/core";

// const useStyles = makeStyles((theme) => ({
//   searchInput: {
//     marginBottom: theme.spacing(2),
//   },
//   tableContainer: {
//     marginTop: theme.spacing(2),
//     marginLeft: "70px"
//   },
// }));

// export default function ProductList() {
//   const classes = useStyles();
//   const [products, setProducts] = useState([]);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const navigate = useNavigate();

//   useEffect(() => {
//     getProducts();
//   }, []);


//   const getProducts = async () => {
  
//     let result = await fetch("http://localhost:3005/products", {
//       headers: {
//         authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
//       },
//     });

//     result = await result.json();
  
//     if (result.auth) {
//       const { user, auth } = result;
//       const expirationDate = new Date(auth.expirationDate); // Extract the expirationDate from the auth object
//       localStorage.setItem('user', JSON.stringify(user));
//       localStorage.setItem('token', JSON.stringify(auth));
//       setProducts(result);
//     } else {
      
//     }
//   };
  

//   const deleteProduct = async (id) => {
//     // checkTokenExpiration();

//     let result = await fetch(`http://localhost:3005/product/${id}`, {
//       method: "delete",
//       headers: {
//         authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
//       },
//     });
//     result = await result.json();
//     if (result) {
//       getProducts();
//       alert("Record deleted successfully.");
//     }
//   };

//   const searchHandle = async (e) => {
//     // checkTokenExpiration();

//     let key = e.target.value;
//     if (key) {
//       let result = await fetch(`http://localhost:3005/search/${key}`, {
//         headers: {
//           authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
//         },
//       });
//       result = await result.json();
//       if (result) {
//         setProducts(result);
//       }
//     } else {
//       getProducts();
//     }
//   };


//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

  
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };


//   return (
//     <div className="product-List" style={{marginBottom:"20px", marginTop:"-10px"}}>
//       <h1>Product List</h1>
//       <TextField
//         className={classes.searchInput}
//         placeholder="Search"
//         type="text"
//         onChange={searchHandle}
//       />

//       {products.length > 0 ? (
//         <>
//           <TableContainer className={classes.tableContainer}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Sr. No</TableCell>
//                   <TableCell>Name</TableCell>
//                   <TableCell>Price</TableCell>
//                   <TableCell>Category</TableCell>
//                   <TableCell>Company</TableCell>
//                   <TableCell>Edit</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
//                   <TableRow key={item._id}>
//                     <TableCell>{index + 1}</TableCell>
//                     <TableCell>{item.productname}</TableCell>
//                     <TableCell>{item.price}</TableCell>
//                     <TableCell>{item.category}</TableCell>
//                     <TableCell>{item.company}</TableCell>
//                     <TableCell>
//                       <Button onClick={() => deleteProduct(item._id)} variant="contained" color="secondary">Delete</Button>
//                       <Button component={Link} to={`/update/${item._id}`} variant="contained" color="primary">Update</Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//           <TablePagination
//             rowsPerPageOptions={[5, 10, 25]}
//             component="div"
//             count={products.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={handleChangePage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//           />
//         </>
//       ) : (
//         <p>Loading..............</p>
//       )}
//     </div>
//   );
// }






