const devcert = require('devcert');
const fs = require('fs');

if (!fs.existsSync('./certs')) {
  fs.mkdirSync('./certs');
}

const domains = ['joinpickup.dev'];

devcert
  .certificateFor(domains, { getCaPath: true })
  .then(({ key, cert, caPath }) => {
    fs.writeFileSync('./certs/joinpickup-dev.key', key);
    fs.writeFileSync('./certs/joinpickup-dev.cert', cert);
    fs.writeFileSync('./certs/.capath', caPath);
  })
  .catch(console.error);

