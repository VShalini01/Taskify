const express=require('express');
const cors=require('cors');
const bodyParser= require('body-parser');
const connection = require('./db');

const app=express();

app.use(cors());
app.use(bodyParser.json());

app.get('/tasks',(req,res)=> {
    const TASK_QUERY = `select * from todotaskmanager.tasks;`
    connection.query(TASK_QUERY, (err,response)=> {
        if(err) console.log(err)
        else res.send(response)
    })
})

app.post('/addTask',(req,res)=>{
    const ADD_QUERY = `insert into todotaskmanager.tasks (task) values ('${req.body.task}');`
    connection.query(ADD_QUERY, (err)=> {
        if(err) {
            console.log(err);
            res.status(500).send("Error adding task");
        } else {
            console.log("Task added");
            res.status(200).send("Task added"); // Respond with success message
        }
    });
});


app.delete('/deleteTask/:taskid',(req,res)=>{
    console.group(req.params.taskid)
    const DELETE_QUERY = `delete from todotaskmanager.tasks where (taskid='${req.params.taskid}')`
    connection.query(DELETE_QUERY, (err,response)=> {
        if(err) console.log(err)
        // else res.send("task deleted")
    })
})

app.listen(4000, ()=>{
    console.log("Running on port 4000")
})