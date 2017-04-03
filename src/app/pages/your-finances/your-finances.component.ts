import { Component, OnInit, ViewChild } from '@angular/core';

import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { IncomeSource } from '../../models/income-source'
import { IncomeSourceService } from '../../services/income-source.service';

@Component({
  selector: 'your-finances',
  templateUrl: './your-finances.component.html',
  styleUrls: ['./your-finances.component.css']
})

export class YourFinancesComponent {
}