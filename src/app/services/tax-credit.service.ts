import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { TaxCredit } from '../models/tax-credit';

import { AuthService } from './auth.service';

@Injectable()
export class TaxCreditService {
    private url = '/api/v1/finances/taxCredits';

    constructor(private http: Http,
                private authService: AuthService) { }

    getTaxCredits(): Promise<TaxCredit[]> {
        return this.http.get(this.url, {
            headers: this.authService.createAuthHeaders()
        })
         .toPromise()
         .then(response => {
             return response.json() as TaxCredit[]
         })
         .catch(this.handleError);
    }

    create(credit): Promise<TaxCredit[]> {
        return this.http.post(this.url, credit, {
            headers: this.authService.createAuthHeaders()
        })
            .toPromise()
            .then(response => {
                return response.json() as TaxCredit[]
            })
         .catch(this.handleError);
    }

    update(credit): Promise<TaxCredit[]> {
        var newUrl = this.url + '/' + credit.id;

        return this.http.put(newUrl, credit, {
            headers: this.authService.createAuthHeaders()
        })
            .toPromise()
            .then(response => {
                return response.json() as TaxCredit[]
            })
         .catch(this.handleError);
    }

    delete(creditId): Promise<TaxCredit[]> {
        var newUrl = this.url + '/' + creditId;

        return this.http.delete(newUrl, {
            headers: this.authService.createAuthHeaders()
        })
            .toPromise()
            .then(response => {
                return response.json() as TaxCredit[]
            })
         .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}