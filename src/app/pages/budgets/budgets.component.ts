import { Component, OnInit, ViewChild } from '@angular/core';

import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { BudgetGroup } from '../../models/budget-group'
import { BudgetItem } from '../../models/budget-item';
import { BudgetGroupService } from '../../services/budget-group.service';

@Component({
    selector: 'budgets',
    templateUrl: './budgets.component.html',
    styleUrls: ['./budgets.component.css']
})

export class BudgetsComponent {
    budgetGroups: BudgetGroup[];
    selectedGroupId: number;

    constructor(private budgetGroupService: BudgetGroupService) {}

    /* BEGIN BUDGET GROUPS */

    @ViewChild('budgetGroupModal')
    budgetGroupModal: ModalComponent;
    budgetGroup: BudgetGroup = new BudgetGroup();

    setBudget(groups) {
        this.budgetGroups = groups;
    }

    createNewBudgetGroup(): void {
        this.budgetGroup = new BudgetGroup();
        this.budgetGroupModal.open();
    }

    editBudgetGroup(groupId, group): void {
        this.budgetGroup = group;
        this.budgetGroupModal.open();
    }

    saveBudgetGroup(): void {
        if (this.budgetGroup.id) {
            this.budgetGroupService.updateBudgetGroup(this.budgetGroup)
                .then(groups => { this.setBudget(groups) });
        } else {
            this.budgetGroupService.createBudgetGroup(this.budgetGroup)
                .then(groups => { this.setBudget(groups) });
        }

        this.budgetGroupModal.close();
    }

    deleteBudgetGroup(): void {
        this.budgetGroupService.deleteBudgetGroup(this.budgetGroup.id)
            .then(groups => { this.setBudget(groups) });
            
        this.budgetGroupModal.close();
    }

    /* END BUDGET GROUPS */

    /* BEGIN BUDGET ITEMS */

    @ViewChild('budgetItemModal')
    budgetItemModal: ModalComponent;
    budgetItem: BudgetItem = new BudgetItem();

    createNewBudgetItem(groupId) {
        this.budgetItem = new BudgetItem();
        this.selectedGroupId = groupId;
        this.budgetItemModal.open();
    }

    editBudgetItem(groupId, item) {
        this.selectedGroupId = groupId;
        this.budgetItem = item;
        this.budgetItemModal.open();
    }

    saveBudgetItem(): void {
        if (this.budgetItem.id) {
            this.budgetGroupService.editBudgetItem(this.selectedGroupId, this.budgetItem)
                .then(groups => { this.setBudget(groups) });
        } else {
            this.budgetGroupService.createBudgetItem(this.selectedGroupId, this.budgetItem)
                .then(groups => { this.setBudget(groups) });
        }

        this.budgetItemModal.close();
    }

    deleteBudgetItem(): void {
        this.budgetGroupService.deleteBudgetItem(this.budgetItem.id)
            .then(groups => { this.setBudget(groups) });

        this.budgetItemModal.close();
    }

    /* END BUDGET ITEMS */

    ngOnInit() {
            this.budgetGroupService.getBudgetGroups()
                .then(groups => this.setBudget(groups));
    }
}