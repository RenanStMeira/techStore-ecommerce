import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';


const prisma = new PrismaClient();

export class UserController {
    async createUser(req: Request, res: Response){
        const { name, email, password } = req.body;

        const hash = await bcrypt.hash(password, 10);

        try {
          const newUser = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hash,
                },
            });

            const {password: _, ...user} = newUser;

            res.status(201).json({ message: 'Usuario criado com sucesso', user });

        } catch (err) {
            res.status(500).json({ message: 'Erro ao criar usuario' });
        }
     };

     async listUsers(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const users = await prisma.user.findUnique({
                where: {
                    id: id,
                }
            });

            if (users){
                res.json(users);

            }else {
                 res.status(404).json({ message: 'Usuario não encontrado' })
            }
               } catch {
            res.status(500).json({ message: 'Erro do Servidor Interno' })
        }
     };

     async deleteUser(req: Request, res: Response){
        const { id } = req.params;

        try {
            await prisma.user.delete({
                where: {
                    id: String(id),
                }
            });

            res.status(200).json({ message: 'User deleted succesfully' });
        } catch (err) {
            res.status(500).json({ message: 'Error deleting user' })
        }
     }
};