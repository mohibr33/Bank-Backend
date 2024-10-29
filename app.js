// app.js
const express = require("express");
const authRoutes = require("../Bank-Backend/routes/authroutes");

const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

// Define routes
app.use("/api",authRoutes);

app.listen(3005, () => {
  console.log("Server is running on port 3005");
});