import { Component, EventEmitter, ViewChild, Input, Output } from '@angular/core';

import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { TaxExemption } from '../models/tax-exemption'
import { TaxExemptionService } from '../services/tax-exemption.service';

@Component({
  selector: 'tax-exemptions-list',
  templateUrl: './tax-exemptions-list.component.html'
})

export class TaxExemptionsListComponent {
  @Input() exemptions: TaxExemption[];
  @Output() onTaxExemptionsChanged = new EventEmitter<TaxExemption[]>();

  @ViewChild('modal')
  modal: ModalComponent;
  selectedExemption: TaxExemption = new TaxExemption();

  constructor(private taxExemptionService: TaxExemptionService) {}

  setExemptions(exemptions) {
    this.exemptions = exemptions;
    this.onTaxExemptionsChanged.emit(this.exemptions);
  }

  getExemptions(): void {
    this.taxExemptionService.getTaxExemptions().then(exemptions => this.setExemptions(exemptions));
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
        .then(exemptions => this.setExemptions(exemptions));
    this.modal.close();
  }

  saveExemption(): void {
    if (this.selectedExemption.id) {
      this.taxExemptionService.updateTaxExemption(this.selectedExemption)
        .then(exemptions => this.setExemptions(exemptions));
    } else {
      this.taxExemptionService.createTaxExemption(this.selectedExemption)
        .then(exemptions => this.setExemptions(exemptions));
    }

    this.modal.close();
  }

  ngOnInit() {
    this.getExemptions();
  }
}