import { Response, Request } from "express"
import { ITodo } from "./../../types/todo"
import Todo from "../../models/todo"
import { Document, ModifyResult, ObjectId } from "mongoose"

const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const todos: ITodo[] = await Todo.find()
    res.status(200).json({ todos })
  } catch (error) {
    throw error
  }
}

const addTodo = async (req: Request, res: Response): Promise<void> => {
    try {
      const body = req.body as Pick<ITodo, "name" | "description" | "status">
  
      const todo: ITodo = new Todo({
        name: body.name,
        description: body.description,
        status: body.status,
      })
  
      const newTodo: ITodo = await todo.save()
      const allTodos: ITodo[] = await Todo.find()
  
      res
        .status(201)
        .json({ message: "Todo added", todo: newTodo, todos: allTodos })
    } catch (error) {
      throw error
    }
  }

  const updateTodo = async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        params: { id },
        body,
      } = req
      const updateTodo: ITodo | null = await Todo.findByIdAndUpdate(
        { _id: id },
        body
      )
      const allTodos: ITodo[] = await Todo.find()
      res.status(200).json({
        message: "Todo updated",
        todo: updateTodo,
        todos: allTodos,
      })
    } catch (error) {
      throw error
    }
  }

  const deleteTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedTodo: ModifyResult<Document<unknown, {}, ITodo> & ITodo & { _id: ObjectId; }> = await Todo.findByIdAndDelete(
        req.params.id
      )
      if (deletedTodo && deletedTodo.value){
        const allTodos: ITodo[] = await Todo.find()
        res.status(200).json({
            message: "Todo deleted",
            todo: deletedTodo,
            todos: allTodos,
      })
    } else {
        res.status(404).json({ message: "Todo not found" });
    }
    } catch (error) {
      throw error
    }
  }
  
  export { getTodos, addTodo, updateTodo, deleteTodo }
