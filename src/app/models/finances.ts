import { IncomeSource } from './income-source';
import { TaxDeduction } from './tax-deduction';
import { TaxExemption } from './tax-exemption';
import { TaxCredit } from './tax-credit';

export class Finances {
    incomeSources: IncomeSource[];

    taxDeductions: TaxDeduction[];
    taxExemptions: TaxExemption[];
    taxCredits: TaxCredit[];

    grossIncome: number;
    estimatedNetIncome: number;
    estimatedTaxes: number;
}