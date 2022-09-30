const fs = require('fs');

const INDEX_HTML_PATH = './docs/index.html';

console.log('[POSTBUILD]: Formating index.html');
fs.readFile(INDEX_HTML_PATH, 'utf-8', (error, data) => {
    if (error) {
        console.log(error);
        return;
    }
    const result = data.replace(/="\//g, '="./');

    fs.writeFile(INDEX_HTML_PATH, result, 'utf-8', (error) => {
        console.log(error);
    });
});
