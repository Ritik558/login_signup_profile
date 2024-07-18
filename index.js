const express=require('express');
const bodyParser=require('body-parser');
const app=express();
app.use(bodyParser.json());
const employeeRouter=require('./Router/employeeRouter');

app.use('/',employeeRouter);



app.listen(3005,()=>{
    console.log("server is Connected At 3000 port");
});