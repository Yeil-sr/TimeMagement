const sqlite3 = require('sqlite3').verbose(); 
const { open } = require('sqlite'); 
const path = require('path');

function openDb() {
  return open({
    filename: '/tmp/BizManager.db', 
    driver: sqlite3.Database 
  });
}

module.exports = { openDb };
