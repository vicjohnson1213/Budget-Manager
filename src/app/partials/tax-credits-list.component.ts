import { Component, OnInit, ViewChild } from '@angular/core';

import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { TaxCredit } from '../models/tax-credit'
import { TaxCreditService } from '../services/tax-credit.service';

@Component({
  selector: 'tax-credits-list',
  templateUrl: './tax-credits-list.component.html'
})

export class TaxCreditsListComponent {
  credits: TaxCredit[];

  @ViewChild('modal')
  modal: ModalComponent;
  selectedCredit: TaxCredit = new TaxCredit();

  constructor(private taxCreditService: TaxCreditService) {}

  getCredits(): void {
    this.taxCreditService.getTaxCredits().then(credits => this.credits = credits);
  }

  createNewCredit(): void {
    this.selectedCredit = new TaxCredit();
    this.modal.open();
  }

  editCredit(credit): void {
    this.selectedCredit = credit;
    this.modal.open();
  }

  deleteCredit(creditId) {
    this.taxCreditService.deleteTaxCredit(creditId)
        .then(credits => this.credits = credits);
    this.modal.close();
  }

  saveCredit(): void {
    if (this.selectedCredit.id) {
      this.taxCreditService.updateTaxCredit(this.selectedCredit)
        .then(credits => this.credits = credits);
    } else {
      this.taxCreditService.createTaxCredit(this.selectedCredit)
        .then(credits => this.credits = credits);
    }

    this.modal.close();
  }

  ngOnInit(): void {
    this.getCredits();
  }
}