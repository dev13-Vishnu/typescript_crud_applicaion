import express from "express"
import { EmployeeModel } from "../db/employee"

class EmployeeController{
    getAllEmployee = async(request:express.Request,response:express.Response)=>{
        try {
            console.log("all")
            const employees = await EmployeeModel.find();
            response.status(200).json({data:employees})
            return 
        } catch (error) {
            response.sendStatus(400)
            return 
        }
    }
    getEmployee = async(request:express.Request,response:express.Response)=>{
        try {
            console.log("one")
            const {id} = request.params;
            const employee = await EmployeeModel.findById(id);
            response.status(200).json({data:employee})
            return 
        } catch (error) {
            response.sendStatus(400)
            return 
        }
    }
    createEmployee = async(request:express.Request,response:express.Response)=>{
        try {
            console.log("create")
            const {name, email, mobile, dob, doj} = request.body;
            const employee = new EmployeeModel({
                name,
                email,
                mobile,
                dob,
                doj,

            });
            await employee.save();
            response.status(201).json({message:"Employee created", data: employee});
            return 
        } catch (error) {
            response.sendStatus(400)
            return 
        }
    }
    updateEmployee = async(request:express.Request,response:express.Response)=>{
        try {
            console.log("update")
            const {id} = request.params;
            const {name, email, mobile, dob, doj} = request.body;
            const employee = await EmployeeModel.findById(id);
            if(employee){
                employee.name =name;
                employee.email =email;
                employee.mobile =mobile;
                employee.dob =dob;
                employee.doj =doj;
            await employee.save();
            response.status(200).json({message:"Employee updated", data: employee});
            return 
            }
            response.sendStatus(400)
            return 
        } catch (error) {
            response.sendStatus(400)
            return 
        }
    }
    deleteEmployee = async(request:express.Request,response:express.Response)=>{
        try {
            console.log("delete")
            const {id} = request.params;
            await EmployeeModel.findByIdAndDelete({_id:id});
            response.status(200).json({message:"Employee deleted"});
            return 
        } catch (error) {
            response.sendStatus(400)
            return 
        }
    }

}

export default new EmployeeController();
