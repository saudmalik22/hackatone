const Todos  = require("../models/todoModel");
const {response} = require("express");

const fetchTodos = async(req,res)=>{
    try{
        const todos = await Todos.find();
        res.json({
            data:todos,
            status:"success",

        })
    }catch (error) {
      res.json({
          data:[],
          status:"error",
          error:error,
      })
    }
}


const createTodo= async(req,res)=>{
    try{
        let newTodo= new Todos({
            id:req.body?.id,
            title: req.body?.title,
            description: req.body?.description
        })

        const addTodo = await newTodo.save();
        res.json(
            {
                data:addTodo,
                status:"success",
            }
        )
    }catch (error) {
       res.json(
           {
               data:[],
               status:"error",
               error:"error"
           }
       )
    }
}




const updateTodo = async (req,res)=>{
    try{
        let updateId= req.params?.id;
        let updateData=req.body;
        let updateTodo= await Todos.updateOne({id:updateId}, updateData);
        res.json({
            data:updateTodo,
            status:"success"
        })

    }catch (error){
        res.json({
            data:[],
            status:"error",
            error:error
        })
    }
}

const deleteTodo = async (req,res)=>{
    try{
        const deleteId =  req.params.id;
        const deleteTodo = await  Todos.deleteOne({id:deleteId});
        res.json({
            data:deleteTodo,
            status:"success",

        })
    }catch (error) {
        res.json({
            data:[],
            status:"error",
            error:error

        })
    }
}

module.exports={
    fetchTodos,
    createTodo,
    updateTodo,
    deleteTodo
}