require("dotenv").config();
const express = require("express");
const connDB = require("./config/db");
const cors = require('cors');
const userrouter= require('./routes/user.routes')
const landrouter=require('./routes/land.routes')
const applyRoutes = require('./routes/apply.routes')
const paymentRoutes = require('./routes/payment.routes');


const app = express();
app.use(cors())
app.use(express.json());

// Routes
app.use('/api/user',userrouter);
app.use('/api/land',landrouter);
app.use('/api/apply',applyRoutes);
app.use('/api/payment',paymentRoutes);


const PORT = process.env.PORT;
connDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}/`);
  });
});
