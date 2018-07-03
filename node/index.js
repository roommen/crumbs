// Upload Process (Split the file)
const addon = require('./node_modules/upload');
var result = addon.uploadFile("/mnt/f/crumbs/samples/microservices-on-aws.pdf");
console.log(result);

// Download Process (Join the file)
const addon = require('./node_modules/download');
var result = addon.downloadFile("/mnt/f/crumbs/samples/microservices-on-aws.pdf");
console.log(result);
