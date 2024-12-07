import { TeamsController } from "@/controllers/teamsController"
import { ensureAuthenticated } from "@/middlewares/ensureAuthenticated"
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization"
import { Router } from "express"



const teamsRoutes = Router()
const teamsController = new TeamsController()

teamsRoutes.use(ensureAuthenticated, verifyUserAuthorization(["admin"]))
teamsRoutes.post("/", teamsController.create)

export { teamsRoutes }