const express = require('express');
const connectDB = require('./config/db');
const app = express();

//connect database
connectDB();

//init middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
  res.send('API Running');
});

//Define Routes
app.use('/api/customer', require('./routes/api/customerUsers'));
app.use('/api/typiest', require('./routes/api/typiestusers'));
app.use('/api/Admin', require('./routes/api/adminUser'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server start at port ${PORT}`));
