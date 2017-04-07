import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Finances } from '../models/finances';
import { IncomeSourceService } from './income-source.service';
import { TaxDeductionService } from './tax-deduction.service';
import { TaxExemptionService } from './tax-exemption.service';
import { TaxCreditService } from './tax-credit.service';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class FinanceService {
    private url = '/api/v1/finances';

    constructor(private http: Http,
                public incomeSources: IncomeSourceService,
                public taxDeductions: TaxDeductionService,
                public taxExemptions: TaxExemptionService,
                public taxCredits: TaxCreditService) {}

    get(): Promise<Finances> {
        return this.http.get(this.url)
         .toPromise()
         .then(response => {
             return response.json() as Finances;
         })
         .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}