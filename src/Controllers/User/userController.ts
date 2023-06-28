import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class UserController {
    async createUser(req: Request, res: Response){
        const { name, email, password } = req.body;

        try {
           await prisma.user.create({
                data: {
                    name,
                    email,
                    password
                },
            });

            res.status(201).json({ message: 'User created successfully' });

        } catch (err) {
            res.status(500).json({ message: 'Error creating user' });
        }
     };

     async listUsers(req: Request, res: Response) {
        try {
            const users = await prisma.user.findMany();

            res.status(200).json(users);
        } catch (err) {
            res.status(500).json({ Message: 'Error retrieving users' });
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