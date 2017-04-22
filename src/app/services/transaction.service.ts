import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { TransactionSummary } from '../models/transaction-summary';

import { HttpService } from '../shared/http.service';

@Injectable()
export class TransactionService {
    private url = '/api/v1/transactions';

    constructor(private http: HttpService) { }

    private extractData(res: Response) {
        var data = res.json() || [];

        data.transactions.forEach((transaction) => {
            transaction.date = new Date(transaction.date);
        });

        return data as TransactionSummary;
    }

    get(): Promise<TransactionSummary> {
        return this.http.get(this.url)
            .map(this.extractData)
            .toPromise()
            .catch(this.handleError);
    }

    create(transaction): Promise<TransactionSummary> {
        return this.http.post(this.url, transaction)
            .map(this.extractData)
            .toPromise()
            .catch(this.handleError);
    }

    update(transaction): Promise<TransactionSummary> {
        var newUrl = this.url + '/' + transaction.id;

        return this.http.put(newUrl, transaction)
            .map(this.extractData)
            .toPromise()
            .catch(this.handleError);
    }

    delete(transactionId): Promise<TransactionSummary> {
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