import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { BudgetGroup } from '../models/budget-group';

@Injectable()
export class BudgetGroupService {
  private url = '/api/v1/budget';

  constructor(private http: Http) { }

  getBudgetGroups(): Promise<BudgetGroup[]> {
    return this.http.get(this.url)
     .toPromise()
     .then(response => {
       return response.json() as BudgetGroup[]
     })
     .catch(this.handleError);
  }

  // createBudgetCategory(category): Promise<BudgetGroup[]> {
  //   return this.http.post(this.url, category)
  //     .toPromise()
  //     .then(response => {
  //       return response.json() as BudgetGroup[]
  //     })
  //    .catch(this.handleError);
  // }

  // updateBudgetCategory(category): Promise<BudgetGroup[]> {
  //   var newUrl = this.url + '/' + category.id;

  //   return this.http.put(newUrl, category)
  //     .toPromise()
  //     .then(response => {
  //       return response.json() as BudgetGroup[]
  //     })
  //    .catch(this.handleError);
  // }

  // deleteBudgetCategory(categoryId): Promise<BudgetGroup[]> {
  //   var newUrl = this.url + '/' + categoryId;
    
  //   return this.http.delete(newUrl)
  //     .toPromise()
  //     .then(response => {
  //       return response.json() as BudgetGroup[]
  //     })
  //    .catch(this.handleError);
  // }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}