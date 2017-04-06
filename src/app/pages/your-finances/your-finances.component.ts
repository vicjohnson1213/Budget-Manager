import { Component, OnInit, ViewChild } from '@angular/core';

import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { IncomeSource } from '../../models/income-source'
import { IncomeSourceService } from '../../services/income-source.service';

import { TaxCredit } from '../../models/tax-credit'
import { TaxCreditService } from '../../services/tax-credit.service';

import { TaxDeduction } from '../../models/tax-deduction'
import { TaxDeductionService } from '../../services/tax-deduction.service';

import { TaxExemption } from '../../models/tax-exemption'
import { TaxExemptionService } from '../../services/tax-exemption.service';

@Component({
  selector: 'your-finances',
  templateUrl: './your-finances.component.html',
  styleUrls: ['./your-finances.component.css']
})

export class YourFinancesComponent {
  grossIncome: number = 0;
  totalDeductions: number = 0;
  totalExemptions: number = 0;
  totalCredits: number = 0;
  estimatedTaxes: number = 0;
  estimatedNetIncome: number = 0;

  constructor() {}

  estimateTaxes() {
    var federalTaxes = 5200 + ((this.grossIncome - 38000 - this.totalDeductions - this.totalExemptions) * 0.25) - this.totalCredits;
    var ficaTax = this.grossIncome * .0765;

    this.estimatedTaxes = federalTaxes + ficaTax;
    this.estimatedNetIncome = this.grossIncome - this.estimatedTaxes;
  }

  onIncomeSourcesChanged(sources) {
    this.grossIncome = sources.reduce((acc, s) => { return acc + s.annualAmount }, 0);
    this.estimateTaxes();
  }

  onTaxDeductionsChanged(deductions) {
    this.totalDeductions = deductions.reduce((acc, s) => { return acc + s.amount }, 0);
    this.estimateTaxes();
  }

  onTaxExemptionsChanged(exemptions) {
    this.totalExemptions = exemptions.reduce((acc, s) => { return acc + s.amount }, 0);
    this.estimateTaxes();
  }

  onTaxCreditsChanged(credits) {
    this.totalCredits = credits.reduce((acc, s) => { return acc + s.amount }, 0);
    this.estimateTaxes();
  }

  ngOnInit() {

  }
}