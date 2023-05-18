const fs = require('fs');
const path = require('path');

const rootDirectory = "../src/assets"; // Assuming this script is in the root directory of your project
const outputFilePath = path.join(rootDirectory, 'fileStructure.json');

interface FileStructure {
  [key: string]: FileStructure | string;
}

function getFileStructure(dir: string): FileStructure {
  const fileStructure: FileStructure = {};

  let i = 0;
  const files = fs.readdirSync(dir);
  files.forEach((file: string) => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      fileStructure[file] = getFileStructure(filePath);
    } else {
      fileStructure[i.toString()] = file;
      i++;
    }
  });

  return fileStructure;
}

const fileStructure = getFileStructure(rootDirectory);
fs.writeFileSync(outputFilePath, JSON.stringify(fileStructure, null, 2));
export { };

