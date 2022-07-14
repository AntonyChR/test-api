const fs = require('fs');

const PATH = './docs/index.html';

console.log('[POSTBUILD]: Formating index.html');
fs.readFile(PATH, 'utf-8', (error, data) => {
    if (error) {
        console.log(error);
        return;
    }
    const result = data.replace(/="\//g, '="./');
    
    fs.writeFile(PATH, result, 'utf-8', (error) => {
        console.log(error);
    });
});
