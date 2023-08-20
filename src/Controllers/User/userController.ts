import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';


const prisma = new PrismaClient();
export class UserController {
    async createUser(req: Request, res: Response){
        const { name, email, contato, Adress, road, Zipcode, password } = req.body;

        // Criptografando a senha
        const hash = await bcrypt.hash(password, 10);

        try {
          const newUser = await prisma.user.create({
                data: {
                    name,
                    email,
                    contato,
                    Adress,
                    road,
                    Zipcode,
                    password: hash,
                },
                
            });

            const {password: _, ...user} = newUser;

            
          return  res.status(201).json({ message: 'Usuario criado com sucesso', user });

        } catch (err) {
<<<<<<< HEAD

          console.log(err)
          return  res.status(400).json({ message: 'Erro ao criar usuario' });
=======
            res.status(400).json({ message: 'Erro ao criar usuario' });
>>>>>>> main
        }
     };

     async findAll(req: Request, res: Response) {

<<<<<<< HEAD
      try {
        const users = await prisma.user.findMany();
        return res.status(200).json(users);

      } catch (err) {

        return res.status(400).json({ message: 'Erro ao buscar usuários' });
      }
    }
  
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
=======
     async listUsers(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const users = await prisma.user.findMany({
                where: {
                    id: id,
                }
            });

            if (users){
               return res.json(users);

            }else {
               return res.status(404).json({ message: 'Usuario não encontrado' })
            }
               } catch {
            res.status(400).json({ message: 'Erro no Servidor Interno' })
>>>>>>> main
        }
      }
      

     async deleteUser(req: Request, res: Response){
        const { id } = req.params;

        try {
            await prisma.user.delete({
                where: {
                    id: String(id),
                }
            });

           return res.status(200).json({ message: 'Usuario deletado com sucesso ' });
        } catch (err) {
<<<<<<< HEAD
            res.status(400).json({ message: 'Erro ao deletar usuario' })
=======
            return res.status(400).json({ message: 'Erro ao deletar usuario' })
        }
     }

     async updateUser(req: Request, res: Response){
        const { id } = req.params;
        const { name, email, password, contato, Adress, road, Zipcode } = req.body;

        try{
             const newUserUpdate = await prisma.user.update({
            where: { id },
            data: {
                name: name,
                email: email,
                password: password,
                contato: contato,
                Adress: Adress,
                Zipcode: Zipcode,
                road: road
            },
        });
        return res.status(200).json({ message: 'Ussuario atualizado com sucesso'});

        } catch (err) { 
        return res.status(400).json({ err: 'Erro ao atualizar usuario' });
>>>>>>> main
        }
     }
};