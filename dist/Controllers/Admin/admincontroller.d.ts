import { Request, Response } from "express";
export declare class AdminController {
    createAdmin(req: Request, res: Response): Promise<void>;
    listAdmin(req: Request, res: Response): Promise<void>;
    deleteAdmin(req: Request, res: Response): Promise<void>;
}
