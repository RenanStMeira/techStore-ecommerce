import { Request, Response } from "express";
export declare class ProductController {
    create(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    upload(req: Request, res: Response): Response<any, Record<string, any>>;
    findAll(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    delete(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
