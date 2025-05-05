// const express = require('express')
// const cors = require('cors')
// const app = express();
// const router = require('./routes/student')
// const dbconfig = require('./dbconfig/dbconfig')
// dbconfig;
// app.use(cors())
// app.use(express.json())

// app.use('/api',router)

// app.listen(3000,(req,res)=>{
//       console.log("Server is running at port 3000")
// })

// filepath: d:\ALL PRACTICLES\WAD_ProblemStatments\W19\server.js
const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./routes/student');
const dbconfig = require('./dbconfig/dbconfig');

// Initialize database connection
dbconfig;

// Middleware
app.use(cors());
app.use(express.json());

// Register routes
app.use('/api', router);

// Start the server
app.listen(3000, () => {
    console.log("Server is running at port 3000");
});