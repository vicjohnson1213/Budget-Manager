import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { TaxCredit } from '../models/tax-credit';

@Injectable()
export class TaxCreditService {
  private url = '/api/v1/taxCredits';

  constructor(private http: Http) { }

  getTaxCredits(): Promise<TaxCredit[]> {
    return this.http.get(this.url)
     .toPromise()
     .then(response => {
       return response.json() as TaxCredit[]
     })
     .catch(this.handleError);
  }

  createTaxCredit(credit): Promise<TaxCredit[]> {
    return this.http.post(this.url, credit)
      .toPromise()
      .then(response => {
        return response.json() as TaxCredit[]
      })
     .catch(this.handleError);
  }

  updateTaxCredit(credit): Promise<TaxCredit[]> {
    var newUrl = this.url + '/' + credit.id;

    return this.http.put(newUrl, credit)
      .toPromise()
      .then(response => {
        return response.json() as TaxCredit[]
      })
     .catch(this.handleError);
  }

  deleteTaxCredit(creditId): Promise<TaxCredit[]> {
    var newUrl = this.url + '/' + creditId;

    return this.http.delete(newUrl)
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