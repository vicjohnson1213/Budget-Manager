import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Transaction } from '../models/transaction';

@Injectable()
export class TransactionService {
    private url = '/api/v1/transactions';

    constructor(private http: Http) { }

    private extractData(res: Response) {
        var data = res.json() || [];

        data.forEach((transaction) => {
            transaction.date = new Date(transaction.date);
        });

        return data as Transaction[];
    }

    get(): Promise<Transaction[]> {
        var newUrl = this.url + '/summary';

        return this.http.get(newUrl)
            .map(this.extractData)
            .toPromise()
            .catch(this.handleError);
    }

    create(transaction): Promise<Transaction[]> {
        return this.http.post(this.url, transaction)
            .map(this.extractData)
            .toPromise()
            .catch(this.handleError);
    }

    update(transaction): Promise<Transaction[]> {
        var newUrl = this.url + '/' + transaction.id;

        return this.http.put(newUrl, transaction)
            .map(this.extractData)
            .toPromise()
            .catch(this.handleError);
    }

    delete(transactionId): Promise<Transaction[]> {
        var newUrl = this.url + '/' + transactionId;

        return this.http.delete(newUrl)
            .map(this.extractData)
            .toPromise()
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}