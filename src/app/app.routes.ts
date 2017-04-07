import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { YourFinancesComponent } from './pages/your-finances/your-finances.component';
import { BudgetsComponent } from './pages/budgets/budgets.component';

export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'budgets', component: BudgetsComponent },
    { path: 'your-finances', component: YourFinancesComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);