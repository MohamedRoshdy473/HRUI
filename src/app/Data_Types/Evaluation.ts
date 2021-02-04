import { DecimalPipe } from '@angular/common';

export class Evaluation {
    id: Number;
    employeeID:Number;
    professionID:Number;
    evaluationTypeID:Number;
    employeeName: String;
    evaluationProfessionID: Number;
    evaluationTypeName: String;
    professionName: String;
    evaluationDegreee: DecimalPipe;
    evaluationDate: Date;
    note: String;
}