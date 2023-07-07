import { Request, Response, response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ProductController {
  async create(req: Request, res: Response) {
    const { name, price,brand, model, description, image } = req.body;

    try {
      const createdProduct = await prisma.product.create({
        data: {
          name,
          price,
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

  async findAll(req: Request, res: Response) {
    const { id } = req.params;
  
    try {
      const product = await prisma.product.findMany({
        where: {
          id: id,
        },
      });
  
      if (product) {
        return res.json(product);
      } else {
        return res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Error finding product" });
    }
  }
  
  async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await prisma.product.delete({
        where: {
          id: id
        },
      });

      return res.status(200).json({ message: "Usuario excluido com sucesso "});
    } catch (err) {
      return res.json(400).json({ message: 'Erro ao excluir usuario', err });
    }
  }

}
