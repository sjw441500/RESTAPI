const url = require("url");
const fs = require("fs");
const express=  require("express");
const f = require("spiral-matrix");

var bodyParser = require('body-parser');

const port = 8080;
const app = express();


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(port,()=>{

    console.log(`Listen on port ${port}`);
})

app.get(/matrix\/[\d]+/,(req,res)=>{

    var data = req.url.split("/");
    console.log(data); 
    res.writeHead(200,{"Content-Type":'text/plain','charset':'utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});
    var dim= parseInt(data[2]);
    res.end(JSON.stringify(f(dim)));

})
app.get("/youtube.json",(req,res)=>{

    fs.readFile('Webapp\\back\\materials\\youtube.json',(err,data) =>{

        if(err)
        res.send(err);
        else
        {
            var ans = {};
            data = JSON.parse(data);

            ans.title = data.data.items[0].title;
            ans.thumbnail = data.data.items[0].thumbnail.default;

            res.send(JSON.stringify(ans));
        }
    });

    }
    )

    app.get("/api/parsetime",(req,res) =>{
        var iso = req.query.iso;
        var ans = {};
        var date = new Date(iso);
        ans.hour = date.getHours();
        ans.minute =date.getMinutes();
        ans.second = date.getSeconds();
        res.send(JSON.stringify(ans));
        
    })

    app.get("/api/unixtime",(req,res) =>{
        var iso = req.query.iso;
        var ans = {};
        var date = new Date(iso);
        ans.unixtime = date.getTime();
        res.send(JSON.stringify(ans));
        
    })

    app.post('/',(req,res) =>{
        var iso = req.query;

        Object.keys(iso).forEach(e  =>{

            iso[e] = iso[e].toUpperCase();

        })
       
        res.send(JSON.stringify(iso));
        
    });
    

    var http = (arr) =>{

       var p = new Promise((resolve,reject) =>{
            if(arr.length !== 5)
            reject(arr.toString());
            
            else{
            const request = require("request");
                console.log(arr[2]);
                console.log(arr[3]);
                console.log(arr[4]);
            
            var ans = "";
            request(arr[2],(err,res) =>{
                if(err)
                reject(err);

                ans += res;
            });
            request(arr[3],(err,res) =>{
                if(err)
                reject(err);

                ans += res;
            });

            request(arr[4],(err,res) =>{
                if(err)
                reject(err);

                ans += res;
            });
            resolve(ans);

            }

       } )

       return p;


    }

    
    const mysql = require("mysql");


    var connect = (username,pwd,dbname)=>{
    var connection = mysql.createConnection({
        host:'localhost',
        user:username,
        password:pwd,
        database:dbname
    
    }) 
    return connection;
    
    
    };

    var connection = connect("root","sjw441500","homeworkdb");

    connection.connect();

    var get_all = (table,conn) =>{
        var p = new Promise((resolve,reject) =>{
            conn.query(`select * from ${table}`,(err,rows) =>{
                if (err)
                reject(err);
                resolve(JSON.stringify(rows) );
            });
        })
     
        return p;
    
    };

    //get_all("users",connection);
app.get('/app/:table/:method',(req,res) =>{

    var table = req.params.table;
    var method  = req.params.method;
    if(method === 'getall'){
    get_all(table,connection).
    then(
        (data) => res.send(data)
        );

    }
})

app.post('/app/:table/:method',(req,res) =>{

    var table = req.params.table;
    var method  = req.params.method;
    var name = req.body.name;
    var age= req.body.age;
    var sex = req.body.sex;
    var title = req.body.title;
    var start_date=  req.body.date;

    console.log(table);

    console.log(method);
    if(method === 'insertone'){
    
        var sql = `insert into ${table}(name,age,sex,title,start_date) values('${name}','${age}','${sex}','${title}','${start_date}');`;

        connection.query(sql,(err,data,field) =>{
            if(err)
            res.send(err);
            console.log("成了");
            res.send("NB!");
        })

    }
})


    

    // http(process.argv).then((res) => console.log(res))
    // .catch((err) => console.log(err));

    // var http_callback = (arr , callback) =>{
           
    // }
    
    // var caculate  = (arr)=>{
        
    //     if(arr.length !== 5)
    //     console.log("para error");
        
    //     else{
        
    //         console.log(arr[2]);
    //         console.log(arr[3]);
    //         console.log(arr[4]);

    //     }


    // }






// const server = http.createServer((req,res) =>{
//     var data = req.url.split("/");

//     console.log(data);
//     if(data[1] === "matrix" ){
    
//         res.writeHead(200,{"Content-Type":'text/plain','charset':'utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});
//     var dim= parseInt(data[2]);
//     res.end(JSON.stringify(f(dim)));


//     }

// }).listen(port,function(){

//     console.log(`Listen on port ${port}`);
// });

// function buildHTML(){
//     var head = "";
//     var dim = 3;
//     res = f(dim);
//     var body = '<table>';

//     res.forEach(element => {
//        body += '<tr>';
//     element.forEach(e =>{
//         body += '<td>' + e + '</td>'
//     })

//     body+='</tr>';
//     });
//     body+= '</table>';

//     return '<!DOCTYPE html>'+
//     '<html><head>' +head +
//     '</head><body>' + body +
//     '</body> </html>';


// }
