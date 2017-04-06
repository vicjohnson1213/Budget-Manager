import { Component, OnInit, ViewChild } from '@angular/core';

import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { BudgetGroup } from '../../models/budget-group'

@Component({
  selector: 'budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.css']
})

export class BudgetsComponent {
  categories: BudgetGroup[];

  constructor() {}

}