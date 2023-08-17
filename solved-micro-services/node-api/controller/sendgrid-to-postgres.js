const axios = require("axios");
const EmailActivity = require("../Models/email-activity"); // Adjust path as needed
require('dotenv').config();


// SendGrid API configuration
const authKey = process.env.SENDGRID_AUTHORIZATION_KEY;
const sendgridAPI = axios.create({
  baseURL: "https://api.sendgrid.com/v3",
  headers: {
    Authorization:
    `Bearer ${authKey}`
  },
});

async function fetchAndInsertData() {
  try {
    const response = await sendgridAPI.get("/messages?limit=100");
    const messages = response.data.messages;

    // Insert data into PostgreSQL using Sequelize model
    for (const message of messages) {
      const {
        from_email,
        msg_id,
        subject,
        to_email,
        status,
        opens_count,
        clicks_count,
        last_event_time,
      } = message;

      await EmailActivity.findOrCreate({
        where: { msg_id },
        defaults: {
          from_email,
          subject,
          to_email,
          status,
          opens_count,
          clicks_count,
          last_event_time,
        },
      });

      console.log(`Record inserted: msg_id - ${msg_id}`);
    }

    console.log("Data inserted into PostgreSQL.");
  } catch (error) {
    console.error("Error fetching and inserting data:", error);
  }
}

module.exports = {
  fetchAndInsertData,
};
