const fs = require('fs');
const path = require('path');

const secretFolderPath = './03-files-in-folder/secret-folder';

const formatFileSize = (sizeInBytes) => {
  return `${(sizeInBytes / 1024).toFixed(3)}kb`;
};

const displayFileInfo = (filePath) => {
  fs.stat(filePath, (err, stats) => {
    if (err) {
      console.error(`Error getting file stats for ${filePath}:`, err.message);
      return;
    }

    const { name, ext } = path.parse(filePath);
    const fileSize = formatFileSize(stats.size);
    console.log(`${name} - ${ext.substr(1)} - ${fileSize}`);
  });
};

fs.readdir(secretFolderPath, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.error('Error reading secret folder:', err.message);
    return;
  }

  // Filter out only files and display their information
  files
    .filter((file) => file.isFile())
    .forEach((file) => {
      const filePath = path.join(secretFolderPath, file.name);
      displayFileInfo(filePath);
    });
});
