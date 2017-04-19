import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { TaxExemption } from '../models/tax-exemption';

import { AuthService } from './auth.service';

@Injectable()
export class TaxExemptionService {
    private url = '/api/v1/finances/taxExemptions';

    constructor(private http: Http,
                private authService: AuthService) { }

    getTaxExemptions(): Promise<TaxExemption[]> {
        return this.http.get(this.url, {
            headers: this.authService.createAuthHeaders()
        })
         .toPromise()
         .then(response => {
             return response.json() as TaxExemption[]
         })
         .catch(this.handleError);
    }

    create(exemption): Promise<TaxExemption[]> {
        return this.http.post(this.url, exemption, {
            headers: this.authService.createAuthHeaders()
        })
            .toPromise()
            .then(response => {
                return response.json() as TaxExemption[]
            })
         .catch(this.handleError);
    }

    update(exemption): Promise<TaxExemption[]> {
        var newUrl = this.url + '/' + exemption.id;

        return this.http.put(newUrl, exemption, {
            headers: this.authService.createAuthHeaders()
        })
            .toPromise()
            .then(response => {
                return response.json() as TaxExemption[]
            })
         .catch(this.handleError);
    }

    delete(exemptionId): Promise<TaxExemption[]> {
        var newUrl = this.url + '/' + exemptionId;

        return this.http.delete(newUrl, {
            headers: this.authService.createAuthHeaders()
        })
            .toPromise()
            .then(response => {
                return response.json() as TaxExemption[]
            })
         .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}