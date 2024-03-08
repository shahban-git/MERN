
// export const loginApi = async(email, password)=> {
//   try {
//     const response = await fetch('http://localhost:3005/login', {
//       method: 'post',
//       body: JSON.stringify({ email, password }),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     const result = await response.json();
//     if (result.auth || result.status_code === '00') {
//       const { user, auth } = result;
//       await localStorage.setItem('user', JSON.stringify(user));
//       await localStorage.setItem('token', JSON.stringify(auth)); // Save the token to localStorage


//       return { success: true };
//     } else {
//       return { success: false, error: 'Login error' };
//     }
//   } catch (error) {
//     console.error('Login error:', error);
//     return { success: false, error: 'Login error' };
//   }
// }



export const loginApi = async (email, password) => {
  try {
    const response = await fetch('http://localhost:3005/login', {
      method: 'post',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();
    if (result.status_code === '00' && result.status_desc === 'success') {
      const { user, auth } = result.data; // Extract data from the 'data' object
      await localStorage.setItem('user', JSON.stringify(user));
      await localStorage.setItem('token', JSON.stringify(auth)); // Save the token to localStorage
      return { success: true };
    } else {
      return { success: false, error: 'Login error' };
    }
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'Login error' };
  }
};


export const SignupApi = async(name, email, password)=> {
  try {
    let result = await fetch('http://localhost:3005/Register', {
      method: 'post',
      body: JSON.stringify({ name, email, password }), // Include name field in the request body
      headers: {
        'Content-Type': 'application/json',
      },
    });  
    result = await result.json();
    return result
  } catch (error) {
    console.error('signup error:', error);
    return {error: 'signup error' };
  }
}



export const addProduct = async (productData) => {
  const { productname, price, category, company } = productData;
  
  if (!productname || !price || !category || !company) {
    throw new Error('Please fill in all the fields.');
  }
  const userId = JSON.parse(localStorage.getItem('user'))._id;
  const token = JSON.parse(localStorage.getItem('token'));
  const response = await fetch('http://localhost:3005/addproduct', {
    method: 'post',
    body: JSON.stringify({ productname, price, category, company, userId }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to add the product.');
  }
  const result = await response.json();
  return result;
};

