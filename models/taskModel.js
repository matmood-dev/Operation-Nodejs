const sqlite3 = require('sqlite3').verbose();
const path = require('path');
require('dotenv').config(); // Add this line to load environment variables

// Connect to SQLite database
const dbPath = path.resolve(__dirname, process.env.DATABASE_URL); // Use environment variable
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to SQLite database.');
    db.run(`CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      installerName TEXT,
      invoiceNo TEXT,
      amount REAL,
      customerName TEXT,
      mobileNumber TEXT,
      area TEXT,
      driver TEXT,
      fixingTime TEXT,
      status TEXT,
      type TEXT,
      statusDetail TEXT
    )`);
  }
});

const getTasks = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM tasks', [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const addTask = (task) => {
  return new Promise((resolve, reject) => {
    const { installerName, invoiceNo, amount, customerName, mobileNumber, area, driver, fixingTime, status, type, statusDetail } = task;
    db.run(`INSERT INTO tasks (installerName, invoiceNo, amount, customerName, mobileNumber, area, driver, fixingTime, status, type, statusDetail) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [installerName, invoiceNo, amount, customerName, mobileNumber, area, driver, fixingTime, status, type, statusDetail],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, ...task });
        }
      });
  });
};

const updateTask = (id, task) => {
  return new Promise((resolve, reject) => {
    const { installerName, invoiceNo, amount, customerName, mobileNumber, area, driver, fixingTime, status, type, statusDetail } = task;
    db.run(`UPDATE tasks SET installerName = ?, invoiceNo = ?, amount = ?, customerName = ?, mobileNumber = ?, area = ?, driver = ?, fixingTime = ?, status = ?, type = ?, statusDetail = ?
            WHERE id = ?`,
      [installerName, invoiceNo, amount, customerName, mobileNumber, area, driver, fixingTime, status, type, statusDetail, id],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id, ...task });
        }
      });
  });
};

const deleteTask = (id) => {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM tasks WHERE id = ?', [id], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

module.exports = {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
  db
};
