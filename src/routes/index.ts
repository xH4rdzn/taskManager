import { Router } from "express"
import { usersRoutes } from "./usersRoutes"
import { sessionsRoutes } from "./sessionsRoutes"
import { tasksRoutes } from "./tasksRoutes"
import { teamsRoutes } from "./teamsRoutes"

const routes = Router()
routes.use("/users", usersRoutes)
routes.use("/sessions", sessionsRoutes)
routes.use("/tasks", tasksRoutes)
routes.use("/teams", teamsRoutes)


export { routes }