const fs = require('fs').promises;
const path = require('path');
const copyDir = require('../04-copy-directory/index');
const compileStyles = require('../05-merge-styles');

const templatePath = './06-build-page/template.html';
const componentsFolder = './06-build-page/components';
const stylesFolder = './06-build-page/styles';
const assetsFolder = './06-build-page/assets';
const outputFolder = './06-build-page/project-dist';
const outputFolderAssets = './06-build-page/project-dist/assets';

async function replaceTemplateTags(templateContent) {
  const regex = /\{\{(.+?)\}\}/g;
  let replacedContent = templateContent;

  const matches = Array.from(
    templateContent.matchAll(regex),
    (match) => match[1],
  );

  for (const match of matches) {
    const componentFilePath = path.join(componentsFolder, `${match}.html`);
    const componentContent = await fs.readFile(componentFilePath, 'utf-8');
    replacedContent = replacedContent.replace(`{{${match}}}`, componentContent);
  }

  return replacedContent;
}

async function buildPage() {
  try {
    await fs.mkdir(outputFolder, { recursive: true });

    const templateContent = await fs.readFile(templatePath, 'utf-8');

    const replacedTemplate = await replaceTemplateTags(templateContent);

    const indexPath = path.join(outputFolder, 'index.html');
    await fs.writeFile(indexPath, replacedTemplate);

    console.log('Index.html created successfully.');

    console.log('Build process completed successfully.');
  } catch (error) {
    console.error('Error during build process:', error.message);
  }
}

copyDir(assetsFolder, outputFolderAssets);
compileStyles(stylesFolder, outputFolder, 'style.css');
buildPage();
