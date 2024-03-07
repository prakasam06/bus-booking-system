const express = require('express');
const app = express();
const port = 8000;


app.get('/', (req,res) =>{
    res.send('Hello World from Express js!');
})

app.get("/test", (req,res)=>{
    res.send("Test success daaa boyyy");
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});