import { Component, OnInit, ViewChild } from '@angular/core';

import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

/* BEGIN MODEL IMPORTS */

import { IncomeSource } from '../../models/income-source'
import { TaxCredit } from '../../models/tax-credit'
import { TaxDeduction } from '../../models/tax-deduction'
import { TaxExemption } from '../../models/tax-exemption'
import { Finances } from '../../models/finances'

/* END MODEL IMPORTS */

/* BEGIN SERVICE IMPORTS */

import { FinanceService } from '../../services/finances.service';

/* END SERVICE IMPORTS */

@Component({
    selector: 'your-finances',
    templateUrl: './your-finances.component.html'
})

export class YourFinancesComponent {
    finances: Finances = new Finances();

    constructor(private financeService: FinanceService) {}

    getFinances(): void {
        this.financeService.get()
            .then((finances) => {
                this.finances = finances;
            });
    }

    setFinances(finances): void {
        this.finances = finances;
    }

    /* BEGIN INCOME SOURCES */

    @ViewChild('incomeSourceModal')
    incomeSourceModal: ModalComponent;
    selectedIncomeSource: IncomeSource = new IncomeSource();

    createNewIncomeSource(): void {
        this.selectedIncomeSource = new IncomeSource();
        this.incomeSourceModal.open();
    }

    editIncomeSource(source): void {
        this.selectedIncomeSource = source;
        this.incomeSourceModal.open();
    }

    deleteIncomeSource(sourceId) {
        this.financeService.incomeSources.delete(sourceId)
                .then(finances => this.setFinances(finances));
        this.incomeSourceModal.close();
    }

    saveIncomeSource(): void {
        if (this.selectedIncomeSource.id) {
            this.financeService.incomeSources.update(this.selectedIncomeSource)
                .then(finances => this.setFinances(finances));
        } else {
            this.financeService.incomeSources.create(this.selectedIncomeSource)
                .then(finances => this.setFinances(finances));
        }

        this.incomeSourceModal.close();
    }

    /* END INCOME SOURCES */

    /* BEGIN TAX DEDUCTIONS */

    @ViewChild('taxDeductionModal')
    taxDeductionModal: ModalComponent;
    selectedTaxDeduction: TaxDeduction = new TaxDeduction();

    // setTaxDeductions(deductions) {
    //   this.taxDeductions = deductions;
    // }

    createNewTaxDeduction(): void {
        this.selectedTaxDeduction = new TaxDeduction();
        this.taxDeductionModal.open();
    }

    editTaxDeduction(deduction): void {
        this.selectedTaxDeduction = deduction;
        this.taxDeductionModal.open();
    }

    deleteTaxDeduction(deductionId) {
        this.financeService.taxDeductions.delete(deductionId)
                .then(finances => this.setFinances(finances));
        this.taxDeductionModal.close();
    }

    saveTaxDeduction(): void {
        if (this.selectedTaxDeduction.id) {
            this.financeService.taxDeductions.update(this.selectedTaxDeduction)
                .then(finances => this.setFinances(finances));
        } else {
            this.financeService.taxDeductions.create(this.selectedTaxDeduction)
                .then(finances => this.setFinances(finances));
        }

        this.taxDeductionModal.close();
    }

    /* END TAX DEDUCTIONS */

    /* BEGIN TAX EXEMPTIONS */

    @ViewChild('taxExemptionModal')
    taxExemptionModal: ModalComponent;
    selectedTaxExemption: TaxExemption = new TaxExemption();

    createNewTaxExemption(): void {
        this.selectedTaxExemption = new TaxExemption();
        this.taxExemptionModal.open();
    }

    editTaxExemption(exemption): void {
        this.selectedTaxExemption = exemption;
        this.taxExemptionModal.open();
    }

    deleteTaxExemption(exemptionId) {
        this.financeService.taxExemptions.delete(exemptionId)
                .then(finances => this.setFinances(finances));
        this.taxExemptionModal.close();
    }

    saveTaxExemption(): void {
        if (this.selectedTaxExemption.id) {
            this.financeService.taxExemptions.update(this.selectedTaxExemption)
                .then(finances => this.setFinances(finances));
        } else {
            this.financeService.taxExemptions.create(this.selectedTaxExemption)
                .then(finances => this.setFinances(finances));
        }

        this.taxExemptionModal.close();
    }

    /* END TAX EXEMPTIONS */

    /* BEGIN TAX CREDITS */

    @ViewChild('taxCreditModal')
    taxCreditModal: ModalComponent;
    selectedTaxCredit: TaxCredit = new TaxCredit();

    createNewTaxCredit(): void {
        this.selectedTaxCredit = new TaxCredit();
        this.taxCreditModal.open();
    }

    editTaxCredit(credit): void {
        this.selectedTaxCredit = credit;
        this.taxCreditModal.open();
    }

    deleteTaxCredit() {
        this.financeService.taxCredits.delete(this.selectedTaxCredit.id)
                .then(finances => this.setFinances(finances));
        this.taxCreditModal.close();
    }

    saveTaxCredit(): void {
        if (this.selectedTaxCredit.id) {
            this.financeService.taxCredits.update(this.selectedTaxCredit)
                .then(finances => this.setFinances(finances));
        } else {
            this.financeService.taxCredits.create(this.selectedTaxCredit)
                .then(finances => this.setFinances(finances));
        }

        this.taxCreditModal.close();
    }

    /* END TAX CREDITS */

    ngOnInit() {
        this.getFinances();
    }
}