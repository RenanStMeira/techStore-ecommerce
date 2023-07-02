import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import { generateToken } from "../../Utils/jwtUtils";

const prisma = new PrismaClient();

export class LoginController{
async login(req: Request, res: Response){
    const { email, password } = req.body;

    try{
        // Procurando o usuário no banco de dados
        const users = await prisma.user.findUnique({
            where:{ email },
        });

        if(!users) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        // Comparando a senha fornecida com a senha armazenada do banco de dados
        const isPasswordValid = await bcrypt.compare(password, users.password);

        // Verificar se a senha é válida
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Senha incorreta' })
        }

        //jwt
        //Gerar o token JWT com base no ID do usuário, chave secreta do JWT definida no ambiente e opções de expiração
        // const token = Jwt.sign({ id: users.id }, process.env.JWT_PASS, {expiresIn: '1h'})


        // Gerar o token JWT com base no ID do usuário
        const token = generateToken({ id: users.id });

        // Desestrutura o password para ignorar o password
        const { password:_, ...userLogin } = users;

        return res.json({
            user: userLogin,
            token: token,
        });

    } catch (err) {
        console.error('Erro ao fazer login:', err);
        res.status(500).json({ message: 'Erro ao fazer login' });
    }
}

}

