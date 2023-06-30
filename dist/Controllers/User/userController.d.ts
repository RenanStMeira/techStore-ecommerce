import { Request, Response } from "express";
export declare class UserController {
    createUser(req: Request, res: Response): Promise<void>;
    login(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    listUsers(req: Request, res: Response): Promise<void>;
    deleteUser(req: Request, res: Response): Promise<void>;
}
