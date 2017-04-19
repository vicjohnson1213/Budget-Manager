import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { IncomeSource } from '../models/income-source';

import { AuthService } from './auth.service';

@Injectable()
export class IncomeSourceService {
    private url = '/api/v1/finances/incomeSources';

    constructor(private http: Http,
                private authService: AuthService) { }

    getIncomeSources(): Promise<IncomeSource[]> {
        return this.http.get(this.url, {
            headers: this.authService.createAuthHeaders()
        })
         .toPromise()
         .then(response => {
             return response.json() as IncomeSource[]
         })
         .catch(this.handleError);
    }

    create(source): Promise<IncomeSource[]> {
        return this.http.post(this.url, source, {
            headers: this.authService.createAuthHeaders()
        })
            .toPromise()
            .then(response => {
                return response.json() as IncomeSource[]
            })
         .catch(this.handleError);
    }

    update(source): Promise<IncomeSource[]> {
        var newUrl = this.url + '/' + source.id;

        return this.http.put(newUrl, source, {
            headers: this.authService.createAuthHeaders()
        })
            .toPromise()
            .then(response => {
                return response.json() as IncomeSource[]
            })
         .catch(this.handleError);
    }

    delete(sourceId): Promise<IncomeSource[]> {
        var newUrl = this.url + '/' + sourceId;
        
        return this.http.delete(newUrl, {
            headers: this.authService.createAuthHeaders()
        })
            .toPromise()
            .then(response => {
                return response.json() as IncomeSource[]
            })
         .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}