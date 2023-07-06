import { Request, Response } from "express";
export declare class UserController {
    createUser(req: Request, res: Response): Promise<void>;
    listUsers(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteUser(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
