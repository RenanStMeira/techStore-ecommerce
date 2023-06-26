import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class UserController {
    async createUser(req: Request, res: Response){
        const { name, email, password } = req.body;

        try {
            prisma.users.createUser({
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
    }
};