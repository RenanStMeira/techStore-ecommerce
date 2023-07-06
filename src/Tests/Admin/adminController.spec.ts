import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { AdminController } from "../../Controllers/Admin/adminController";
import { mock } from "ts-mockito";

const prismaMock = mock(PrismaClient);

describe('Admincontroller', () => {
    let adminController: AdminController;
    let req: Request;
    let res: Response;

    beforeEach(() => {
        adminController = new AdminController();
        req = {} as Request;
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;
});

test ('should return a admin', () => {
    const admin = {
        name: 'Meira',
        email: '',
        createdAt: new Date(),
        updatedAt: new Date()
    };

    const adminMock = jest.fn().mockResolvedValue(admin);

    res.json = adminMock;

    adminController.listAdmin(req, res);

    expect(res.json).toBe(adminMock);
});
});