const fs = require('fs').promises;
const path = require('path');

const sourceFolder = './04-copy-directory/files';
const destinationFolder = './04-copy-directory/files-copy';

async function copyDir(source, destination) {
  try {
    const files = await fs.readdir(source);

    await fs.mkdir(destination, { recursive: true });

    await Promise.all(
      files.map(async (file) => {
        const sourcePath = path.join(source, file);
        const destinationPath = path.join(destination, file);

        try {
          const stats = await fs.stat(sourcePath);

          if (stats.isDirectory()) {
            await copyDir(sourcePath, destinationPath);
          } else {
            await fs.copyFile(sourcePath, destinationPath);
          }
        } catch (error) {
          console.error(`Error copying ${file}:`, error.message);
        }
      }),
    );

    const destinationFiles = await fs.readdir(destination);
    const filesToRemove = destinationFiles.filter(
      (file) => !files.includes(file),
    );

    await Promise.all(
      filesToRemove.map(async (file) => {
        const filePath = path.join(destination, file);
        await fs.unlink(filePath);
      }),
    );

    console.log('Copy operation completed successfully.');
  } catch (error) {
    console.error('Error during copy operation:', error.message);
  }
}

copyDir(sourceFolder, destinationFolder);

module.exports = copyDir;
