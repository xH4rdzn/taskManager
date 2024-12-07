import { AppError } from "@/utils/AppError"
import { Request, Response } from "express"
import { authConfig } from "@/configs/auth"
import { prisma } from "@/database/prisma"
import { sign } from "jsonwebtoken"
import { compare } from "bcrypt"
import { z } from "zod"

export class SessionsController {
  async create(request: Request, response: Response) {
    
    const bodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(6)
    })

    const { email, password } = bodySchema.parse(request.body)
    
    const user = await prisma.users.findFirst({
      where: {
        email
      }
    })

    if(!user) {
      throw new AppError("E-mail ou senha inválidos", 401)
    }

    const passwordMatched = await compare(password, user.password)

    if(!passwordMatched) {
      throw new AppError("E-mail ou senha inválidos", 401)
    }

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({role: user.role ?? "member"}, secret, {
      subject: user.id,
      expiresIn
    })

    const { password: hashedPassword, ...userWithoutPassword} = user
    
    return response.json({ token, user: userWithoutPassword })
  }
}