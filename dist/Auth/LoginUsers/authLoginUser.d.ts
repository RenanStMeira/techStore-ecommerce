import { Request, Response } from "express";
export declare class LoginController {
    login(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
