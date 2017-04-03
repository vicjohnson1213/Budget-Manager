import { Component, OnInit, ViewChild } from '@angular/core';

import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { TaxExemption } from '../models/tax-exemption'
import { TaxExemptionService } from '../services/tax-exemption.service';

@Component({
  selector: 'tax-exemptions-list',
  templateUrl: './tax-exemptions-list.component.html'
})

export class TaxExemptionsListComponent {
  exemptions: TaxExemption[];

  @ViewChild('modal')
  modal: ModalComponent;
  selectedExemption: TaxExemption = new TaxExemption();

  constructor(private taxExemptionService: TaxExemptionService) {}

  getExemptions(): void {
    this.taxExemptionService.getTaxExemptions().then(exemptions => this.exemptions = exemptions);
  }

  createNewExemption(): void {
    this.selectedExemption = new TaxExemption();
    this.modal.open();
  }

  editExemption(exemption): void {
    this.selectedExemption = exemption;
    this.modal.open();
  }

  deleteExemption(exemptionId) {
    this.taxExemptionService.deleteTaxExemption(exemptionId)
        .then(exemptions => this.exemptions = exemptions);
    this.modal.close();
  }

  saveExemption(): void {
    if (this.selectedExemption.id) {
      this.taxExemptionService.updateTaxExemption(this.selectedExemption)
        .then(exemptions => this.exemptions = exemptions);
    } else {
      this.taxExemptionService.createTaxExemption(this.selectedExemption)
        .then(exemptions => this.exemptions = exemptions);
    }

    this.modal.close();
  }

  ngOnInit(): void {
    this.getExemptions();
  }
}