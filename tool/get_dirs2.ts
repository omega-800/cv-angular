const fs = require('fs');

interface FileLists {
  [directory: string]: string[];
}

function listDirectory(path: string): FileLists {
  const files = fs.readdirSync(path);
  const fileList: FileLists = {};

  for (const file of files) {
    const filePath = `${path}/${file}`;
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      const subList = listDirectory(filePath);
      for (const subdir in subList) {
        fileList[`${file}/${subdir}`] = subList[subdir];
      }
    } else {
      const directory = path.split('/').slice(1).join('/');
      fileList[directory] = fileList[directory] || [];
      fileList[directory].push(file);
    }
  }

  return fileList;
}

const fileList = listDirectory('root');
console.log(JSON.stringify(fileList, null, 2));
