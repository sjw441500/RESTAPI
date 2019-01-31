const express = require('express');
const router = require('./router');
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());

const port= 8888;

app.use('/api',router);

app.listen(port,() =>{
    console.log(`listen on port ${port}`);
});

