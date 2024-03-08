
// // let CryptoJS = require("crypto-js");
// let crypto_mod = require('crypto')

// const { key, IV} = require('./config/config')

// const symmetricCrypto = function(type, key, IV, data) {
//     return new Promise((resolve, reject) => {
//       let result;  // Moved the variable declaration outside of the try block
//       try {
//         switch (type) {
//           case 'E':
//             const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key, {
//               iv: IV,
//               mode: CryptoJS.mode.CBC,
//               padding: CryptoJS.pad.Pkcs7
//             });
//             result = encrypted.toString();
//             break;
//           case 'D':
//             const decrypted = CryptoJS.AES.decrypt(data, key, {
//               iv: IV,
//               mode: CryptoJS.mode.CBC,
//               padding: CryptoJS.pad.Pkcs7
//             });
//             result = decrypted.toString(CryptoJS.enc.Utf8);
//             break;
//           default:
//             reject(new Error("Invalid type"));  // Added a default case for unexpected 'type' values
//             return;
//         }
//         resolve(result);
//       } catch (e) {
//         console.error("symmetricCrypto - Exception:", e);
//         reject(e);  // Changed the reject statement to pass the error object directly
//       }
//     });
//   };



// let originalData = "U2FsdGVkX1/78UbHE4kH+iuxZWAbhtyfYTwbZDSvg9ZFKzbiqujggtPnOwUPe8tJw6ovX/4z0F269GpQrVTIQolvJuCk8EZgd82aRDLAv/kKfD88vLKfr4cqJQPHoWOmSZN3kj156/tDcIFILM2Zd29AQpcLC7fUAxzC7FYbNvOq5138JrAzsWLUAxM6E4EoQEuaPzwfbHm91qpZce1xnafy/XkDGJiT5QvKqasIowb7BjO43/pJRtm1bdwQ63I64b3Oa0fbi/a1F1AxWvtrwNyRdXltZ4mU6lgR8lSV7uhjq9Muo+ZMSE19mAwqwKcFO0GL8YuLVYTt6iv17KMqZTe91Q3V1o2HZSjVLyNdXP97qgAAsifGj42yj0XY1ekd80YNzlEQ2P4p0IuO1Jh4tszdFdzZGwRH9mAIr6INtf9H9qPW2/6cuGBKq5RQm+3BerZ1AOx6xVq44TcCmWYy2+pKfAXvzqFCyJ+8JbVGq2UfZHuRgti7jr4IZfq6Jt55usnOkcfKC8k3Bv/V1oOdLkvmuVjRWij17DSnheTya8a1GEvlC4+qcD51/ARGRbj7uv8K/B8udUZamUxrPfLfEPiewJS4JlmFmB4GSwOPElK0X55LQjmWNJz+bXqdeuLcRUs++J9j77ePwmGEOjN+MbI/zshWeLIoK1xd2GqTMi5wwijc0D1pykeR+/2LuptURwfAt0WwfV6iLq0/U0bf0/VRP8qbwa5VxvdNYAoPbqP10Y9Nvc2JOWiN2v3vTBWn"
// // let originalData = {
// //   "email":"Shannkhanbhai12345@gmail.com",
// //   "password":"12345"
// // }


// symmetricCrypto('D', key, IV, originalData)
//   .then(encryptedData => {
//     console.log('Encrypted Data:', encryptedData);
//     return symmetricCrypto('E', key, IV, encryptedData);
//   })
//   .then(decryptedData => {
//     console.log('Decrypted Data:', JSON.parse(decryptedData));
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });




//   function generateAESKey() {
//     // Generate a random 128-bit key (16 bytes)
//     const key = CryptoJS.lib.WordArray.random(128 / 8);
//     // onvert the key to a hexadecimal string
//     const keyHex = CryptoJS.enc.Hex.stringify(key);
//     return keyHex;
//   }
//   // Example usage:
//   const aesKey = generateAESKey();
//   console.log('AES Key:', aesKey);


// Create a sample collection

const mongoose = require('mongoose');
mongoose.set('debug', true);

mongoose.connect('mongodb://0.0.0.0:27017/e-commerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.getCollectionNames()


db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async function () {
  console.log('Connected to MongoDB');

  try {
    // Create a Mongoose model and schema
    const MyModel = mongoose.model('MyModel', new mongoose.Schema({
      name: String,
      age: Number,
      city: String,
    }));

    // Insert documents into the collection
    const result = await MyModel.insertMany([
      { name: 'Alice', age: 30, city: 'New York' },
      { name: 'Bob', age: 25, city: 'San Francisco' },
      { name: 'Charlie', age: 35, city: 'Los Angeles' },
    ]);

    console.log('Documents inserted successfully:', result);

    // Use the Aggregation Framework to aggregate data
    const aggregationResult = await MyModel.aggregate([
      { $match: { city: 'New York' } },
      { $group: { _id: '$city', totalAge: { $sum: '$age' } } },
    ]);

    // Print the aggregation result
    console.log('Aggregation Result:', aggregationResult);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
  }
});
