import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ProductController {
  async create(req: Request, res: Response) {
    const { name, brand, model, description, image } = req.body;

    try {
      const createdProduct = await prisma.product.create({
        data: {
          name,
          brand,
          model,
          description,
          image,
        },
      });

     return res.status(201).json({ message: "Produto cadastrado com sucesso", product: createdProduct });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Erro ao cadastrar produto" });
    }
  }
  upload(req: Request, res: Response) {
    return res.json({ message: 'Imagem cadastrada com sucesso' })
  }
}
