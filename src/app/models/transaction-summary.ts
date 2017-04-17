import { Transaction } from './transaction';

export class TransactionSummary {
    month: number;
    year: number;
    total: number;
    transactions: Transaction[];
}