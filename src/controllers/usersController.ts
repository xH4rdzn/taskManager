import { Request, Response } from "express"
import { prisma } from "@/database/prisma"
import { z } from "zod"
import { hash } from "bcrypt"
import { AppError } from "@/utils/AppError"


export class UsersController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z.string().trim().min(1),
      email: z.string().email(),
      password: z.string().min(6)
    })

    const { name, email, password } = bodySchema.parse(request.body)

    const userWithSameEmail = await prisma.users.findFirst({
      where: {
        email
      }
    })

    if(userWithSameEmail) {
      throw new AppError("Já existe um usuário cadastrado com esse email")
    }

    const hashedPassword = await hash(password, 8)

    const user = await prisma.users.create({
      data: {
        name,
        email,
        password: hashedPassword,
      }
    })

    const { password: _, role, ...userWithoutPasswordAndRole} = user

    return response.status(201).json(userWithoutPasswordAndRole)
  }
}