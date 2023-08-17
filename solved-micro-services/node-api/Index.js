const express = require("express");
require('dotenv').config();
const emailActivityController = require("./controller/sendgrid-to-postgres"); 
const emailActivity = require("./controller/email-activity"); 

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware to check Authorization header
function authorize(req, res, next) {

const authKey = process.env.AUTHORIZATION_KEY;

  const authHeader = req.header("Authorization");

  
  const expectedToken =
    `${authKey}`;

  if (authHeader !== expectedToken) {
    return res.status(401).json({statuscode:401, error: "Unauthorized." });
  }
  next();
}

// Route to fetch and insert data
app.get("/fetch-and-insert", async (req, res) => {
  await emailActivityController.fetchAndInsertData();
  res.send("Data fetched and inserted.");
});


// Route to get email activity data
app.get("/get-email-activity", authorize, async (req, res) => {
  try {
    const records = await emailActivity.getEmailActivityData();
    res.status(200).json({statuscode:200,body:records});
  } catch (error) {
    res.status(500).json({ statuscode:500,error: "An error occurred while fetching data." });
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

