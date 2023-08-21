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
        req = {
            params: {
                id: 'b0cdf861-a1d9-469f-b3bb-abee63513e31' // Simulando o parâmetro ID
            }
        } as unknown as Request;
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;
    });

    test ('should return a admin', () => {
        const admin = {
            id: 'b0cdf861-a1d9-469f-b3bb-abee63513e31',
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