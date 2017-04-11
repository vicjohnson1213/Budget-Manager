import { BudgetItem } from './budget-item';

export class BudgetCategory {
    id: number;
    name: string;
    total: number;
    items: BudgetItem[];
}