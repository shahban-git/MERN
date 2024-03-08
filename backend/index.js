const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes/route');
require('./db/config');
const helmet = require('helmet'); // Import the Helmet package
app.use(helmet()); // Use Helmet middleware for enhanced security
app.use(express.json());
app.use(cors());
app.use('/', routes);

const port = 3005;


app.get('/', (req, res) => {
  res.send(`server is up and running on port ${port}`); // Replace 'index.html' with your main HTML file
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})






