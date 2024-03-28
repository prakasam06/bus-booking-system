// res.redirect(301 '/home') 302 is sent by default by express

// app.get('^/$|index(.html)?|home',(req,res)=>{
//     //  res.send('Hello World');
//     res.sendFile(path.join(__dirname, 'views' , 'index.html'));
// })

// app.get('^/page$|newpage(.html)?|new',(req,res)=>{
//     //  res.send('Hello World');
//     res.sendFile(path.join(__dirname, 'views' , 'page2.html'));
// })


// app.get('/hello',(req,res,next)=>{
//     console.log('trying')
//     next();
// },(req,res)=>{
//     res.send('Hello World prakasam');
// })

// const one = (req,res,next)=>{
//     console.log('one');
//     next();
// }

// const two = (req,res,next)=>{
//     console.log('two');
//     next();
// }

// const three = (req,res,next)=>{
//     console.log('three');
//     res.send('Hello World prakasam its three');
// }

// app.get('/hello2',[one,two,three]);


// app.get('/*',(req,res)=>{
//     res.status(404).sendFile(path.join(__dirname, 'views' , '404.html'));
// })

// pagesRouter.get('^/$|page(.html)?|newpage(.html)?|new',(req,res)=>{
//     res.sendFile(path.join(__dirname, '..', 'views', 'page2.html'));
// })

// pagesRouter.get('/hello/:id',(req,res,next)=>{
//     console.log('trying')
//     next();
// },(req,res)=>{
//     res.send(req.params.id);
// })