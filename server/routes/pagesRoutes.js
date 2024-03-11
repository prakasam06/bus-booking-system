const express = require('express');
const path = require('path');
const pagesRouter = express.Router();


pagesRouter.get('^/$|page(.html)?|newpage(.html)?|new',(req,res)=>{
    res.sendFile(path.join(__dirname, '..', 'views', 'page2.html'));
})

pagesRouter.get('/hello/:id',(req,res,next)=>{
    console.log('trying')
    next();
},(req,res)=>{
    res.send(req.params.id);
})

module.exports = {pagesRouter};