import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { TaxExemption } from '../models/tax-exemption';

@Injectable()
export class TaxExemptionService {
  private url = '/api/v1/taxExemptions';

  constructor(private http: Http) { }

  getTaxExemptions(): Promise<TaxExemption[]> {
    return this.http.get(this.url)
     .toPromise()
     .then(response => {
       return response.json() as TaxExemption[]
     })
     .catch(this.handleError);
  }

  createTaxExemption(exemption): Promise<TaxExemption[]> {
    return this.http.post(this.url, exemption)
      .toPromise()
      .then(response => {
        return response.json() as TaxExemption[]
      })
     .catch(this.handleError);
  }

  updateTaxExemption(exemption): Promise<TaxExemption[]> {
    var newUrl = this.url + '/' + exemption.id;

    return this.http.put(newUrl, exemption)
      .toPromise()
      .then(response => {
        return response.json() as TaxExemption[]
      })
     .catch(this.handleError);
  }

  deleteTaxExemption(exemptionId): Promise<TaxExemption[]> {
    var newUrl = this.url + '/' + exemptionId;

    return this.http.delete(newUrl)
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