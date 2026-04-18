const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'node_modules', 'http-deceiver', 'lib', 'deceiver.js');

if (fs.existsSync(targetPath)) {
  let content = fs.readFileSync(targetPath, 'utf8');
  
  if (!content.includes('try { HTTPParser = process.binding')) {
    content = content.replace(
      /HTTPParser = process\.binding\('http_parser'\)\.HTTPParser;/g,
      `try {
    HTTPParser = process.binding('http_parser').HTTPParser;
  } catch (e) {
    HTTPParser = { methods: [], kOnHeaders: 0, kOnHeadersComplete: 0, kOnMessageComplete: 0, kOnBody: 0 };
  }`
    );

    content = content.replace(
      /methods = process\.binding\('http_parser'\)\.methods;/g,
      `try {
    methods = process.binding('http_parser').methods;
  } catch (e) {
    methods = [];
  }`
    );

    fs.writeFileSync(targetPath, content, 'utf8');
    console.log('Successfully patched http-deceiver for Node 20+ compatibility.');
  } else {
    console.log('http-deceiver is already patched.');
  }
} else {
  console.log('http-deceiver not found, skipping patch.');
}
