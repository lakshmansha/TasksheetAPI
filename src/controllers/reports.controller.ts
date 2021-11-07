import { NextFunction, Request, Response } from 'express';

import { ReportDto } from "@dtos/reports.dto";
import { Report } from "@interfaces/report.interface";
import reportService from "@services/report.service";


class ReportsController {
    public reportService = new reportService();

    public getReportByClient = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const reportData: ReportDto = req.body;
            const findAllReportsData: Report[] = await this.reportService.findReportByRange(reportData);

            res.status(200).json({ data: findAllReportsData, message: 'findAll' });
        } catch (error) {
            next(error);
        }
    };
}

export default ReportsController;