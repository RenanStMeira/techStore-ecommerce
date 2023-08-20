import { Request, Response } from "express";
export declare class AdminController {
    createAdmin(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    listAdmin(req: Request, res: Response): Promise<void>;
    deleteAdmin(req: Request, res: Response): Promise<void>;
}
