import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import  Jwt from "jsonwebtoken";
import { generateToken } from "../../Utils/jwtUtils";
import { prisma } from "../../Service/Prisma/prismaService";

export class LoginAdmincontroller {
    async loginAdmin(req: Request, res: Response) {
    const { email, password } = req.body;
  
    try {
      // Busca o admin com email fornecido
      const admins = await prisma.admin.findMany({
        where: { email: { equals: email } },
        select: { id: true, name: true, email: true, password: true, isAdmin: true },
      });
  
      // Verificando se o admin foi encontrado
      if (!admins || admins.length === 0) {
        return res.status(404).json({ message: 'Admin não encontrado' });
      }
  
      const admin = admins[0]; // Acessa o primeiro elemento
  
      // Comparando a senha fornecida com a senha armazenada do admin no banco
      const isPasswordValid = await bcrypt.compare(password, admin.password);
  
      // Verificando se a senha é valida
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Senha incorreta' });
      }

    // const token = Jwt.sign({ id: admin.id }, process.env.JWT_PASS, { expiresIn: '2h' })
    //JWT
    const token = generateToken({ id: admin.id });

    //Desestrutura o password para ignorar o password
     const { password:_, ...adminlogin } = admin;

     return res.json({
        admin: adminlogin,
        token: token,
     })


    } catch (error) {
      console.error('Erro ao fazer login do admin:', error);
      res.status(500).json({ message: 'Erro ao fazer login do admin' });
    }
  }
}


  