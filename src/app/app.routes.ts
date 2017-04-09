import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BudgetsComponent } from './pages/budgets/budgets.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { YourFinancesComponent } from './pages/your-finances/your-finances.component';
import { HistoryComponent } from './pages/history/history.component';

export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'budgets', component: BudgetsComponent },
    { path: 'transactions', component: TransactionsComponent },
    { path: 'your-finances', component: YourFinancesComponent },
    { path: 'history', component: HistoryComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);