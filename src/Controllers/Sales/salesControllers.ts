import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient()

export class SalesController{
    async historySale(req: Request, res: Response){
        const {userId} = req.params
        try {
            const all = await prisma.sales.findMany({where:{user_id: userId}})
            if(all){
               return res.status(201).json(all)
            } else{
                return res.status(404).json({ message: "Id inválido" })
            }
            
        } catch (error) {
            console.log(error)
            res.status(404).json({message: 'Internal error'})
        }
    }

    async findOne(req: Request, res: Response){
        const {id} = req.body
        try {
            const one = await prisma.sales.findFirst({where:{id}})
            if(one){
               return res.status(200).json(one)
            } else {
                return res.status(404).json({ message: "Id inválido" })
            }
            

        } catch (error) {
            console.log(error)
            res.status(404).json({message: 'Internal error'})
        }
    }

    async findAll(req: Request, res: Response){
        try {
            const all = prisma.sales.findMany()
            return res.status(200).json(all)
        } catch (error) {
            console.log(error)
            res.status(404).json({message: 'Internal error'})
        }
    }
    
    async create(req: Request, res: Response){
        const {user_id, product_id, amount } = req.body
        try {
            const newSale = await prisma.sales.create({
                data: {
                    user_id,
                    product_id: product_id,
                    amount: parseFloat(amount),
                
                }
            })
    
            for(let productId of product_id){
                await prisma.sales.update({
                    where: {id: newSale.id},
                    data: {product_id: {connect: {id: productId}}}
                })
            }

            return res.status(201).json({ message: "Sale cadastrada com sucesso" })
    
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: "Erro ao cadastrar sale" })
        }

    }

    async updateSale(req: Request, res: Response){
        const {id} = req.params
        const {product_id, amount} = req.body
        try {
            const Sale = await prisma.sales.findFirst({where: {id}})
            if(Sale){
                for(let productId of product_id){
                    await prisma.sales.update({
                        where: {id:id},
                        data: {product_id: {connect: {id: productId}},
                        amount
                    }
                    })
                }
                return res.status(201).json({ message: "Sale atualizada com sucesso" })
            } else {
                return res.status(404).json({ message: "Id inválido" })
            }

            
        } catch (error) {
            console.log(error)
            res.status(404).json({ message: "Erro ao atualizar sale" })
        }
    }

    async deleteSale(req: Request, res: Response){
        const {id} = req.params
        try {
            const Sale = await prisma.sales.findFirst({where: {id}}) 
            if(Sale){
                await prisma.sales.delete({where:{id}})
                return res.status(200).json({ message: "Sale excluida com sucesso "})
            } else{
                return res.status(404).json({ message: "Id inválido" })
            }
        } catch (error) {
            console.log(error)
            return res.json(404).json({ message: 'Erro ao excluir usuario!'})
        }
    }
}