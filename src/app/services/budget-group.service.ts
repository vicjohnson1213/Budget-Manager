import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { BudgetGroup } from '../models/budget-group';

@Injectable()
export class BudgetGroupService {
    private url = '/api/v1/budget';

    constructor(private http: Http) { }

    /* BEGIN BUDGET GROUPS */

    getBudgetGroups(): Promise<BudgetGroup[]> {
        return this.http.get(this.url)
         .toPromise()
         .then(response => {
             return response.json() as BudgetGroup[]
         })
         .catch(this.handleError);
    }

    createBudgetGroup(category): Promise<BudgetGroup[]> {
        return this.http.post(this.url + '/categories', category)
            .toPromise()
            .then(response => {
                return response.json() as BudgetGroup[]
         })
         .catch(this.handleError);
    }

    updateBudgetGroup(category): Promise<BudgetGroup[]> {
        var newUrl = this.url + '/categories/' + category.id;

        return this.http.put(newUrl, category)
            .toPromise()
            .then(response => {
                return response.json() as BudgetGroup[]
         })
         .catch(this.handleError);
    }

    deleteBudgetGroup(categoryId): Promise<BudgetGroup[]> {
        var newUrl = this.url + '/categories/' + categoryId;

        return this.http.delete(newUrl)
            .toPromise()
            .then(response => {
                return response.json() as BudgetGroup[]
         })
         .catch(this.handleError);
    }

    /* END BUDGET GROUPS */

    /* BEGIN BUDGET ITEMS */

    createBudgetItem(groupId, item): Promise<BudgetGroup[]> {
        var newUrl = this.url + '/items';

        item.budgetCategoryId = groupId;

        return this.http.post(newUrl, item)
            .toPromise()
            .then(response => {
                return response.json() as BudgetGroup[]
         })
         .catch(this.handleError);
    }

    editBudgetItem(groupId, item): Promise<BudgetGroup[]> {
        var newUrl = this.url + '/items/' + item.id;

        item.budgetCategoryId = groupId;

        return this.http.put(newUrl, item)
            .toPromise()
            .then(response => {
                return response.json() as BudgetGroup[]
         })
         .catch(this.handleError);
    }

    deleteBudgetItem(itemId): Promise<BudgetGroup[]> {
        return this.http.delete(this.url + '/items/' + itemId)
            .toPromise()
            .then(response => {
                return response.json() as BudgetGroup[]
         })
         .catch(this.handleError);
    }

    /* END BUDGET ITEMS */

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}