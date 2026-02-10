// .env config
import 'dotenv/config';

// App import
import app from './src/app.js';

// DNS
import dns from 'dns';
dns.setDefaultResultOrder('ipv4first');

// DB connect
import connectDB from './src/config/db.js';
connectDB(); // Connect to MongoDB

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
