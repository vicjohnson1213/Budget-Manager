import { Component, OnInit, ViewChild } from '@angular/core';

import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { Budget } from '../../models/budget';
import { BudgetCategory } from '../../models/budget-category';
import { BudgetItem } from '../../models/budget-item';
import { BudgetService } from '../../services/budget.service';

import { Transaction } from '../../models/transaction';
import { TransactionSummary } from '../../models/transaction-summary';
import { TransactionService } from '../../services/transaction.service';

@Component({
    selector: 'transactions',
    templateUrl: './transactions.component.html'
})

export class TransactionsComponent {
    transactionSummary: TransactionSummary = new TransactionSummary();
    budget: Budget = new Budget();

    constructor(private budgetService: BudgetService,
                private transactionService: TransactionService) {}

    /* BEGIN BUDGET ITEMS */

    @ViewChild('transactionModal')
    transactionModal: ModalComponent;
    transaction: Transaction = new Transaction();

    setSummary(summary) {
        this.transactionSummary = summary;
    }

    createTransaction() {
        this.transaction = new Transaction();
        this.transaction.date = new Date();
        this.transaction.budgetItemId = this.budget.categories[0].items[0].id;
        this.transactionModal.open();
    }

    editTransaction(transaction) {
        this.transaction = transaction;
        this.transactionModal.open();
    }

    saveTransaction(): void {
        if (this.transaction.id) {
            this.transactionService.update(this.transaction)
                .then(summary => { this.setSummary(summary) });
        } else {
            this.transactionService.create(this.transaction)
                .then(summary => { this.setSummary(summary) });
        }

        this.transactionModal.close();
    }

    deleteTransaction(): void {
        this.transactionService.delete(this.transaction.id)
            .then(summary => { this.setSummary(summary) });

        this.transactionModal.close();
    }

    /* END BUDGET ITEMS */

    fixBudgetItemId() {
        this.transaction.budgetItemId = +this.transaction.budgetItemId;
    }
    
    ngOnInit() {
        this.transactionService.get()
            .then(summary => this.setSummary(summary));

        this.budgetService.get()
            .then(budget => this.budget = budget)
    }
}