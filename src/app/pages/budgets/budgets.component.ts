import { Component, OnInit, ViewChild } from '@angular/core';

import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';

import { ChartColors } from '../../consts';

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

    budgetedChart = {
        type: 'doughnut',
        labels: ['Budgeted', 'Remaining'],
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

    breakdownChartData = {
        type: 'doughnut',
        labels: [],
        data: [],
        colors: [{
            backgroundColor: ChartColors
        }],
        options: {
            cutoutPercentage: 70,
            animation: {
                animateRotate: false
            },
            tooltips: {
                callbacks: {
                    label: (tooltipItem, data) => {
                        var label = data.labels[tooltipItem.index]
                        var amount = data.datasets[0].data[tooltipItem.index]
                        var percent = Math.floor((amount / (this.finances.estimatedNetIncome / 12)) * 100);

                        return label + ': $' + amount + ' - ' + percent + '%';
                    }
                }
            }
        }
    };

    /* END CHART */

    constructor(private budgetService: BudgetService,
                private financeService: FinanceService) {}

    /* BEGIN BUDGET GROUPS */

    @ViewChild('budgetCategoryModal')
    budgetCategoryModal: ModalComponent;
    budgetCategory: BudgetCategory = new BudgetCategory();

    buildCharts() {
        var leftover = (Math.floor(this.finances.estimatedNetIncome / 12)) - this.budget.total;

        this.budgetedChart.data = [this.budget.total, leftover];

        this.breakdownChartData.labels = this.budget.categories.map(category => category.name);
        this.breakdownChartData.data = this.budget.categories.map(category => category.total);

        var colors = ChartColors.slice(0, this.breakdownChartData.data.length);
        colors.push('#eeeeee');

        this.breakdownChartData.labels.push('Remaining')
        this.breakdownChartData.data.push(leftover);


        this.breakdownChartData.colors = [{
            backgroundColor: colors
        }];
    }

    setBudget(budget) {
        this.budget = budget;

        this.buildCharts();
    }

    setFinances(finances) {
        this.finances = finances;

        this.buildCharts();
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
            .then(finances => this.setFinances(finances));
    }
}