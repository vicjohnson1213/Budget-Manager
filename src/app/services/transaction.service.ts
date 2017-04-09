import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Transaction } from '../models/transaction';

@Injectable()
export class TransactionService {
    private url = '/api/v1/transactions';

    constructor(private http: Http) { }

    get(): Promise<Transaction[]> {
        var newUrl = this.url + '/summary';

        return this.http.get(newUrl)
         .toPromise()
         .then(response => {
             return response.json() as Transaction[]
         })
         .catch(this.handleError);
    }

    create(transaction): Promise<Transaction[]> {
        return this.http.post(this.url, transaction)
            .toPromise()
            .then(response => {
                return response.json() as Transaction[]
            })
         .catch(this.handleError);
    }

    update(transaction): Promise<Transaction[]> {
        var newUrl = this.url + '/' + transaction.id;

        return this.http.put(newUrl, transaction)
            .toPromise()
            .then(response => {
                return response.json() as Transaction[]
            })
         .catch(this.handleError);
    }

    delete(transactionId): Promise<Transaction[]> {
        var newUrl = this.url + '/' + transactionId;

        return this.http.delete(newUrl)
            .toPromise()
            .then(response => {
                return response.json() as Transaction[]
            })
         .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}