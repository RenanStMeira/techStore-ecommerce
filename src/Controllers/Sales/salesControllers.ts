import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient()

export class salesController{
    async historySale(req: Request, res: Response){
        const {userId} = req.params
        try {
            const all = await prisma.sales.findMany({where:{userId: userId}})
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
    
    async create(req: Request, res: Response){
        const {userId, listProduct, amount } = req.body
        try {
            const newSale = await prisma.sales.create({
                data: {
                    userId,
                    amount
                
                }
            })
    
            for(let productId of listProduct){
                await prisma.sales.update({
                    where: {id: newSale.id},
                    data: {listProduct: {connect: {id: productId}}}
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
        const {listProduct, amount} = req.body
        try {
            const Sale = await prisma.sales.findFirst({where: {id}})
            if(Sale){
                for(let productId of listProduct){
                    await prisma.sales.update({
                        where: {id:id},
                        data: {listProduct: {connect: {id: productId}},
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
            return res.json(404).json({ message: 'Erro ao excluir usuario'})
        }
    }
}