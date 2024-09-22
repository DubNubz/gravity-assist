import { readdirSync, statSync, writeFileSync } from 'fs';
import { join, extname, dirname } from 'path';
import { fileURLToPath } from 'url';

// @ts-ignore
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const publicDir = join(__dirname, 'public');
const imageExtensions = ['.svg', '.png'];

function getImagePaths(dir: string, fileList: string[] = []) {
  const files = readdirSync(dir);

  files.forEach(file => {
    const filePath = join(dir, file);
    const stat = statSync(filePath);

    if (stat.isDirectory()) {
      getImagePaths(filePath, fileList);
    } else if (imageExtensions.includes(extname(file).toLowerCase())) {
      const normalizedPath = filePath.replace(publicDir, '').replace(/\\/g, '/');
      fileList.push(normalizedPath);
    }
  });

  return fileList;
}

const imagePaths = getImagePaths(publicDir);
const outputPath = join(__dirname, 'imagePaths.json');

writeFileSync(outputPath, JSON.stringify(imagePaths, null, 2));