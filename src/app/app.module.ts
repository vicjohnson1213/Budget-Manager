import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { DatepickerModule } from 'ngx-bootstrap';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { UIDateSwitcherModule } from './shared/ui-date-switcher';

import { AppComponent } from './app.component';

import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BudgetsComponent } from './pages/budgets/budgets.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { YourFinancesComponent } from './pages/your-finances/your-finances.component';
import { HistoryComponent } from './pages/history/history.component';

import { IncomeSourceService } from './services/income-source.service';
import { TaxDeductionService } from './services/tax-deduction.service';
import { TaxExemptionService } from './services/tax-exemption.service';
import { TaxCreditService } from './services/tax-credit.service';
import { TransactionService } from './services/transaction.service';

import { BudgetService } from './services/budget.service';
import { FinanceService } from './services/finances.service';

import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';

import { HttpService } from './shared/http.service';

import { routes } from './app.routes';

@NgModule({
    declarations: [
        AppComponent,

        LoginComponent,
        DashboardComponent,
        BudgetsComponent,
        TransactionsComponent,
        YourFinancesComponent,
        HistoryComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,

        RouterModule.forRoot(routes, {
            useHash: true
        }),

        Ng2Bs3ModalModule,
        ChartsModule,

        UIDateSwitcherModule
    ],
    providers: [
        IncomeSourceService,
        TaxDeductionService,
        TaxExemptionService,
        TaxCreditService,
        BudgetService,
        FinanceService,
        TransactionService,
        
        AuthGuard,
        AuthService,
        HttpService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
