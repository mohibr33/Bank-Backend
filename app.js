const express = require("express");
const authRoutes = require("../Bank-Backend/routes/authroutes");
const paymentRoutes=require("../Bank-Backend/routes/paymentRoutes");
const transactionRoutes=require("../Bank-Backend/routes/transactionRoutes")
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.use("/api",authRoutes);
app.use("/api",paymentRoutes);
app.use("/api",transactionRoutes);


app.listen(3005, () => {
  console.log("Server is running on port 3005");
});