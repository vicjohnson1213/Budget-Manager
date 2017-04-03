import { Component, OnInit, ViewChild } from '@angular/core';

import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { TaxDeduction } from '../models/tax-deduction'
import { TaxDeductionService } from '../services/tax-deduction.service';

@Component({
  selector: 'tax-deductions-list',
  templateUrl: './tax-deductions-list.component.html'
})

export class TaxDeductionsListComponent {
  deductions: TaxDeduction[];

  @ViewChild('modal')
  modal: ModalComponent;
  selectedDeduction: TaxDeduction = new TaxDeduction();

  constructor(private taxDeductionService: TaxDeductionService) {}

  getDeductions(): void {
    this.taxDeductionService.getTaxDeductions().then(deductions => this.deductions = deductions);
  }

  createNewDeduction(): void {
    this.selectedDeduction = new TaxDeduction();
    this.modal.open();
  }

  editDeduction(deduction): void {
    this.selectedDeduction = deduction;
    this.modal.open();
  }

  deleteDeduction(deductionId) {
    this.taxDeductionService.deleteTaxDeduction(deductionId)
        .then(deductions => this.deductions = deductions);
    this.modal.close();
  }

  saveDeduction(): void {
    if (this.selectedDeduction.id) {
      this.taxDeductionService.updateTaxDeduction(this.selectedDeduction)
        .then(deductions => this.deductions = deductions);
    } else {
      this.taxDeductionService.createTaxDeduction(this.selectedDeduction)
        .then(deductions => this.deductions = deductions);
    }

    this.modal.close();
  }

  ngOnInit(): void {
    this.getDeductions();
  }
}