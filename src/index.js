const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080 || process.env.PORT
const { data } = require('./data');
const {connection}=require("./connector")


// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.get("/totalRecovered", (req,res)=>{
    let total=0
    for(let i=0;i<data.length;i++ ){
        total+=data[i].recovered
    }
     res.json({
        data:{_id:"total", recovered:total}
     }) 
})

app.get("/totalActive",(req,res)=>{
    let totalrecovered=0
    let totalinfected=0
    for(let i=0;i<data.length;i++){
        totalinfected+=data[i].infected
        totalrecovered+=data[i].recovered
    }
    let Activecases=(totalinfected-totalrecovered)
    res.json({
        data:{_id:"total", active:Activecases}
    })
})

app.get("/totalDeath", (req,res)=>{
    let total=0
    for(let i=0;i<data.length;i++ ){
        total+=data[i].death
    }
     res.json({
        data:{_id:"total", death:total}
     }) 
})




app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;