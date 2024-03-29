const path = require('path');

const notFound = (req, res, next) => {
    res.status(404);
    console.log("not found");
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, '..', 'views' , '404.html'));
    }else if(req.accepts('json')){
        res.status(404).send({error: '404 Not found'});
    }else{
        res.status(404).type('txt').send('404 Not found');
    }
}

module.exports = {notFound};