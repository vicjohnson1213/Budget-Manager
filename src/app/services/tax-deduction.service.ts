import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { TaxDeduction } from '../models/tax-deduction';

import { AuthService } from './auth.service';

@Injectable()
export class TaxDeductionService {
    private url = '/api/v1/finances/taxDeductions';

    constructor(private http: Http,
                private authService: AuthService) { }

    getTaxDeductions(): Promise<TaxDeduction[]> {
        return this.http.get(this.url, {
            headers: this.authService.createAuthHeaders()
        })
         .toPromise()
         .then(response => {
             return response.json() as TaxDeduction[]
         })
         .catch(this.handleError);
    }

    create(deduction): Promise<TaxDeduction[]> {
        return this.http.post(this.url, deduction, {
            headers: this.authService.createAuthHeaders()
        })
            .toPromise()
            .then(response => {
                return response.json() as TaxDeduction[]
            })
         .catch(this.handleError);
    }

    update(deduction): Promise<TaxDeduction[]> {
        var newUrl = this.url + '/' + deduction.id;

        return this.http.put(newUrl, deduction, {
            headers: this.authService.createAuthHeaders()
        })
            .toPromise()
            .then(response => {
                return response.json() as TaxDeduction[]
            })
         .catch(this.handleError);
    }

    delete(deductionId): Promise<TaxDeduction[]> {
        var newUrl = this.url + '/' + deductionId;

        return this.http.delete(newUrl, {
            headers: this.authService.createAuthHeaders()
        })
            .toPromise()
            .then(response => {
                return response.json() as TaxDeduction[]
            })
         .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}