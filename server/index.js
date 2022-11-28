const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const mysql = require('mysql')

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "sopummtah1993M!",
    database: "cruddatabase",
});

app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}));

// app.get('/api/get', (req, res)=> {
//     const sqlSelect = 'SELECT * FROM list_companies';
//     db.query(sqlSelect, (err, result) => {
//         res.send(result);
//     })

// })

app.get('/', function (req, res) {
    const sqlSelect = 'SELECT * FROM list_companies';
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    })
  });

app.get("/api/get", (req,res) => {
    const sqlSelect = 'SELECT * FROM list_companies';
    db.query(sqlSelect, (err, result) => {
        res.send(result);
})
});

app.post('/api/insert', (req,res) => {
    const companyName = req.body.companyName
    const date = req.body.date
    const sqlInsert = "INSERT INTO list_companies (company_name, date_applied) VALUES (?,?)"
    db.query(sqlInsert, [companyName, date], (err,result) => {
        console.log(result)
        res.send(result);
    })
})

app.delete('/api/delete/:companyName', (req,res) => {
    const name = req.params.companyName
    const sqlDelete = "DELETE FROM list_companies WHERE company_name = ?";
    db.query(sqlDelete, name, (err,result) => {
        if (err) console.log(err)
    })
})

app.get('/api/get/:id', (req,res) => {
    const { id } = req.params;
    const sqlGet = "SELECT * FROM list_companies WHERE id = ?"
    db.query(sqlGet, id , (err,result) => {
        if (err) {
            console.log(err)
        }
        res.send(result);
    })
})


app.put('/api/update', (req,res) => {
    const companyName = req.body.companyName
    const date = req.body.date
    const sqlUpdate = "UPDATE list_companies SET date_applied = ? WHERE company_name = ?";
    db.query(sqlUpdate, [date, companyName], (err,result) => {
        if (err) console.log(err)
    })
})

app.get('/api/get/:id', (req,res) => {
    const { id } = req.params;
    const sqlGet = "SELECT * FROM list_companies WHERE id = ?"
    db.query(sqlGet, id , (err,result) => {
        if (err) {
            console.log(err)
        }
        res.send(result);
    })
})

app.put('/api/updateName', (req,res) => {
    const companyName = req.body.companyName
    const date = req.body.date
    const sqlUpdate = "UPDATE list_companies SET company_name = ? WHERE date_applied = ?";
    db.query(sqlUpdate, [companyName, date], (err,result) => {
        if (err) console.log(err)
    })
})

// db.query(`select * FROM cruddatabase.list_companies`, (err, res) => {
//     return console.log(res)
// })

app.listen(3001, () =>{
    console.log("running on port 3001")
});