const db = require('../models/taskModel');

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

module.exports = {
  getTasks,
  addTask
};
