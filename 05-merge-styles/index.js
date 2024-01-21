const fs = require('fs').promises;
const path = require('path');

const srcFolder = './05-merge-styles/styles';
const distFolder = './05-merge-styles/project-dist';
const outputFileName = 'bundle.css';

async function compileStyles(stylesFolder, outputFolder, outputFile) {
  try {
    await fs.mkdir(outputFolder, { recursive: true });

    const files = await fs.readdir(stylesFolder);

    const cssFiles = files.filter((file) => path.extname(file) === '.css');

    const stylesArray = await Promise.all(
      cssFiles.map(async (file) => {
        const filePath = path.join(stylesFolder, file);
        const fileContent = await fs.readFile(filePath, 'utf-8');
        return fileContent;
      }),
    );

    const bundleFilePath = path.join(outputFolder, outputFile);
    await fs.writeFile(bundleFilePath, stylesArray.join('\n'));

    console.log('Styles compilation completed successfully.');
  } catch (error) {
    console.error('Error during styles compilation:', error.message);
  }
}

compileStyles(srcFolder, distFolder, outputFileName);

module.exports = compileStyles;
