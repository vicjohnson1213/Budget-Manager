import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { YourFinancesComponent } from './pages/your-finances/your-finances.component';
import { BudgetsComponent } from './pages/budgets/budgets.component';

import { IncomeSourcesListComponent } from './partials/income-sources-list.component';
import { TaxDeductionsListComponent } from './partials/tax-deductions-list.component';
import { TaxExemptionsListComponent } from './partials/tax-exemptions-list.component';
import { TaxCreditsListComponent } from './partials/tax-credits-list.component';
import { BudgetItemsListComponent } from './partials/budget-items-list.component';

import { IncomeSourceService } from './services/income-source.service';
import { TaxDeductionService } from './services/tax-deduction.service';
import { TaxExemptionService } from './services/tax-exemption.service';
import { TaxCreditService } from './services/tax-credit.service';
import { BudgetGroupService } from './services/budget-group.service';

import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,

    DashboardComponent,
    YourFinancesComponent,
    BudgetsComponent,
  
    IncomeSourcesListComponent,
    TaxDeductionsListComponent,
    TaxExemptionsListComponent,
    TaxCreditsListComponent,
    BudgetItemsListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2Bs3ModalModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  providers: [
    IncomeSourceService,
    TaxDeductionService,
    TaxExemptionService,
    TaxCreditService,
    BudgetGroupService,
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
