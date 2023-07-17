import { Request, Response } from "express";
export declare class salesController {
    historySale(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    findOne(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    findAll(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    create(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    updateSale(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteSale(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
