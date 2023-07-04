import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import  Jwt from "jsonwebtoken";
import { generateToken } from "../../Utils/jwtUtils";


const prisma = new PrismaClient();
export class UserController {
    async createUser(req: Request, res: Response){
        const { name, email, password } = req.body;

        // Criptografando a senha
        const hash = await bcrypt.hash(password, 10);

        try {
          // Criando um novo usuário no banco de dados
          const newUser = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hash,
                },
                
            });

            // Omitindo a senha do objeto de usuário
            const {password: _, ...user} = newUser;

            
          return  res.status(201).json({ message: 'Usuario criado com sucesso', user });

        } catch (err) {

          console.log(err)
            res.status(400).json({ message: 'Erro ao criar usuario' });
        }
     };


     async login(req: Request, res: Response) {
        const { email, password } = req.body;
      
        try {
          // Procurando o usuário no banco de dados
          const user = await prisma.user.findUnique({
            where: { email },
          });
      
          if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" });
          }
      
          // Comparando a senha fornecida com a senha armazenada no banco de dados
          const isPasswordValid = await bcrypt.compare(password, user.password);
      
          // Verificar se a senha é válida
          if (!isPasswordValid) {
            return res.status(401).json({ message: 'Senha incorreta' });
          }
      
          // Gerar o token JWT com base no ID do usuário
          const token = generateToken({ id: user.id });
      
          // Remover a senha do objeto do usuário
          const userWithoutPassword = { ...user };
          delete userWithoutPassword.password;
      
          return res.json({
            user: userWithoutPassword,
            token: token,
          });
        } catch (err) {
          console.error('Erro ao fazer login:', err);
          res.status(400).json({ message: 'Erro ao fazer login' });
        }
      }
      

     async deleteUser(req: Request, res: Response){
        const { id } = req.params;

        try {
            // Deletando o usuário pelo ID no banco de dados
            await prisma.user.delete({
                where: {
                    id: String(id),
                }
            });

            res.status(200).json({ message: 'Usuario deletado com sucesso deleted succesfully' });
        } catch (err) {
            res.status(400).json({ message: 'Erro ao deletar usuario' })
        }
     }
};