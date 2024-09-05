const sqlite3 = require('sqlite3').verbose(); 
const { open } = require('sqlite'); 
const path = require('path');

async function openDb() {
  const db = await open({
    filename: path.join('/tmp', 'BizManager.db'), 
    driver: sqlite3.Database 
  });
  
  return db;
}

module.exports = { openDb };
