import { Router } from "express"
import { TasksController } from "@/controllers/tasksController"

const tasksRoutes = Router()
const tasksController = new TasksController()


tasksRoutes.post("/", tasksController.create)
tasksRoutes.get("/:id", tasksController.show)
tasksRoutes.patch("/:id", tasksController.update)
tasksRoutes.delete("/:id", tasksController.remove)


export { tasksRoutes }