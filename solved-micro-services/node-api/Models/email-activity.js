const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust path as needed

const EmailActivity = sequelize.define('Email_Activity', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  from_email: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  msg_id: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  subject: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  to_email: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  opens_count: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  clicks_count: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  last_event_time: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
    tableName: "Email_Activity",
  timestamps: false, // Disable automatic timestamp fields
});

module.exports = EmailActivity;
