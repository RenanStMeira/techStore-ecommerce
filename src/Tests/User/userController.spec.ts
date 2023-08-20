import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { UserController } from '../../Controllers/User/userController';
import { mock } from 'ts-mockito';

const prismaMock = mock(PrismaClient);

describe('UserController', () => {
  let userController: UserController;
  let req: Request;
  let res: Response;

  beforeEach(() => {
    userController = new UserController();
    
    req = {} as Request;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
  });

  it("should return a user", () => {
    const user = {
      name: 'renan',
      email: "",
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const userMock = jest.fn().mockResolvedValue(user);

    res.json = userMock;

    userController.findAll(req, res);

    expect(res.json).toBe(userMock);
  });
});
