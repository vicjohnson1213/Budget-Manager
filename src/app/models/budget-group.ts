import { BudgetItem } from './budget-item';

export class BudgetGroup {
    id: number;
    name: string;
    items: BudgetItem[];
}