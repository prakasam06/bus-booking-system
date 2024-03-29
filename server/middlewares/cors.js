var allowlist = ['http://localhost:8000'];
var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    var requestOrigin = req.header('Origin');
    console.log("Request origin:", requestOrigin)
    if (allowlist.indexOf(req.header('Origin')) !== -1 || !(req.header('Origin'))) {
      corsOptions = { origin: true } 
    } else {
      corsOptions = { origin: false }
      callback(new Error('not allowed by cors')) 
    }
    callback(null, corsOptions) 
  }

module.exports = {corsOptionsDelegate};