const express=require('express');
const router=express.Router();
const employeeController=require('../controller/employeeController');
const validater=require('../middleware');


// router.post('/',validater,employeeController.Signup);
router.post('/Signup', validater.validateFields, employeeController.Signup);
router.post('/Login',employeeController.Login);
router.get('/Profile',validater.authenticateToken,employeeController.Profile);
module.exports=router;