// Upload Process (Split the file)
const addon = require('./node_modules/upload');
var json = "{\"accounts\": [\"ac1\",\"ac2\",\"ac3\"]}";
// var json = "{\"accounts\": \"ac1\"}";
var result = addon.uploadFile("999", "microservices-on-aws.pdf", json);
console.log(result);

// Download Process (Join the file)
// const addon = require('./node_modules/download');
// var result = addon.downloadFile("/mnt/f/crumbs/samples/microservices-on-aws.pdf");
// console.log(result);
