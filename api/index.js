require('dotenv').config();
const { openDb } = require ('./ConfigDB.js');
const express = require ("express");
const cors = require ('cors');
const porta = process.env.PORT || 8080;
 
openDb();

const app= express()

app.use(express.json())
app.use(cors())

const userRoutes = require ('./routes/users.js');
const taskRoutes = require('./routes/tasks.js');

app.use("/usuarios", userRoutes);
app.use("/tarefas", taskRoutes);


app.listen(porta, ()=>{console.log(`servidor rodando na porta: ${porta}`)})