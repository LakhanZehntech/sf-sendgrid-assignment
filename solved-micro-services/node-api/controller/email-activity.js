const EmailActivity = require("../Models/email-activity"); // Adjust path as needed

async function getEmailActivityData() {
  try {
    const records = await EmailActivity.findAll();
    return records;
  } catch (error) {
    console.error("Error retrieving data:", error);
    throw error;
  }
}

module.exports = {
  getEmailActivityData,
};
