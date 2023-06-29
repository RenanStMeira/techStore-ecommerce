import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import  Jwt from "jsonwebtoken";

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

            res.status(201).json({ message: 'Usuario criado com sucesso', user });

        } catch (err) {
            res.status(500).json({ message: 'Erro ao criar usuario' });
        }
     };


     async login(req: Request, res: Response){
        const { email, password } = req.body;

        try{
            // Procurando o usuário no banco de dados
            const users = await prisma.user.findUnique({
                where:{ email },
            });

            if(!users) {
                return res.status(404).json({ message: "Usuario não encontrado" });
            }

            //comparando a senha fornecida com a senha armazenada do banco de dados
            const isPasswordValid = await bcrypt.compare(password, users.password);

            //Verificar se a senha é valida
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Senha incorreta' })
            }

            //jwt
            //Gerar o token JWT com base no ID do usuário, chave secreta do JWT definida no ambiente e opções de expiração
            const token = Jwt.sign({ id: users.id }, process.env.JWT_PASS, {expiresIn: '7h'})

            //Desestrutura o password para ignorar o password
            const { password:_, ...userLogin } = users;

            return res.json({
                user: userLogin,
                token: token,
            });


        }catch (err) {
            console.error('Erro ao fazer login:', err);
            res.status(500).json({ message: 'Erro ao fazer login' });
        }
     }

     async listUsers(req: Request, res: Response) {
        const { id } = req.params;

        try {
            // Buscando o usuário pelo ID no banco de dados
            const users = await prisma.user.findUnique({
                where: {
                    id: id,
                }
            });

            if (users){
                // Retornando o usuário encontrado
                res.json(users);

            }else {
                 res.status(404).json({ message: 'Usuario não encontrado' })
            }
               } catch {
            res.status(500).json({ message: 'Erro no Servidor Interno' })
        }
     };

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
            res.status(500).json({ message: 'Erro ao deletar usuario' })
        }
     }
};