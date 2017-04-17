import { Component, OnInit } from '@angular/core';

import { Budget } from '../../models/budget';
import { Finances } from '../../models/finances';
import { TransactionSummary } from '../../models/transaction-summary';

import { BudgetService } from '../../services/budget.service';
import { FinanceService } from '../../services/finances.service';
import { TransactionService } from '../../services/transaction.service';

import { ChartColors } from '../../consts';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html'
})

// Component class
export class DashboardComponent {
    budget: Budget = new Budget();
    finances: Finances = new Finances();
    transactionSummary = new TransactionSummary();

    overallSpendingChart = {
        type: 'doughnut',
        labels: ['Spent', 'Remaining'],
        data: [0, 1],
        colors: [{
            backgroundColor: ['#28c2ff', '#eeeeee']
        }],
        options: {
            cutoutPercentage: 70,
            animation: {
                animateRotate: false,
            },
            tooltips: {
                callbacks: {
                    label: function(tooltipItem, data) {
                        var label = data.labels[tooltipItem.index];
                        var amount = data.datasets[0].data[tooltipItem.index]
                        return label + ': $' + amount;
                    }
                }
            }
        }
    };

    spendingBreakdownChart = {
        type: 'doughnut',
        labels: ['Spent', 'Remaining'],
        data: [],
        colors: [{
            backgroundColor: ChartColors
        }],
        options: {
            cutoutPercentage: 70,
            animation: {
                animateRotate: false,
            },
            tooltips: {
                callbacks: {
                    label: function(tooltipItem, data) {
                        var label = data.labels[tooltipItem.index];
                        var amount = data.datasets[0].data[tooltipItem.index]
                        return label + ': $' + amount;
                    }
                }
            }
        }
    };

    constructor(private budgetService: BudgetService,
                private financeService: FinanceService,
                private transactionService: TransactionService) {}

    setBudget(budget) {
        this.budget = budget;
        this.updateCharts();
    }

    setTransactionSummary(summary) {
        this.transactionSummary = summary
        this.updateCharts();
    }

    setFinances(finances) {
        this.finances = finances;
        this.updateCharts();
    }

    updateCharts() {
        var remaining = Math.round(this.budget.total - this.transactionSummary.total);

        this.overallSpendingChart.data = [this.transactionSummary.total, remaining];

        this.spendingBreakdownChart.labels = this.budget.categories.map(c => c.name);
        this.spendingBreakdownChart.data = this.budget.categories.map(c => c.total);
    }

    ngOnInit() {
        this.budgetService.get()
            .then(budget => this.setBudget(budget));

        this.financeService.get()
            .then(finances => this.setFinances(finances));

        this.transactionService.get()
            .then(summary => this.setTransactionSummary(summary));
    }
}