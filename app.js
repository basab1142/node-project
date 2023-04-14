const express = require('express');
const { json } = require('stream/consumers');

const app = express();

const port = process.env.PORT|| 3004;
const mysql = require('./connection').con;

// configuration
app.set("view engine", "hbs");
app.use(express.static(__dirname + "/public"));
// app.use(express.urlencoded());
// app.use(express.json());

// routing
app.get('/',(req,res)=>{
    res.render("index");
});
app.get('/add',(req,res)=>{
    res.render("add");
});
app.get('/update',(req,res)=>{
    res.render("update");
});
app.get('/delete',(req,res)=>{
    res.render("delete");
});

app.get('/search',(req,res)=>{
    res.render("search");
});

app.get('/view',(req,res)=>{
    let qry = "SELECT * FROM test";

    mysql.query(qry,(err,results)=>{
        if(err){
            throw err;
        }
        else{
            if(results.length > 0){
                res.render("view",{data: results});
            }
            else{
                res.render("view");
            }
        }
    })
});

app.get('/addstudent',(req,res)=>{
//    fetching data from form
//    res.send(req.query);
const {pid, name, phone, email,problem,gender} = req.query

//    sanitization
   let qry = "SELECT * FROM test where emailid	 = ? or phoneno = ?;";
   mysql.query(qry,[email,phone],(err,result)=>{
       if(err){
        throw err;
       }
       else{
         if(result.length > 0){
            res.render("add",{checkmesg:true});
         }
         else{
            // insert the query
            let qry2 = "INSERT INTO test VALUES(?,?,?,?,?,?);";
            mysql.query(qry2,[pid, name, phone, email,problem,gender],(err,results)=>{
                if(results.affectedRows > 0){
                    res.render("add",{mesg:true});
                }
            });

         }
       }
   })
});

app.get("/searchstudent", (req, res) => {
    // fetch data from the form


    const {phone} = req.query;
    console.log(phone);
    let qry = "select * from test where phoneno=?";
    mysql.query(qry, [phone], (err, results) => {
        if (err) throw err
        else {
            if (results.length > 0) {
                res.render("search", { mesg1: true, mesg2: false, data:results })
            } else {

                res.render("search", { mesg1: false, mesg2: true })

            }

        }
    });
})
app.get("/updatesearch", (req, res) => {

    const { phone } = req.query;

    let qry = "select * from test where phoneno=?";
    mysql.query(qry, [phone], (err, results) => {
        if (err) throw err
        else {
            if (results.length > 0) {
                res.render("update", { mesg1: true, mesg2: false, data: results })
            } else {

                res.render("update", { mesg1: false, mesg2: true })

            }

        }
    });
})

app.get('/updatestudent',(req,res)=>{
    // fetch data
    const {phone,name,gender,problem} = req.query;
    let qry = "UPDATE test set username = ? , gender = ? where phoneno = ?";
    mysql.query(qry,[name,gender,phone,problem], (err,results)=>{
        if(err) {
            throw err;
        }
        else{
            if(results.affectedRows > 0){
                res.render("update",{umesg : true})
            }
            else{
                res.render("update",{umesg : false})
            }
        }
    }) 
})


app.get('/removestudent',(req,res)=>{
    // fetching data
    const {phone,name,gender} = req.query;
    let qry = "DELETE FROM test where phoneno = ?";
    mysql.query(qry,[phone],(err,results)=>{
        if(err){
            throw err;
        }
        else{
            if(results.affectedRows > 0){
                res.render("delete",{mesg1 : true,mes2:false});
            }
            else{
                res.render("delete",{mesg2 : true,mes1:false});
            }
        }
    })
})
app.get('/view',(req,res)=>{
    
})
// creating server
app.listen(port,(err)=>{
    if (err) {
        throw err;
    }
    console.log("Server is running %d",port);
})