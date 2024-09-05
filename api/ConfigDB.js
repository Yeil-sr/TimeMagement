const sqlite3 = require('sqlite3').verbose(); 
const { open } = require('sqlite'); 

function openDb() {
  return open({
    filename: '/tmp/BizManager.db',
    driver: sqlite3.Database 
  });
}

module.exports = { openDb };
