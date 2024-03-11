const logger = (req, res, next) => {
    console.log('path:', req.path, 'method:', req.method, 'time:', new Date().toString());
    next();
}

module.exports = {logger};