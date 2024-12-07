import { AppError } from "@/utils/AppError"
import { Request, Response, NextFunction} from "express"

export function verifyUserAuthorization(role: string[]) {
  return (request: Request, response: Response, next: NextFunction) => {
    
    if(!request.user) {
      throw new AppError("Não autorizado", 401)
    }

    if(!role.includes(request.user.role)){
      throw new AppError("Não autorizado", 401)
    }

    return next()
  }
}