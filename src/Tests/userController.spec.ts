import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { UserController } from '../Controllers/User/userController';
import { mock } from 'ts-mockito';
import { randomUUID } from 'node:crypto'

const prismaMock = mock(PrismaClient);


describe('UserController', () => {
    // Declaração das variavel que sera ultilizado
    var userController: UserController; 
    var req: Request; 
    var res: Response; 
    var prisma: PrismaClient; 
  
    // Função executada antes de cada teste
    beforeEach(() => {
      userController = new UserController(); // Instanciando o UserController

      //Criando um objeto que realiza a requisição
      req = {} as Request;
      // Criando um objeto vazio que simula a resposta
      res = {} as Response; 
       // Inicializando o cliente do Prisma
      prisma = new PrismaClient();
    });
  
    // Função executada após todos os testes
    afterAll(async () => {
      await prisma.$disconnect(); // Desconectando o cliente do Prisma do banco de dados
    });
  
    // Descrição dos testes da função createUser do UserController
    describe('createUser', () => {
      it('should create a new user', async () => {
         // Definindo os dados do corpo da requisição
        req.body = {
          name: 'Test User',
          email:` test${randomUUID()}@example.com`,
          password: '123456',
        };
  
        res.status = jest.fn().mockReturnThis(); // Status da resposta com o uso do jest.fn()
        res.json = jest.fn(); //Resposta com o uso do jest.fn()
  
         // Chamando a função createUser do UserController
      const createUser = await userController.createUser(req, res);
        
      createUser.json({ user: 'jose' })

        // Verificando se a função status foi chamada com o código 201
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
          message: 'Usuario criado com sucesso',user:createUser.json
        });
      });
    });
  });
  
  
  
  
  
  
  
  