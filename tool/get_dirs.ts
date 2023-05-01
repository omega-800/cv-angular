//const fs = require('fs');

interface DirectoryContents {
  [directory: string]: string[] | DirectoryContents;
}

function getDirectoryContents(path: string): DirectoryContents {
  const contents: DirectoryContents = {};

  const files = fs.readdirSync(path);
  for (const file of files) {
    const filePath = `${path}/${file}`;
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      contents[file] = getDirectoryContents(filePath);
    } else {
      const directory = path.split('/').slice(1).join('/');
      contents[directory] = contents[directory] || [];
      //contents[directory].push(file);
    }
  }

  return contents;
}

const contents = getDirectoryContents('src/assets');
console.log(JSON.stringify(contents, null, 2));