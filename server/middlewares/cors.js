var allowlist = ['http://localhost', 'https://booking-system-client-ten.vercel.app','https://gleaming-gaufre-d09e24.netlify.app/login'];
var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    var requestOrigin = req.header('Origin');
    console.log("Request origin:", requestOrigin)
    if (allowlist.indexOf(req.header('Origin')) !== -1 || !(req.header('Origin'))) {
      corsOptions = { origin: true, credentials: true }
    } else {
      corsOptions = { origin: false }
      callback(new Error('not allowed by cors')) 
    }
    callback(null, corsOptions) 
  }

module.exports = {corsOptionsDelegate};