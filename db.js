const mysql=require('mysql');
const pool=mysql.createPool({
    host:"localhost",
    user:"root",
    password:"",
    database:"employeerecords",
});

pool.getConnection((err,connection)=>{
    if(err){
        return console.error("fails to connect the database");
    }
    else{
        console.log("databse is connected succesfully");
        connection.release();
    }
});
module.exports=pool;