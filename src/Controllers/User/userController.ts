import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';


const prisma = new PrismaClient();
export class UserController {
    async createUser(req: Request, res: Response){
        const { name, email, password } = req.body;

        // Criptografando a senha
        const hash = await bcrypt.hash(password, 10);

        try {
          // Criando um novo usuário no banco de dados
          const newUser = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hash,
                },
            });

            // Omitindo a senha do objeto de usuário
            const {password: _, ...user} = newUser;

            res.status(201).json({ message: 'Usuario criado com sucesso', user });

        } catch (err) {
            res.status(400).json({ message: 'Erro ao criar usuario' });
        }
     };


     async listUsers(req: Request, res: Response) {
        const { id } = req.params;

        try {
            // Buscando o usuário pelo ID no banco de dados
            const users = await prisma.user.findUnique({
                where: {
                    id: id,
                }
            });

            if (users){
                // Retornando o usuário encontrado
               return res.json(users);

            }else {
               return res.status(404).json({ message: 'Usuario não encontrado' })
            }
               } catch {
            res.status(400).json({ message: 'Erro no Servidor Interno' })
        }
     };

     async deleteUser(req: Request, res: Response){
        const { id } = req.params;

        try {
            // Deletando o usuário pelo ID no banco de dados
            await prisma.user.delete({
                where: {
                    id: String(id),
                }
            });

           return res.status(200).json({ message: 'Usuario deletado com sucesso ' });
        } catch (err) {
            return res.status(400).json({ message: 'Erro ao deletar usuario' })
        }
     }
};