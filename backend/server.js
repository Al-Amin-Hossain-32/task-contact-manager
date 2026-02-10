require("dotenv").config();
const app = require("./src/app");

const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

const connectDB = require("./src/config/db");


connectDB(); // Connect to MongoDB

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})