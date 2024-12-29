const fs = require("fs");
const path = require("path");

const backupDir = './public/images/blogs/backup';

fs.readdir(backupDir, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  files.forEach(file => {
    const filePath = path.join(backupDir, file);
    
    // Delete each file
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Error deleting ${file}:`, err);
      } else {
        console.log(`Deleted ${file} successfully!`);
      }
    });
  });
});
