import { Component, OnInit, ViewChild } from '@angular/core';

import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { BudgetGroup } from '../../models/budget-group';
import { BudgetItem } from '../../models/budget-item';
import { BudgetGroupService } from '../../services/budget-group.service';

import { Transaction } from '../../models/transaction';
import { TransactionService } from '../../services/transaction.service';

@Component({
    selector: 'transactions',
    templateUrl: './transactions.component.html'
})

export class TransactionsComponent {
    transactions: Transaction[];
    groups: BudgetGroup[];

    constructor(private budgetGroupService: BudgetGroupService,
                private transactionService: TransactionService) {}

        /* BEGIN BUDGET ITEMS */

    @ViewChild('transactionModal')
    transactionModal: ModalComponent;
    transaction: Transaction = new Transaction();

    setTransactions(transactions) {
        this.transactions = transactions;
    }

    createTransaction() {
        this.transaction = new Transaction();
        this.transactionModal.open();
    }

    editTransaction(transaction) {
        this.transaction = transaction;
        this.transactionModal.open();
    }

    saveTransaction(): void {
        if (this.transaction.id) {
            this.transactionService.update(this.transaction)
                .then(transactions => { this.setTransactions(transactions) });
        } else {
            this.transactionService.create(this.transaction)
                .then(transactions => { this.setTransactions(transactions) });
        }

        this.transactionModal.close();
    }

    deleteTransaction(): void {
        this.transactionService.delete(this.transaction.id)
            .then(transactions => { this.setTransactions(transactions) });

        this.transactionModal.close();
    }

    /* END BUDGET ITEMS */
    
    ngOnInit() {
        this.transactionService.get()
            .then(transactions => this.setTransactions(transactions));

        this.budgetGroupService.getBudgetGroups()
            .then(groups => this.groups = groups)
    }
}