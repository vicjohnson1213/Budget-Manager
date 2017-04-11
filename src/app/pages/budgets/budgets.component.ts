import { Component, OnInit, ViewChild } from '@angular/core';

import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { Budget } from '../../models/budget';
import { BudgetCategory } from '../../models/budget-category';
import { BudgetItem } from '../../models/budget-item';
import { BudgetService } from '../../services/budget.service';

import { Finances } from '../../models/finances';
import { FinanceService } from '../../services/finances.service';

@Component({
    selector: 'budgets',
    templateUrl: './budgets.component.html'
})

export class BudgetsComponent {
    budget: Budget = new Budget();
    finances: Finances = new Finances();
    selectedCategoryId: number;

    constructor(private budgetService: BudgetService,
                private financeService: FinanceService) {}

    /* BEGIN BUDGET GROUPS */

    @ViewChild('budgetCategoryModal')
    budgetCategoryModal: ModalComponent;
    budgetCategory: BudgetCategory = new BudgetCategory();

    setBudget(budget) {
        this.budget = budget;
    }

    createNewBudgetCategory(): void {
        this.budgetCategory = new BudgetCategory();
        this.budgetCategoryModal.open();
    }

    editBudgetCategory(groupId, group): void {
        this.budgetCategory = group;
        this.budgetCategoryModal.open();
    }

    saveBudgetCategory(): void {
        if (this.budgetCategory.id) {
            this.budgetService.updateBudgetCategory(this.budgetCategory)
                .then(budget => { this.setBudget(budget) });
        } else {
            this.budgetService.createBudgetCategory(this.budgetCategory)
                .then(budget => { this.setBudget(budget) });
        }

        this.budgetCategoryModal.close();
    }

    deleteBudgetCategory(): void {
        this.budgetService.deleteBudgetCategory(this.budgetCategory.id)
            .then(budget => { this.setBudget(budget) });

        this.budgetCategoryModal.close();
    }

    /* END BUDGET GROUPS */

    /* BEGIN BUDGET ITEMS */

    @ViewChild('budgetItemModal')
    budgetItemModal: ModalComponent;
    budgetItem: BudgetItem = new BudgetItem();

    createNewBudgetItem(groupId) {
        this.budgetItem = new BudgetItem();
        this.selectedCategoryId = groupId;
        this.budgetItemModal.open();
    }

    editBudgetItem(groupId, item) {
        this.selectedCategoryId = groupId;
        this.budgetItem = item;
        this.budgetItemModal.open();
    }

    saveBudgetItem(): void {
        if (this.budgetItem.id) {
            this.budgetService.editBudgetItem(this.selectedCategoryId, this.budgetItem)
                .then(budget => { this.setBudget(budget) });
        } else {
            this.budgetService.createBudgetItem(this.selectedCategoryId, this.budgetItem)
                .then(budget => { this.setBudget(budget) });
        }

        this.budgetItemModal.close();
    }

    deleteBudgetItem(): void {
        this.budgetService.deleteBudgetItem(this.budgetItem.id)
            .then(budget => { this.setBudget(budget) });

        this.budgetItemModal.close();
    }

    /* END BUDGET ITEMS */

    ngOnInit() {
        this.budgetService.get()
            .then(budget => this.setBudget(budget));

        this.financeService.get()
            .then(finances => this.finances = finances);
    }
}