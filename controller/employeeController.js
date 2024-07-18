const pool = require('../db');
const bcryptAlog = require('../bcryption');
require('dotenv').config();
const  jwt = require('jsonwebtoken');
const generateToken=(Name)=>{
    return jwt.sign({Name},process.env.JWT_SECRET,{expiresIn:"56m"});
}

const Signup = async (req, res) => {
    try {
        const data = req.body;
        const hashedpassword = await bcryptAlog.hashPassword(data.Password);
        pool.query("insert into employeedetail values(?,?,?,?,?)" ,[data.Name,data.Company,data.Phone_no,data.Address,hashedpassword], (err, result) => {
            if(err){
                console.error("error in Insert data",err);
                res.status(401).json({Error:"error in insert data"});
                return ;
            }
            console.log(result);
            // res.status(201).json("User is signup Successfully");
            const token=generateToken(result.Name);
            console.log("token",token);
            res.status(201).json({data:result,Token:token,mess:"user is successfully enter"});

        })
    }
    catch (err) {
        console.error("internal server error", err);
        res.status(404).json({ message: "internal server error", Error: err });
    }
}
// const Login=async(req,res)=>{
//     try{
//         const data=req.body;
        
//         pool.query("select Name,Password from employeedetail where Name=? limit 1",[data.Name],(err,result)=>{
//             if(err){
//                 console.error("error in",err);
//                 res.status(401).json({Error:"error in data"});
//                 return ;
//             }
            
//             if(result.length>0){
//                 // console.log(data.Password);
//                 console.log(result);
//                 console.log(result.Password);
//                 const val= bcryptAlog.comparePassword(data.Password,result.Password);
//                 if(val){
//                    const token=  generateToken(data.Name);
//                    console.log(token);
//                    res.status(201).json({Token:token});
//                 }
//                 else{
//                     console.log("username and password is not valid");
//                     res.status(404).json("username and password is not valid")
//                 }
//             }
//             else{
//                 console.log('user is not found....');
//                 res.status(403).json("user is not found...");
//             }

//         })
//     }
//     catch(err){
//         console.error("internal server error",err);
//         res.status(401).json("internal server error");

//     }
// }

const Login = async (req, res) => {
    try {
        const data = req.body;

        pool.query("SELECT Name, Password FROM employeedetail WHERE Name = ? LIMIT 1", [data.Name], async (err, result) => {
            if (err) {
                console.error("Error in query:", err);
                return res.status(401).json({ Error: "Error in data" });
            }

            if (result.length > 0) {
                const user = result[0]; // Access the first (and only) row
                console.log("User:", user);
                
                
                const passwordMatch = await bcryptAlog.comparePassword(data.Password, user.Password);
                
                if (passwordMatch) {
                    
                    const token = generateToken(user.Name); 
                    console.log("Generated token:", token);
                    res.status(201).json({ Token: token });
                } else {
                    console.log("Username and password are not valid");
                    res.status(404).json("Username and password are not valid");
                }
            } else {
                console.log('User not found');
                res.status(403).json("User not found");
            }
        });
    } catch (err) {
        console.error("Internal server error", err);
        res.status(500).json("Internal server error");
    }
};
const Profile=async(req,res)=>{
    try{
        const data=req.user;
        console.log(data.Name);
        res.status(401).json(data);

    }
    catch(err){
    res.status(401).json("internal server error");
    }
}

module.exports={
    Signup,
    Login,
    Profile
}