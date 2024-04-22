var allowlist = ['http://localhost', 'https://booking-system-client-ten.vercel.app', 'https://gleaming-gaufre-d09e24.netlify.app'];
var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    var requestOrigin = req.header('Origin');
    console.log("Request origin:", requestOrigin);
    if (allowlist.includes(requestOrigin) || !requestOrigin) {
        corsOptions = { origin: true, credentials: true };
        callback(null, corsOptions);
    } else {
        corsOptions = { origin: false };
        return callback(new Error('Not allowed by CORS')); 
    }
};

module.exports = { corsOptionsDelegate };
