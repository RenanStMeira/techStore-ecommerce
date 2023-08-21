import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { UserController } from '../../Controllers/User/userController';
import { mock } from 'ts-mockito';

describe('Testing method user controllers', () => {
  let userController: UserController;
  let req: Request;
  let res: Response;

  beforeEach(() => {
    userController = new UserController();
    req = {
      params: {
        id: 'b0cdf861-a1d9-469f-b3bb-abee63513e31'
      }
    } as unknown as Request;

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response
  });

  it('Verify return a user get', () => {
    const clint = {
      id: 'b0cdf861-a1d9-469f-b3bb-abee63513e31',
      name: 'Meira',
      email: '',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const clintMock = jest.fn().mockResolvedValue(clint);

    res.json = clintMock;

    userController.listUsers(req, res);

    expect(res.json).toBe(clintMock);
  });
});

describe('UserController', () => {
  let userController: UserController; // Certifique-se de usar o UserController correto
  let req: Request;
  let res: Response;

  beforeEach(() => {
      userController = new UserController(); // Certifique-se de usar o UserController correto
      req = {
          body: { // Simulando um corpo de solicitação válido
              name: 'Nome do Usuário',
              email: 'usuario@example.com',
              contato: '123456789',
              Adress: 'Endereço do Usuário',
              road: 'Nome da Rua',
              Zipcode: '12345-678',
              password: 'senha123'
          }
      } as Request;
      res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
      } as unknown as Response;
  });

      
  it('Create User', () => {
  userController = new UserController();
    
   const clint = {
     id: 'b0cdf861-a1d9-469f-b3bb-abee63513e31',
     name: 'test',
     email: 'test@test.com',
     createAdt: new Date(),
     updatedAt: new Date()
   };

  const clintMock = jest.fn().mockResolvedValue(clint);

  res.json = clintMock;

  userController.createUser(req, res);

  expect(res.json).toBe(clintMock);

  });

  it('Delete user', () => {
    userController = new UserController();

    const reqParams = {
      params: {
          id: 'b0cdf861-a1d9-469f-b3bb-abee63513e31',
      }
  };

  req = reqParams as unknown as Request;

  res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
  } as unknown as Response;

     const clint = {

       id: 'b0cdf861-a1d9-469f-b3bb-abee63513e31',
     };

    const clintMock = jest.fn().mockResolvedValue(clint);
    res.json = clintMock;

    userController.deleteUser(req, res);
    expect(res.json).toBe(clintMock);
  });
});