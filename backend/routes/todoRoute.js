 const express = require("express");
 const {fetchTodos, createTodo, updateTodo, deleteTodo} = require("../controllers/todoController");
const authVerify = require("../middleware/authVerify");
const todoRouter = express.Router();


todoRouter.get("/",authVerify, fetchTodos);

todoRouter.post("/create", authVerify, createTodo);

todoRouter.put("/update/:id", authVerify, updateTodo);

todoRouter.delete("/delete/:id", authVerify, deleteTodo);


module.exports=todoRouter;