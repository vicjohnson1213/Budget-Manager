import { Component, EventEmitter, OnInit, ViewChild, Input, Output } from '@angular/core';

import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { BudgetGroup } from '../models/budget-group'
import { BudgetGroupService } from '../services/budget-group.service';

@Component({
  selector: 'budget-items-list',
  templateUrl: './budget-items-list.component.html'
})

export class BudgetItemsListComponent {
  groups: BudgetGroup[];

  @Output() onBudgetChanged = new EventEmitter<BudgetGroup[]>();

  constructor(private budgetGroupService: BudgetGroupService) {}

  ngOnInit() {
      this.budgetGroupService.getBudgetGroups()
        .then(groups => {
          this.groups = groups
        });
  }
}