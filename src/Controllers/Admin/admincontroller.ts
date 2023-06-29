import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export class AdminController {
    async createAdmin(req: Request, res: Response) {
        const { name, email, password, isAdmin } = req.body;

        try{
            if (!isAdmin) {
                throw new Error('Sem permição')
            }
            await prisma.admin.create({
                data: {
                    name,
                    email,
                    password,
                    isAdmin: false,
                }
            })

            res.status(201).json({ message: 'Admin criado com sucesso' });

        } catch (err) {
            res.status(500).json({ message: `Você não tem autorização para criar este usuário` })
        }
    }

    async listAdmin(req: Request, res: Response) {
        try {
            const admin = prisma.admin.findMany();

        } catch {

        }
    }
}