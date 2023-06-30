import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';


const prisma = new PrismaClient();

export class AdminController {
    async createAdmin(req: Request, res: Response) {
        const { name, email, password, isAdmin } = req.body;

        const hash = await bcrypt.hash(password, 10);

        try{
            if (!isAdmin) {
                throw new Error('Sem permição')
            }
            const newAdmin = await prisma.admin.create({
                data: {
                    name,
                    email,
                    password: hash,
                    isAdmin: false,
                }
            });

            const {password: _, ...user} = newAdmin

            res.status(201).json({ message: 'Admin criado com sucesso' });

        } catch (err) {
            res.status(500).json({ message: `Você não tem autorização para criar este usuário` })
        }
    }

    async listAdmin(req: Request, res: Response){
        const { id } = req.params;
        try{
            const admin = await prisma.admin.findUnique({
                where: {
                    id: id, 
                }
            });

            if (admin){
                res.json(admin);

            }else {
                 res.status(404).json({ message: 'Admin não encontrado' })
            }
               } catch {
            res.status(500).json({ message: 'Erro do Servidor Interno' })
        }
    }

   

    async deleteAdmin(req: Request, res: Response){
        const { id } = req.params;

        try{
            await prisma.admin.delete({
                where: {
                    id: String(id),
                }
            })
            res.status(201).json({ message: 'Usuario deletado com sucesso' })

        } catch {
            res.status(500).json({ message: 'Usuario nao encontrado' })
        }
    }
}