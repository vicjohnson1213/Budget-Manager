import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { IncomeSource } from '../models/income-source';

import { HttpService } from '../shared/http.service';

@Injectable()
export class IncomeSourceService {
    private url = '/api/v1/finances/incomeSources';

    constructor(private http: HttpService) { }

    getIncomeSources(): Promise<IncomeSource[]> {
        return this.http.get(this.url)
            .toPromise()
            .then(response => {
                return response.json() as IncomeSource[]
            })
            .catch(this.handleError);
    }

    create(source): Promise<IncomeSource[]> {
        return this.http.post(this.url, source)
            .toPromise()
            .then(response => {
                return response.json() as IncomeSource[]
            })
         .catch(this.handleError);
    }

    update(source): Promise<IncomeSource[]> {
        var newUrl = this.url + '/' + source.id;

        return this.http.put(newUrl, source)
            .toPromise()
            .then(response => {
                return response.json() as IncomeSource[]
            })
         .catch(this.handleError);
    }

    delete(sourceId): Promise<IncomeSource[]> {
        var newUrl = this.url + '/' + sourceId;
        
        return this.http.delete(newUrl)
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