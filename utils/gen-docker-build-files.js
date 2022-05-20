const fs = require('fs');
const path = require('path');

const dockerFilesDir = path.join(__dirname, '..', 'docker-files');
if (!fs.existsSync(dockerFilesDir)) {
  console.log('Criando ' + dockerFilesDir);
  fs.mkdirSync(dockerFilesDir);
}

const pkg = require('../package.json');
const depsPkg = {
  dependencies: Object.keys(pkg.dependencies)
    .sort()
    .reduce((obj, k) => {
      obj[k] = pkg.dependencies[k];
      return obj;
    }, {}),
  devDependencies: Object.keys(pkg.devDependencies)
    .sort()
    .reduce((obj, k) => {
      obj[k] = pkg.devDependencies[k];
      return obj;
    }, {})
};

const depsPkgFile = path.join(dockerFilesDir, 'package.json');
fs.writeFileSync(depsPkgFile, JSON.stringify(depsPkg, undefined, 2));
fs.copyFileSync(
  path.join(__dirname, '..', 'yarn.lock'),
  path.join(dockerFilesDir, 'yarn.lock')
);
