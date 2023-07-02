import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient()

export class cartController{

    async listCarts(req: Request, res: Response){
        try {
            const carts = await prisma.cart.findMany()
            res.status(200).json(carts)
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Erro no Servidor Interno' })
        }
    }

    async cartHistory(req: Request, res: Response){
        const {email, password} = req.body
        try {
            const usuario = await prisma.user.findFirst({where:{email, password}})
            if(!usuario){
                res.json('Email e/ou senha incorretos')
            } else{
                const userId = usuario.id
                const historico = await prisma.cart.findMany({where: {userId:userId }})
                res.status(200).json('Histórico de vendas: ')
                res.status(200).json(historico)
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Erro ao tentar buscar o histórico de vendas do usuário'})
        }
    }
    async createCart(req: Request, res: Response){
        const {userId} = req.body
        try {
            const cart = await prisma.cart.create({
                data: {
                    userId
                }
            })
            if(!cart){
                res.json('Você cometeu algum erro ao tentar criar um novo cart')
            } else{
                res.status(200).json('Novo carrinho registrado')
                res.status(200).json(cart)
            }
            
            
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Erro ao criar carrinho' });
            res.status(500).json({ message: 'Erro ao deletar usuario' })
        }

    }

    async deleteCart(req: Request, res: Response){
        const {id} = req.params
        try {
            await prisma.user.delete({where:{id: id}})
            res.status(200).json('Carrinho excluído com sucesso!')
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Erro ao deletar o carrinho' })
        }
    }



    
}