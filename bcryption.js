const bcrypt= require('bcrypt');
 const saltvalue=10;

 async function hashPassword(password){
    try{
        const hashedPassword=await bcrypt.hash(password,saltvalue);
        return hashedPassword;
    }
    catch (error) {
        throw new Error('Error comparing passwords');
    }
 }


 async function comparePassword(password,userpassword){
    console.log(password);
    console.log(userpassword);
    try{
        const match=await bcrypt.compare(password,userpassword);
        return match;
    }
    catch(err){
        console.error(err);
    }
 }
 module.exports={
    hashPassword,
    comparePassword,
 }