import { Component, EventEmitter, OnInit, ViewChild, Input, Output } from '@angular/core';

import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { BudgetGroup } from '../models/budget-group';
import { BudgetGroupService } from '../services/budget-group.service';

import { BudgetItem } from '../models/budget-item';

@Component({
  selector: 'budget-items-list',
  templateUrl: './budget-items-list.component.html'
})

export class BudgetItemsListComponent {
  groups: BudgetGroup[];
  selectedGroupId: number;

  @Output() onBudgetChanged = new EventEmitter<BudgetGroup[]>();

  @ViewChild('groupModal')
  groupModal: ModalComponent;
  group: BudgetGroup = new BudgetGroup();

  @ViewChild('itemModal')
  itemModal: ModalComponent;
  item: BudgetItem = new BudgetItem();

  constructor(private budgetGroupService: BudgetGroupService) {}

  setGroups(groups) {
    this.groups = groups;
    this.onBudgetChanged.emit(this.groups);

    this.group = new BudgetGroup();
    this.item = new BudgetItem();
    this.selectedGroupId = 0;

    this.itemModal.close();
    this.groupModal.close();
  }

  createNewGroup(): void {
    this.group = new BudgetGroup();
    this.groupModal.open();
  }

  editGroup(groupId, group): void {
    this.group = group;
    this.groupModal.open();
  }

  createNewItem(groupId) {
    this.item = new BudgetItem();
    this.selectedGroupId = groupId;
    this.itemModal.open();
  }

  editItem(groupId, item) {
    this.selectedGroupId = groupId;
    this.item = item;
    this.itemModal.open();
  }

  saveGroup(): void {
    if (this.group.id) {
      this.budgetGroupService.updateBudgetGroup(this.group)
        .then(groups => { this.setGroups(groups) });
    } else {
      this.budgetGroupService.createBudgetGroup(this.group)
        .then(groups => { this.setGroups(groups) });
    }
  }

  deleteGroup(): void {
    this.budgetGroupService.deleteBudgetGroup(this.group.id)
      .then(groups => { this.setGroups(groups) });
  }

  saveItem(): void {
    if (this.item.id) {
      this.budgetGroupService.editBudgetItem(this.selectedGroupId, this.item)
        .then(groups => { this.setGroups(groups) });
    } else {
      this.budgetGroupService.createBudgetItem(this.selectedGroupId, this.item)
        .then(groups => { this.setGroups(groups) });
    }
  }

  deleteItem(): void {
    this.budgetGroupService.deleteBudgetItem(this.item.id)
      .then(groups => { this.setGroups(groups) });
  }

  ngOnInit() {
      this.budgetGroupService.getBudgetGroups()
        .then(groups => this.setGroups(groups));
  }
}