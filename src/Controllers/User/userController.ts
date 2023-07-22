import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';


const prisma = new PrismaClient();
export class UserController {
    async createUser(req: Request, res: Response){
        const { name, email, contato, Adress, road, Zipcode, password } = req.body;

        // Criptografando a senha
        const hash = await bcrypt.hash(password, 10);

        try {
          const newUser = await prisma.user.create({
                data: {
                    name,
                    email,
                    contato,
                    Adress,
                    road,
                    Zipcode,
                    password: hash,
                },
            });

            const {password: _, ...user} = newUser;

            res.status(201).json({ message: 'Usuario criado com sucesso', user });

        } catch (err) {
            res.status(400).json({ message: 'Erro ao criar usuario' });
        }
     };


     async listUsers(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const users = await prisma.user.findMany({
                where: {
                    id: id,
                }
            });

            if (users){
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

     async updateUser(req: Request, res: Response){
        const { id } = req.params;
        const { name, email, password, contato, Adress, road, Zipcode } = req.body;

        try{
             const newUserUpdate = await prisma.user.update({
            where: { id },
            data: {
                name: name,
                email: email,
                password: password,
                contato: contato,
                Adress: Adress,
                Zipcode: Zipcode,
                road: road
            },
        });
        return res.status(200).json({ message: 'Ussuario atualizado com sucesso'});

        } catch (err) { 
        return res.status(400).json({ err: 'Erro ao atualizar usuario' });
        }
     }
};